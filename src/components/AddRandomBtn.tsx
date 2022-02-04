import { Button } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../hooks";
import { Character, getOnePokemonCharacter } from "../services";

interface AddRandomProps {
  setCharactesrList: any;
}

export const AddRandomBtn = ({ setCharactesrList }: AddRandomProps) => {
  const { resource, handleFetchResource } = useFetch<Character>();

  const [characterId, setCharacter] = useState<number>(
    Math.floor(Math.random() * 50)
  );
  const [hasFetched, setHasFetched] = useState<boolean>(false);

  const handleFetch = useCallback(() => {
    if (characterId)
      handleFetchResource({
        fetcher: async () => {
          const data: Character = await getOnePokemonCharacter(
            `${characterId}`
          );

          return data;
        }
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFetchResource, characterId]);

  useEffect(() => {
    if (characterId && hasFetched) handleFetch();
  }, [handleFetch, characterId, hasFetched]);

  useEffect(() => {
    if (resource.data?.id) {
      setCharactesrList((prev: any) => ({
        ...prev,
        data: {
          count: prev.data.count + 1,
          results: [resource.data, ...prev.data.results]
        }
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource.data?.id]);

  return (
    <Button
      shadow={`0 2.8px 2.2px rgba(0, 0, 0, 0.034),
            0 6.7px 5.3px rgba(0, 0, 0, 0.048),
            0 12.5px 10px rgba(0, 0, 0, 0.06),
            0 22.3px 17.9px rgba(0, 0, 0, 0.072),
            0 41.8px 33.4px rgba(0, 0, 0, 0.086),
            0 100px 80px rgba(0, 0, 0, 0.12)`}
      onClick={() => {
        setCharacter((prev) => prev + Math.floor(Math.random() * 30));

        setHasFetched(true);
      }}
      colorScheme="red"
    >
      + Add a random character
    </Button>
  );
};
