import {
  orderedSettingsCharacters,
  settingsCharacterSlug,
  type OthersSettingsCharacterEntry,
} from "../others";

export const getSettingsCharacterStaticPaths = async (): Promise<
  {
    params: { character: string };
    props: {
      character: OthersSettingsCharacterEntry;
      characterSlug: string;
    };
  }[]
> => {
  const settingsCharacters = await orderedSettingsCharacters();

  return settingsCharacters.map((character) => {
    const characterSlug = settingsCharacterSlug(character);

    return {
      params: { character: characterSlug },
      props: {
        character,
        characterSlug,
      },
    };
  });
};
