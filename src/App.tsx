import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react";
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
  const handleFetch = useCallback(() => {
    handleFetchResource({
      fetcher: async () => {
        const data: GetManyPokemonCharactersReturnType = await getManyPokemonCharacters();

        return data;
      }
    });
  }, [handleFetchResource]);

  useEffect(() => {
    handleFetch();
  }, [handleFetch]);

  return (
    <Providers>
      <Box w="100vw" h="100vh" bg="gray.100">
        <Flex alignItems="center">
          <Heading as="h1" p={10}>
            Cribstack Test
          </Heading>

          <Button
            shadow={`0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)`}
            onClick={handleFetch}
          >
            Refresh
          </Button>
        </Flex>

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
