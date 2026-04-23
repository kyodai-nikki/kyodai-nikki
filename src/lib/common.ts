type OrderedContentEntry = {
  data: {
    order: number;
  };
};

type DatedContentEntry = {
  id: string;
  data: {
    date: string;
  };
};

type NumberedContentEntry = {
  overallNumber: number;
};

type NumberedLogEntry = {
  data: {
    overallNumber?: number;
  };
};

// order の小さい順にコンテンツコレクションを並び替える。
export const sortByOrder = <T extends OrderedContentEntry>(entries: readonly T[]): T[] =>
  entries.slice().sort((a, b) => a.data.order - b.data.order);

// order の大きい順にコンテンツコレクションを並び替える。
export const sortByOrderDesc = <T extends OrderedContentEntry>(entries: readonly T[]): T[] =>
  entries.slice().sort((a, b) => b.data.order - a.data.order);

// date の新しい順にニュース系コンテンツを並び替える。
export const sortByDateDesc = <T extends DatedContentEntry>(entries: readonly T[]): T[] =>
  entries
    .slice()
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime() ||
        b.id.localeCompare(a.id),
    );

// overallNumber の小さい順にエピソード一覧を並び替える。
export const sortByOverallNumber = <T extends NumberedContentEntry>(entries: readonly T[]): T[] =>
  entries.slice().sort((a, b) => a.overallNumber - b.overallNumber);

// frontmatter の overallNumber が小さい順にエピソードログを並び替える。
export const sortLogEntriesByOverallNumber = <T extends NumberedLogEntry>(
  entries: readonly T[],
): T[] => entries.slice().sort((a, b) => (a.data.overallNumber ?? 0) - (b.data.overallNumber ?? 0));
