import type { CollectionEntry } from "astro:content";

export type EpisodeLogSectionKey =
  | "prologue"
  | "main"
  | "epilogue"
  | "background"
  | "omake";

export interface EpisodeScenarioInfo {
  title?: string;
  inStoryDate?: string;
  participants?: string[];
  author?: string;
  distributionName?: string;
  distributionUrl?: string;
  isAdapted?: boolean;
  adaptedScenarioUrl?: string;
  compactDescription?: boolean;
  removeCanon?: boolean;
}

export interface EpisodeLogMeta {
  showNextEpisode?: boolean;
  showPreviousEpisode?: boolean;
}

export interface EpisodeLogSection {
  key: EpisodeLogSectionKey;
  label: string;
  anchor: string;
  contentId: string;
}

export const episodeLogSectionDefs: Record<
  EpisodeLogSectionKey,
  Omit<EpisodeLogSection, "contentId">
> = {
  prologue: { key: "prologue", label: "前編", anchor: "prologue" },
  main: { key: "main", label: "本編", anchor: "story-main" },
  epilogue: { key: "epilogue", label: "エピローグ", anchor: "epilogue" },
  background: { key: "background", label: "背景", anchor: "background" },
  omake: { key: "omake", label: "おまけ", anchor: "omake" },
};

export const episodeLogSectionOrder: EpisodeLogSectionKey[] = [
  "prologue",
  "main",
  "epilogue",
  "background",
  "omake",
];

export const episodeLogContentId = (
  seasonSlug: string,
  episodeSlug: string | number,
  sectionKey: EpisodeLogSectionKey,
): string => `${seasonSlug}/${episodeSlug}/${sectionKey}`;

export const episodeLogSectionsFromEntries = (
  seasonSlug: string,
  episodeSlug: string | number,
  entries: Partial<Record<EpisodeLogSectionKey, CollectionEntry<"episodeLogs"> | undefined>>,
): EpisodeLogSection[] =>
  episodeLogSectionOrder.flatMap((key) => {
    if (!entries[key]) return [];
    return [
      {
        ...episodeLogSectionDefs[key],
        contentId: episodeLogContentId(seasonSlug, episodeSlug, key),
      },
    ];
  });

export const hasAnyEpisodeLog = (
  seasonSlug: string,
  episodeSlug: string | number,
  entryIds: Set<string>,
): boolean =>
  episodeLogSectionOrder.some((key) =>
    entryIds.has(episodeLogContentId(seasonSlug, episodeSlug, key)),
  );
