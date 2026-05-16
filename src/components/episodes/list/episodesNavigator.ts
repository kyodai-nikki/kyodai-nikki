import { onPageLoad } from "../../../scripts/onPageLoad";

const listScrollKey = "kyodai-nikki:episode-list-scroll";
const detailScrollKey = "kyodai-nikki:episode-detail-scroll";
const detailScrollValue = "from-list";

declare global {
  interface Window {
    __kyodaiEpisodeDetailScrollBound?: boolean;
    __kyodaiEpisodeSameSeasonScrollBound?: boolean;
  }
}

interface AstroBeforeSwapEvent extends Event {
  from: URL;
  to: URL;
  newDocument: Document;
}

const readStoredListScroll = () => {
  const stored = sessionStorage.getItem(listScrollKey);
  if (!stored) return undefined;

  sessionStorage.removeItem(listScrollKey);
  const scrollTop = Number(stored);
  return Number.isFinite(scrollTop) ? scrollTop : undefined;
};

const saveListScroll = () => {
  const list = document.querySelector(".ep-list");
  if (!(list instanceof HTMLElement)) return;

  sessionStorage.setItem(listScrollKey, String(list.scrollTop));
};

const requestDetailScroll = () => {
  sessionStorage.setItem(detailScrollKey, detailScrollValue);
};

const consumeDetailScrollRequest = () => {
  const shouldScroll = sessionStorage.getItem(detailScrollKey) === detailScrollValue;
  if (shouldScroll) {
    sessionStorage.removeItem(detailScrollKey);
  }
  return shouldScroll;
};

const scrollToDetail = (behavior: ScrollBehavior = "instant" as ScrollBehavior) => {
  const detail = document.querySelector("#ep-detail");
  if (!(detail instanceof HTMLElement)) return;

  detail.scrollIntoView({ behavior, block: "start" });
};

const scrollToDetailIfRequested = () => {
  if (consumeDetailScrollRequest()) {
    scrollToDetail();
  }
};

const bindEarlyDetailScroll = () => {
  if (window.__kyodaiEpisodeDetailScrollBound) return;
  window.__kyodaiEpisodeDetailScrollBound = true;

  document.addEventListener("astro:after-swap", scrollToDetailIfRequested);
};

const episodeDetailPathPattern = /\/episodes\/([^/]+)\/([^/]+)\/?$/;

const getEpisodeDetailRoute = (url: URL) => {
  const match = url.pathname.match(episodeDetailPathPattern);
  if (!match) return undefined;

  return {
    season: match[1],
    episode: match[2],
  };
};

const isSameSeasonEpisodeDetailNavigation = (from: URL, to: URL) => {
  const fromRoute = getEpisodeDetailRoute(from);
  const toRoute = getEpisodeDetailRoute(to);
  return Boolean(
    fromRoute
      && toRoute
      && fromRoute.season === toRoute.season
      && fromRoute.episode !== toRoute.episode,
  );
};

const isEpisodeDetailNavigation = (from: URL, to: URL) => {
  const fromRoute = getEpisodeDetailRoute(from);
  const toRoute = getEpisodeDetailRoute(to);
  return Boolean(
    fromRoute
      && toRoute
      && (
        fromRoute.season !== toRoute.season
        || fromRoute.episode !== toRoute.episode
      ),
  );
};

const disablePageTransition = (documentElement = document.documentElement) => {
  documentElement.dataset.pageTransition = "none";
};

const clearDisabledPageTransition = (documentElement = document.documentElement) => {
  delete documentElement.dataset.pageTransition;
};

const bindSameSeasonEpisodeTransition = () => {
  if (window.__kyodaiEpisodeSameSeasonScrollBound) return;
  window.__kyodaiEpisodeSameSeasonScrollBound = true;

  document.addEventListener("click", (event) => {
    const target = event.target instanceof Element
      ? event.target.closest("a[href]")
      : undefined;
    if (!(target instanceof HTMLAnchorElement)) return;
    if (
      target.hasAttribute("download")
      || (target.target && target.target !== "_self")
      || event.defaultPrevented
      || event.metaKey
      || event.ctrlKey
      || event.altKey
      || event.shiftKey
    ) {
      return;
    }

    const to = new URL(target.href, window.location.href);
    if (to.origin !== window.location.origin) return;

    const from = new URL(window.location.href);
    if (isEpisodeDetailNavigation(from, to)) {
      disablePageTransition();
    } else {
      clearDisabledPageTransition();
    }

    if (isSameSeasonEpisodeDetailNavigation(from, to)) {
      requestDetailScroll();
    }
  }, { capture: true });

  document.addEventListener("astro:before-swap", (event) => {
    const transitionEvent = event as AstroBeforeSwapEvent;
    if (isEpisodeDetailNavigation(transitionEvent.from, transitionEvent.to)) {
      disablePageTransition(transitionEvent.newDocument.documentElement);
    } else {
      clearDisabledPageTransition();
      clearDisabledPageTransition(transitionEvent.newDocument.documentElement);
    }

    if (!isSameSeasonEpisodeDetailNavigation(transitionEvent.from, transitionEvent.to)) {
      sessionStorage.removeItem(detailScrollKey);
    }
  });

  document.addEventListener("astro:page-load", () => {
    clearDisabledPageTransition();
  });
};

const initEpisodeListScrollRestore = (signal: AbortSignal) => {
  document.querySelectorAll(".ep-list a.ep-item").forEach((item) => {
    item.addEventListener("click", () => {
      saveListScroll();
      requestDetailScroll();
    }, { signal });
  });
};

const initEpisodesNavigator = ({ signal }: { signal: AbortSignal }) => {
  bindEarlyDetailScroll();
  bindSameSeasonEpisodeTransition();

  const storedListScroll = readStoredListScroll();
  const list = document.querySelector(".ep-list");
  if (list instanceof HTMLElement) {
    if (storedListScroll !== undefined) {
      list.scrollTop = storedListScroll;
    } else {
      const selected = list.querySelector(".ep-item--selected");
      if (selected instanceof HTMLElement) {
        const li = selected.closest("li");
        if (li instanceof HTMLElement) {
          list.scrollTop = li.offsetTop - list.offsetTop;
        }
      }
    }
  }

  scrollToDetailIfRequested();

  const detailImage = document.querySelector(".ep-detail__image");
  if (detailImage instanceof HTMLImageElement) {
    const fallback = detailImage.dataset.fallbackSrc;
    if (fallback) {
      const applyFallback = () => {
        if (detailImage.src !== fallback) {
          detailImage.src = fallback;
        }
      };
      if (detailImage.complete && detailImage.naturalWidth === 0) {
        applyFallback();
      } else {
        detailImage.addEventListener("error", applyFallback, { once: true });
      }
    }
  }

  initEpisodeListScrollRestore(signal);
};

onPageLoad("episodes-navigator", initEpisodesNavigator);
