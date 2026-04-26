import { seasons, type SeasonInfo } from "../episodes";

export const episodeSeasonStaticPaths = async (): Promise<
  {
    params: { season: string };
    props: { seasonNumber: SeasonInfo["number"] };
  }[]
> =>
  (await seasons()).map((season) => ({
    params: { season: season.slug },
    props: { seasonNumber: season.number },
  }));
