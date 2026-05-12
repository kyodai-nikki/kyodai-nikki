import { breakpoints } from "../lib/breakpoints.mjs";

const setupNavDrawers = () => {
  const drawers = document.querySelectorAll<HTMLElement>("[data-nav-drawer]");

  const isActive = (drawer: HTMLElement) => {
    const activation = drawer.dataset.navDrawerActivation;
    const maxWidth =
      activation === "laptop" ? breakpoints.laptop : breakpoints.tablet;
    return window.matchMedia(`(max-width: ${maxWidth}px)`).matches;
  };

  const updateBodyLock = () => {
    const openDrawers = Array.from(drawers).filter(
      (drawer) => drawer.dataset.open === "true",
    );
    const hasOpenDrawer = openDrawers.length > 0;
    const hasOpenPageDrawer = openDrawers.some((drawer) =>
      drawer.closest("main[data-page-shell]"),
    );

    document.body.toggleAttribute("data-nav-drawer-open", hasOpenDrawer);
    document.body.toggleAttribute("data-page-nav-drawer-open", hasOpenPageDrawer);
  };

  drawers.forEach((drawer) => {
    if (drawer.dataset.initialized === "true") return;

    const id = drawer.dataset.navDrawer;
    if (!id) return;

    const trigger = document.querySelector<HTMLButtonElement>(
      `[aria-controls="${id}"]`,
    );
    const close = drawer.querySelector<HTMLButtonElement>("[data-nav-drawer-close]");
    const panel = drawer.querySelector<HTMLElement>(".nav-drawer__panel");
    const backdrop = drawer.querySelector<HTMLElement>("[data-nav-drawer-backdrop]");
    if (!trigger || !close || !panel || !backdrop) return;

    drawer.dataset.initialized = "true";
    const labelOpen = drawer.dataset.labelOpen ?? trigger.getAttribute("aria-label") ?? "";
    const labelClose =
      drawer.dataset.labelClose ?? close.getAttribute("aria-label") ?? labelOpen;

    const setOpen = (open: boolean) => {
      const shouldUseDrawer = isActive(drawer);
      const nextOpen = open && shouldUseDrawer;

      drawer.dataset.open = nextOpen.toString();
      trigger.setAttribute("aria-expanded", nextOpen.toString());
      trigger.setAttribute("aria-label", nextOpen ? labelClose : labelOpen);
      panel.setAttribute("aria-hidden", nextOpen ? "false" : shouldUseDrawer.toString());
      panel.toggleAttribute("inert", shouldUseDrawer && !nextOpen);
      updateBodyLock();
    };

    setOpen(false);

    trigger.addEventListener("click", () => {
      setOpen(drawer.dataset.open !== "true");
    });

    close.addEventListener("click", () => {
      setOpen(false);
      trigger.focus();
    });

    panel.addEventListener("click", (event) => {
      if (event.target instanceof HTMLAnchorElement) setOpen(false);
    });

    backdrop.addEventListener("click", () => {
      setOpen(false);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });

    document.addEventListener("pointerdown", (event) => {
      if (drawer.dataset.open !== "true" || !(event.target instanceof Node)) return;
      if (drawer.contains(event.target) || trigger.contains(event.target)) return;
      setOpen(false);
    });

    window.addEventListener("resize", () => {
      setOpen(false);
    });
  });
};

setupNavDrawers();
document.addEventListener("astro:page-load", setupNavDrawers);
