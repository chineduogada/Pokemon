import { http } from "./http";

export interface Character {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  abilities: string[];
  moves: string[];
  types: string[];
}

export type CharacterListItem = {
  name: string;
};

export interface GetManyPokemonCharactersReturnType {
  count: number;
  results: CharacterListItem[];
}

export const getManyPokemonCharacters = async (): Promise<
  GetManyPokemonCharactersReturnType
> => {
  const getPath = () => `/pokemon`;

  // Get the response or an empty Object {}
  const allCharacters =
    (await (
      await http.get(getPath(), {
        params: { offset: `${Math.floor(Math.random() * 10) + 2}0` }
      })
    )?.data) || {};

  return {
    count: allCharacters.count as number,
    results: allCharacters.results.map((r: any) => ({
      name: r.name
    })) as CharacterListItem[]
  };
};

export const getOnePokemonCharacter = async (
  name: string
): Promise<Character> => {
  const getPath = (name: string) => `/pokemon/${name}`;

  // Get the response or an empty Object {}
  const characterData = (await (await http.get(getPath(name)))?.data) || {};

  const character = {
    id: characterData.id as number,
    name: characterData.name as string,
    image: characterData.sprites.other.dream_world.front_default as string,
    height: characterData.height as number,
    weight: characterData.weight as number,
    abilities: characterData.abilities.map(
      (a: any) => a.ability.name
    ) as string[],
    moves: characterData.moves.map((m: any) => m.move.name) as string[],
    types: characterData.types.map((t: any) => t.type.name) as string[]
  };

  return character;
};
