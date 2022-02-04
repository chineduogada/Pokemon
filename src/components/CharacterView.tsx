import {
  Box,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Tag,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { ReactNode, useCallback, useEffect } from "react";
import { useFetch } from "../hooks";
import {
  CharacterListItem,
  Character,
  getOnePokemonCharacter
} from "../services";

interface CharacterViewProps extends CharacterListItem {
  isLoading?: boolean;
}

const wrapperShadow = `0 2.8px 2.2px rgba(0, 0, 0, 0.034),
0 6.7px 5.3px rgba(0, 0, 0, 0.048),
0 12.5px 10px rgba(0, 0, 0, 0.06),
0 22.3px 17.9px rgba(0, 0, 0, 0.072),
0 41.8px 33.4px rgba(0, 0, 0, 0.086),
0 100px 80px rgba(0, 0, 0, 0.12)`;

function MoreDetailsView({
  renderTrigger,
  renderContent
}: {
  renderTrigger: (onOpen: () => void) => any;
  renderContent: () => ReactNode;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {renderTrigger(onOpen)}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent shadow={wrapperShadow} p={5} rounded="2em">
          <ModalCloseButton rounded="full" />

          {renderContent()}
        </ModalContent>
      </Modal>
    </>
  );
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

  const renderContent = (isModalView?: boolean) => {
    // isModalView = true;

    const { image, name, abilities: ability, moves, types, height, weight } =
      resource.data || ({} as Character);

    return (
      <>
        <Flex>
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

          {isModalView && (
            <Stack pl={10}>
              <Text>
                Height: <b>{height}</b>
              </Text>
              <Text>
                Weight: <b>{weight}</b>
              </Text>
            </Stack>
          )}
        </Flex>

        <Heading size="lg" textTransform="capitalize" my={3}>
          {name}
        </Heading>

        {!isModalView && (
          <Flex justifyContent="flex-end" gridGap={2}>
            {types.map((type, i) => (
              <Tag key={i} size={isModalView ? "lg" : "md"}>
                {type}
              </Tag>
            ))}
          </Flex>
        )}

        {isModalView && (
          <Stack spacing={10} mt={10}>
            <Stack>
              <Heading size="md">List of types</Heading>

              <Flex flexWrap="wrap" gridGap="5">
                {types.map((type, i) => (
                  <Tag key={i} size={"lg"}>
                    {type}
                  </Tag>
                ))}
              </Flex>
            </Stack>

            <Stack h="300px" overflowY="auto">
              <Heading size="md">List of moves</Heading>

              <Flex flexWrap="wrap" gridGap="5">
                {moves.map((move, i) => (
                  <Tag key={i} size={"lg"}>
                    {move}
                  </Tag>
                ))}
              </Flex>
            </Stack>

            <Stack h="300px" overflowY="auto">
              <Heading size="md">List of abilities</Heading>

              <Flex flexWrap="wrap" gridGap="5">
                {ability.map((abilitie, i) => (
                  <Tag key={i} size={"lg"}>
                    {abilitie}
                  </Tag>
                ))}
              </Flex>
            </Stack>
          </Stack>
        )}
      </>
    );
  };

  return (
    <Box
      shadow={wrapperShadow}
      bg="white"
      p={5}
      rounded="2em"
      transition=".5s"
      _hover={{
        transform: "perspective(50em) rotateX(10deg)",
        cursor: "pointer"
      }}
    >
      {resource.data && (
        <MoreDetailsView
          renderTrigger={(onOpen) => (
            <Box onClick={onOpen}>{renderContent()}</Box>
          )}
          renderContent={renderContent.bind(null, true)}
        />
      )}
    </Box>
  );
};
