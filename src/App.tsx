import { Box, Grid, Heading } from "@chakra-ui/react";
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
      <Box w="100vw" h="100vh" bg="gray.100">
        <Heading as="h1" p={10}>
          Cribstack Test
        </Heading>

        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gridGap="10"
          p={5}
          mx="auto"
          maxW="1000px"
        >
          {resource.data?.results.map((character) => (
            <CharacterView key={character.name} {...character} />
          ))}
        </Grid>
      </Box>
    </Providers>
  );
}
