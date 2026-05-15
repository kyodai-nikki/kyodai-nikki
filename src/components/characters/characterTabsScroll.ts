import { onPageLoad } from "../../scripts/onPageLoad";

const characterTabsScrollKey = "kyodai-nikki:character-tabs-scroll";
const characterTabsScrollValue = "to-tabs";
const characterDetailPathPattern = /\/characters\/([^/]+)\/?$/;

declare global {
  interface Window {
    __kyodaiCharacterTabsScrollBound?: boolean;
  }
}

interface AstroAfterSwapEvent extends Event {
  to: URL;
}

const getCharacterDetailRoute = (url: URL) => {
  const match = url.pathname.match(characterDetailPathPattern);
  return match?.[1];
};

const requestCharacterTabsScroll = () => {
  sessionStorage.setItem(characterTabsScrollKey, characterTabsScrollValue);
};

const consumeCharacterTabsScrollRequest = () => {
  const shouldScroll = sessionStorage.getItem(characterTabsScrollKey) === characterTabsScrollValue;
  if (shouldScroll) {
    sessionStorage.removeItem(characterTabsScrollKey);
  }
  return shouldScroll;
};

const scrollToPageTabs = (behavior: ScrollBehavior = "instant" as ScrollBehavior) => {
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

const scrollToPageTabsIfRequested = () => {
  if (consumeCharacterTabsScrollRequest()) {
    scrollToPageTabs();
  }
};

const bindCharacterTabsScroll = () => {
  if (window.__kyodaiCharacterTabsScrollBound) return;
  window.__kyodaiCharacterTabsScrollBound = true;

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

    if (getCharacterDetailRoute(to)) {
      requestCharacterTabsScroll();
    }
  }, { capture: true });

  document.addEventListener("astro:after-swap", (event) => {
    const transitionEvent = event as AstroAfterSwapEvent;
    if (getCharacterDetailRoute(transitionEvent.to)) {
      window.requestAnimationFrame(scrollToPageTabsIfRequested);
    } else {
      sessionStorage.removeItem(characterTabsScrollKey);
    }
  });
};

const initCharacterTabsScroll = () => {
  bindCharacterTabsScroll();
  scrollToPageTabsIfRequested();
};

onPageLoad("character-tabs-scroll", initCharacterTabsScroll);
