import { onPageLoad } from "../../../scripts/onPageLoad";

const overviewScrollKey = "kyodai-nikki:episode-log-overview-scroll";
const overviewScrollValue = "to-tabs";

const scrollToLogLayout = () => {
  if (window.location.hash) return;

  const layout = document.querySelector(".episode-log__layout");
  if (!(layout instanceof HTMLElement)) return;

  const header = document.querySelector(".site-header");
  const headerHeight = header instanceof HTMLElement
    ? header.getBoundingClientRect().height
    : 0;
  const top = layout.getBoundingClientRect().top + window.scrollY - headerHeight - 16;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: "instant" as ScrollBehavior,
  });
};

const requestOverviewTabsScroll = () => {
  sessionStorage.setItem(overviewScrollKey, overviewScrollValue);
};

const initEpisodeLogLayoutScroll = ({ signal }: { signal: AbortSignal }) => {
  window.requestAnimationFrame(scrollToLogLayout);

  document.querySelectorAll<HTMLAnchorElement>("[data-log-overview-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (
        event.defaultPrevented
        || event.metaKey
        || event.ctrlKey
        || event.altKey
        || event.shiftKey
      ) {
        return;
      }

      requestOverviewTabsScroll();
    }, { signal });
  });
};

onPageLoad("episode-log-layout-scroll", initEpisodeLogLayoutScroll);
