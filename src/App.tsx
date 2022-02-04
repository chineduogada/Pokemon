import { Grid } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import Providers from "./Providers";
import {
  GetManyPokemonCharactersReturnType,
  getManyPokemonCharacters
} from "./services";
import { useFetch } from "./hooks";
import { CharacterView } from "./components";

export default function App() {
  const { resource, handleFetchResource } = useFetch<
    GetManyPokemonCharactersReturnType
  >();
  const handleFetch = useCallback(async () => {
    const data: GetManyPokemonCharactersReturnType = await getManyPokemonCharacters();

    return data;
  }, []);

  useEffect(() => {
    handleFetchResource({ fetcher: handleFetch });
  }, [handleFetchResource, handleFetch]);

  return (
    <Providers>
      {resource.data?.count}
      {resource.data?.results.length}

      <Grid>
        {resource.data?.results.map((character) => (
          <CharacterView key={character.name} {...character} />
        ))}
      </Grid>
    </Providers>
  );
}
