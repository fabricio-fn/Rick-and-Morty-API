import { useQuery } from "react-query"
import axios from "axios"

const GetCharacterById = async (id: number) => {
  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
    return response.data
  } catch (error) {
    throw new Error("character not found")
  }
}

export function useGetCharacterById(id: number) {
  return useQuery(["characterData", id], () => GetCharacterById(id), {
    enabled: !!id,
  })
}