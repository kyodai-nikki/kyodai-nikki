import { onPageLoad } from "./onPageLoad";

const initMediaLoaders = ({ signal }: { signal: AbortSignal }) => {
  document.querySelectorAll<HTMLElement>(".media-modal__img-wrap").forEach((wrap) => {
    const img = wrap.querySelector("img");
    if (!img) return;

    const markLoaded = () => wrap.classList.add("is-loaded");

    if (img.complete && img.naturalWidth > 0) {
      markLoaded();
      return;
    }

    img.addEventListener("load", markLoaded, { once: true, signal });
    img.addEventListener("error", markLoaded, { once: true, signal });
  });
};

onPageLoad("media-modal-loaders", initMediaLoaders);
