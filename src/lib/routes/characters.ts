import { orderedCharacters } from "../characters";

export const getCharacterStaticPaths = async () => {
  const characters = await orderedCharacters();
  return characters.map((character) => ({
    params: { slug: character.id },
    props: { character },
  }));
};
