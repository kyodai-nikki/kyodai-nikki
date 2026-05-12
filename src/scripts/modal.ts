import { onPageLoad } from "./onPageLoad";

type ModalTarget = string | HTMLDialogElement | null | undefined;

interface KyodaiModalApi {
  open: (target: ModalTarget) => void;
  close: (target: ModalTarget) => void;
  restoreBodyScroll: () => void;
}

declare global {
  interface Window {
    __kyodaiModalInitialized?: boolean;
    __kyodaiModal?: KyodaiModalApi;
  }
}

const dialogSelector = "[data-modal-root]";

const isModalDialog = (element: unknown): element is HTMLDialogElement =>
  element instanceof HTMLDialogElement && element.matches(dialogSelector);

const isDismissible = (dialog: unknown): dialog is HTMLDialogElement =>
  isModalDialog(dialog) && dialog.dataset.modalDismissible !== "false";

const resolveDialog = (target: ModalTarget): HTMLDialogElement | null => {
  if (isModalDialog(target)) return target;
  if (typeof target !== "string") return null;

  const dialog = document.querySelector(`[data-modal-id="${target}"]`);
  return isModalDialog(dialog) ? dialog : null;
};

let closingDialog: HTMLDialogElement | null = null;

const restoreBodyScroll = () => {
  const hasOpenDialog = Array.from(document.querySelectorAll(dialogSelector)).some(
    (element) => element instanceof HTMLDialogElement && element.open,
  );

  if (!hasOpenDialog) {
    delete document.documentElement.dataset.modalLocked;
    delete document.body.dataset.modalLocked;
    document.body.style.removeProperty("--scrollbar-width");
  }
};

const lockBodyScroll = () => {
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.setProperty("--scrollbar-width", `${scrollbarWidth}px`);
  document.documentElement.dataset.modalLocked = "true";
  document.body.dataset.modalLocked = "true";
};

const openDialog = (dialog: HTMLDialogElement) => {
  if (!isModalDialog(dialog) || dialog.open) return;

  dialog.dataset.state = "open";
  dialog.showModal();
  lockBodyScroll();
  dialog.focus({ preventScroll: true });

  const content = dialog.querySelector(".modal__content");
  if (content instanceof Element) content.scrollTop = 0;
};

const closeWithAnimation = (dialog: unknown) => {
  if (!isModalDialog(dialog) || !dialog.open || dialog.dataset.state === "closing") return;

  dialog.dataset.state = "closing";
  closingDialog = dialog;

  window.setTimeout(() => {
    if (closingDialog === dialog) {
      dialog.close();
    }
  }, 220);
};

if (!window.__kyodaiModalInitialized) {
  window.__kyodaiModalInitialized = true;

  window.__kyodaiModal = {
    open(target) {
      const dialog = resolveDialog(target);
      if (dialog) openDialog(dialog);
    },
    close(target) {
      const dialog = resolveDialog(target);
      if (dialog) closeWithAnimation(dialog);
    },
    restoreBodyScroll,
  };

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    const openButton = target.closest("[data-modal-open]");
    if (openButton instanceof HTMLElement) {
      const dialog = resolveDialog(openButton.dataset.modalOpen);
      if (dialog) openDialog(dialog);
      return;
    }

    const closeButton = target.closest("[data-modal-close]");
    if (closeButton instanceof HTMLElement) {
      closeWithAnimation(closeButton.closest(dialogSelector));
    }
  });

  document.addEventListener(
    "cancel",
    (event) => {
      const dialog = event.target;
      if (!isModalDialog(dialog)) return;

      event.preventDefault();
      if (isDismissible(dialog)) {
        closeWithAnimation(dialog);
      }
    },
    true,
  );

  document.addEventListener(
    "close",
    (event) => {
      const dialog = event.target;
      if (!isModalDialog(dialog)) return;

      if (closingDialog === dialog) {
        closingDialog = null;
      }

      dialog.dataset.state = "";
      restoreBodyScroll();
    },
    true,
  );
}

const initModalBackdropListeners = ({ signal }: { signal: AbortSignal }) => {
  document.querySelectorAll(dialogSelector).forEach((dialog) => {
    if (!isModalDialog(dialog)) return;

    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      if (!dialog.open || dialog.dataset.modalDismissible === "false") return;

      const bounds = dialog.getBoundingClientRect();
      const isBackdropClick =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

      if (isBackdropClick) {
        window.__kyodaiModal?.close(dialog);
      }
    }, { signal });
  });
};

onPageLoad("modals", initModalBackdropListeners);

export {};
