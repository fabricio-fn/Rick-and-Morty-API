import { useQuery } from "react-query";
import axios from "axios";

export function useCharacters(page: number) {
  const fetchCharacterData = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      return response.data;
    } catch (error) {
      throw new Error("Character data could not be loaded.");
    }
  }

  const { data, isLoading, isError } = useQuery(["characterData", page], fetchCharacterData);

  return { data, isLoading, isError };
}