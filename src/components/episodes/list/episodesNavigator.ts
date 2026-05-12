import { breakpoints } from "../../../lib/breakpoints.mjs";
import { onPageLoad } from "../../../scripts/onPageLoad";

const listScrollKey = "kyodai-nikki:episode-list-scroll";

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

const initEpisodeListScrollRestore = (signal: AbortSignal) => {
  document.querySelectorAll(".ep-item").forEach((item) => {
    item.addEventListener("click", saveListScroll, { signal });
  });
};

const initEpisodesNavigator = ({ signal }: { signal: AbortSignal }) => {
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

  const detail = document.querySelector("#ep-detail");
  if (
    detail instanceof HTMLElement &&
    list instanceof HTMLElement &&
    getComputedStyle(list).display !== "none" &&
    window.matchMedia(`(max-width: ${breakpoints.tablet}px)`).matches
  ) {
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
