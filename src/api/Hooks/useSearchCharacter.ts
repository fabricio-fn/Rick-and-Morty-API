import { useQuery } from "react-query";
import axios from "axios";
import { iCharacters } from "@/components/Cards/Cards";

const fetchCharacterSuggestions = async (characterName: string): Promise<iCharacters[]> => {
  if (characterName) {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${characterName}`)
      return response.data.results;
    } catch (error) {
      console.error(error);
      return [];
    }
  } else {
    return [];
  }
}

export function useCharacterSearch(characterName: string) {
  const suggestionsQuery = useQuery(["suggestions", characterName], () => fetchCharacterSuggestions(characterName), {
    enabled: !!characterName,
  });

  return {  suggestionsQuery };
}