import { Box, Flex, Heading, Image, Tag, Text } from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { useFetch } from "../hooks";
import {
  CharacterListItem,
  Character,
  getOnePokemonCharacter
} from "../services";

interface CharacterViewProps extends CharacterListItem {
  isLoading?: boolean;
}

export const CharacterView = ({ name, isLoading }: CharacterViewProps) => {
  const { resource, handleFetchResource } = useFetch<Character>();
  const handleFetch = useCallback(async () => {
    const data: Character = await getOnePokemonCharacter(name);

    return data;
  }, [name]);

  useEffect(() => {
    handleFetchResource({ fetcher: handleFetch });
  }, [handleFetchResource, handleFetch]);

  const renderContent = () => {
    const { image, name, abilities, moves, types, height, weight } =
      resource.data || ({} as Character);

    return (
      <>
        <Box pos="relative" w="150px" h="150px">
          <Box
            pos="absolute"
            border="10px solid"
            borderColor="gray.400"
            rounded="full"
            w="60%"
            h="60%"
          ></Box>

          <Image src={image} pos="relative" w="100%" h="100%" />
        </Box>

        <Heading size="lg" textTransform="capitalize" my={2}>
          {name}
        </Heading>

        <Flex justifyContent="flex-end" gridGap={2}>
          {types.map((type, i) => (
            <Tag key={i}>{type}</Tag>
          ))}
        </Flex>
      </>
    );
  };

  return (
    <Box
      shadow={`0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)`}
      bg="white"
      p={5}
      rounded="2em"
      transition=".5s"
      _hover={{
        transform: "perspective(50em) rotateX(5deg)",
        cursor: "pointer"
      }}
    >
      {resource.data && renderContent()}
    </Box>
  );
};
