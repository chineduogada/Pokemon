import { CharacterListItem } from "../services";

interface CharacterViewProps extends CharacterListItem {
  isLoading?: boolean;
}

export const CharacterView = ({ name, isLoading }: CharacterViewProps) => {
  return <>{name}</>;
};
