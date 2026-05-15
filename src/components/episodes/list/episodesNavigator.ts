import { onPageLoad } from "../../../scripts/onPageLoad";

const listScrollKey = "kyodai-nikki:episode-list-scroll";
const detailScrollKey = "kyodai-nikki:episode-detail-scroll";
const detailScrollValue = "from-list";
const episodeDetailScrollStartKey = "kyodai-nikki:episode-detail-scroll-start";
const episodeDetailScrollTargetKey = "kyodai-nikki:episode-detail-scroll-target";
const episodeDetailScrollTargetDetail = "detail";
const episodeDetailScrollTargetTabs = "tabs";
const logOverviewScrollKey = "kyodai-nikki:episode-log-overview-scroll";
const logOverviewScrollValue = "to-tabs";

declare global {
  interface Window {
    __kyodaiEpisodeDetailScrollBound?: boolean;
    __kyodaiEpisodeTransitionBound?: boolean;
  }
}

interface AstroBeforeSwapEvent extends Event {
  from: URL;
  to: URL;
  newDocument: Document;
  viewTransition?: ViewTransition;
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

const hasSameSeasonScrollRequest = () =>
  sessionStorage.getItem(episodeDetailScrollStartKey) !== null;

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
  if (hasSameSeasonScrollRequest()) return;
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

const isCrossSeasonEpisodeDetailNavigation = (from: URL, to: URL) => {
  const fromRoute = getEpisodeDetailRoute(from);
  const toRoute = getEpisodeDetailRoute(to);
  return Boolean(fromRoute && toRoute && fromRoute.season !== toRoute.season);
};

const isTimelineRoute = (url: URL) => /\/episodes\/timeline\/?$/.test(url.pathname);

const shouldTrackEpisodeDetailNavigation = (from: URL, to: URL) =>
  isEpisodeDetailNavigation(from, to)
  || (isTimelineRoute(from) && getEpisodeDetailRoute(to))
  || (!isTimelineRoute(from) && isTimelineRoute(to));

const getEpisodeDetailScrollTarget = (from: URL, to: URL) =>
  isCrossSeasonEpisodeDetailNavigation(from, to)
  || isTimelineRoute(from)
  || isTimelineRoute(to)
    ? episodeDetailScrollTargetTabs
    : episodeDetailScrollTargetDetail;

const shouldScrollFromPreviousPosition = (from: URL, to: URL) =>
  isCrossSeasonEpisodeDetailNavigation(from, to)
  || (isTimelineRoute(from) && getEpisodeDetailRoute(to))
  || (!isTimelineRoute(from) && isTimelineRoute(to));

const setEpisodeDetailScrollTarget = (target: string) => {
  sessionStorage.setItem(episodeDetailScrollTargetKey, target);
};

const consumeEpisodeDetailScrollTarget = () => {
  const target = sessionStorage.getItem(episodeDetailScrollTargetKey);
  sessionStorage.removeItem(episodeDetailScrollTargetKey);
  return target === episodeDetailScrollTargetTabs
    ? episodeDetailScrollTargetTabs
    : episodeDetailScrollTargetDetail;
};

const saveEpisodeDetailScrollStart = () => {
  sessionStorage.setItem(episodeDetailScrollStartKey, JSON.stringify({
    scrollX: window.scrollX,
    scrollY: window.scrollY,
  }));
};

const consumeEpisodeDetailScrollStart = () => {
  const stored = sessionStorage.getItem(episodeDetailScrollStartKey);
  if (!stored) return undefined;

  sessionStorage.removeItem(episodeDetailScrollStartKey);
  try {
    const value = JSON.parse(stored) as { scrollX?: unknown; scrollY?: unknown };
    const scrollX = Number(value.scrollX);
    const scrollY = Number(value.scrollY);
    if (!Number.isFinite(scrollX) || !Number.isFinite(scrollY)) return undefined;
    return { scrollX, scrollY };
  } catch {
    return undefined;
  }
};

const scrollToSeasonTabs = (behavior: ScrollBehavior = "instant" as ScrollBehavior) => {
  const tabs = document.querySelector(".page-shell__tabs");
  if (!(tabs instanceof HTMLElement)) return;

  const header = document.querySelector(".site-header");
  const headerHeight = header instanceof HTMLElement
    ? header.getBoundingClientRect().height
    : 0;
  const top = tabs.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

  window.scrollTo({
    top: Math.max(0, top),
    behavior,
  });
};

const consumeLogOverviewScrollRequest = () => {
  const shouldScroll = sessionStorage.getItem(logOverviewScrollKey) === logOverviewScrollValue;
  if (shouldScroll) {
    sessionStorage.removeItem(logOverviewScrollKey);
  }
  return shouldScroll;
};

const scrollToSeasonTabsIfRequested = () => {
  if (consumeLogOverviewScrollRequest()) {
    window.requestAnimationFrame(() => scrollToSeasonTabs());
  }
};

const scrollFromPreviousPositionToDetail = () => {
  const start = consumeEpisodeDetailScrollStart();
  if (!start) return false;

  const target = consumeEpisodeDetailScrollTarget();
  sessionStorage.removeItem(detailScrollKey);
  window.scrollTo({
    left: start.scrollX,
    top: start.scrollY,
    behavior: "instant" as ScrollBehavior,
  });

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const behavior = prefersReducedMotion ? "instant" as ScrollBehavior : "smooth";
      if (target === episodeDetailScrollTargetTabs) {
        scrollToSeasonTabs(behavior);
      } else {
        scrollToDetail(behavior);
      }
    });
  });

  return true;
};

const setInstantEpisodeTransition = (documentElement = document.documentElement) => {
  documentElement.dataset.pageTransition = "none";
};

const clearInstantEpisodeTransition = (documentElement = document.documentElement) => {
  delete documentElement.dataset.pageTransition;
};

const bindSameSeasonEpisodeTransition = () => {
  if (window.__kyodaiEpisodeTransitionBound) return;
  window.__kyodaiEpisodeTransitionBound = true;

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
    if (shouldTrackEpisodeDetailNavigation(from, to)) {
      if (shouldScrollFromPreviousPosition(from, to)) {
        saveEpisodeDetailScrollStart();
        setEpisodeDetailScrollTarget(getEpisodeDetailScrollTarget(from, to));
      } else {
        sessionStorage.removeItem(episodeDetailScrollStartKey);
        sessionStorage.removeItem(episodeDetailScrollTargetKey);
        requestDetailScroll();
      }
    }

    clearInstantEpisodeTransition();
  }, { capture: true });

  document.addEventListener("astro:before-swap", (event) => {
    const transitionEvent = event as AstroBeforeSwapEvent;
    if (!shouldTrackEpisodeDetailNavigation(transitionEvent.from, transitionEvent.to)) {
      sessionStorage.removeItem(episodeDetailScrollStartKey);
      sessionStorage.removeItem(episodeDetailScrollTargetKey);
    }
    clearInstantEpisodeTransition();
    clearInstantEpisodeTransition(transitionEvent.newDocument.documentElement);
  });

  document.addEventListener("astro:after-swap", scrollFromPreviousPositionToDetail);

  document.addEventListener("astro:page-load", () => {
    clearInstantEpisodeTransition();
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
  scrollToSeasonTabsIfRequested();

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
