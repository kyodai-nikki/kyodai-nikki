type PageLoadSetup = (context: { signal: AbortSignal }) => void | (() => void);

interface PageLoadRegistryEntry {
  setup: PageLoadSetup;
  abortController?: AbortController;
  cleanup?: () => void;
  bound?: boolean;
}

declare global {
  interface Window {
    __kyodaiPageLoadRegistry?: Map<string, PageLoadRegistryEntry>;
  }
}

const getRegistry = () => {
  window.__kyodaiPageLoadRegistry ??= new Map();
  return window.__kyodaiPageLoadRegistry;
};

const runSetup = (entry: PageLoadRegistryEntry) => {
  entry.cleanup?.();
  entry.abortController?.abort();

  const abortController = new AbortController();
  entry.abortController = abortController;
  entry.cleanup = undefined;

  const cleanup = entry.setup({ signal: abortController.signal });
  if (typeof cleanup === "function" && !abortController.signal.aborted) {
    entry.cleanup = cleanup;
  }
};

export const onPageLoad = (key: string, setup: PageLoadSetup) => {
  const registry = getRegistry();
  const entry = registry.get(key) ?? { setup };

  entry.setup = setup;
  registry.set(key, entry);

  if (!entry.bound) {
    document.addEventListener("astro:page-load", () => runSetup(entry));
    entry.bound = true;
  }

  runSetup(entry);
};
