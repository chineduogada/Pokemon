import { Box, Button, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { FiRefreshCcw } from "react-icons/fi";
import Providers from "./Providers";
import {
  GetManyPokemonCharactersReturnType,
  getManyPokemonCharacters
} from "./services";
import { useFetch } from "./hooks";
import { AddRandomBtn, CharacterView } from "./components";

export default function App() {
  const { resource, setResource, handleFetchResource } = useFetch<
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
        <Flex
          alignItems="center"
          gridGap={5}
          flexDirection={{ base: "column", md: "row" }}
          p={{ base: 5, md: 10 }}
          pb={10}
        >
          <Heading as="h1" pb={{ base: 10, md: 0 }} mr={{ md: 10 }}>
            Cribstack Pokemon Test
          </Heading>

          <Button
            shadow={`0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)`}
            onClick={handleFetch}
            mr={5}
            leftIcon={<FiRefreshCcw />}
          >
            Refresh
          </Button>

          <AddRandomBtn setCharactesrList={setResource} />
        </Flex>

        <Text as="i" p={{ base: 5, md: 10 }}>
          Showing <b>{resource.data?.results.length}</b> characters
        </Text>

        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
          gridGap="10"
          p={5}
          mx="auto"
          maxW="1000px"
        >
          {resource.data?.results.map((character) => (
            <CharacterView
              key={character.name}
              setCharactesrList={setResource}
              {...character}
            />
          ))}
        </Grid>
      </Box>
    </Providers>
  );
}
