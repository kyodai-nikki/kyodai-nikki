import { breakpoints } from "../../../lib/breakpoints.mjs";

const initEpisodesNavigator = () => {
  const list = document.querySelector(".ep-list");
  if (list instanceof HTMLElement) {
    const selected = list.querySelector(".ep-item--selected");
    if (selected instanceof HTMLElement) {
      const li = selected.closest("li");
      if (li instanceof HTMLElement) {
        list.scrollTop = li.offsetTop - list.offsetTop;
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
};

document.addEventListener("astro:page-load", initEpisodesNavigator);
