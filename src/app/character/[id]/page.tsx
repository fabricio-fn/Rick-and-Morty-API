'use client'

import { useGetCharacterById } from "@/api/Hooks/useGetCharacterById"
import { iCharacters } from "@/components/Cards/Cards"
import SkeletonCharacter from "@/components/Skeleton/SkeletonCharacter"
import { Flex, Card, Box, Badge, Text, Image, Heading, SimpleGrid } from "@chakra-ui/react"
import Link from "next/link"

export default function CharacterId({ params }: { params: { id: number } }) {
  const { id } = params

  const { data, isLoading, isError } = useGetCharacterById(id)

  if (isLoading) {
    return (
      <SimpleGrid columns={[1, 2, 3, 4]} spacing='1rem'>
        {Array.from({ length: 1 }, (_, index) => (
          <SkeletonCharacter key={index} />
        ))}
      </SimpleGrid>
    )
  }

  if (isError || !data) {
    return null
  }

  const character: iCharacters = data

  return (
    <Card>
      <Flex padding='1rem' flex='1' gap='4' flexWrap='wrap' alignItems='start'>
        <Image src={character.image} alt={character.name} borderRadius='10' />

        <Flex flexDirection='column' flexWrap='wrap' gap='2'>
          <Heading size='lg'>{character.name}</Heading>

          <Flex flexDirection='column'>
            <Text fontWeight='700' fontSize='2xl'>Status</Text>

            <Box>
              {character.status === 'Alive' ? (
                <Badge colorScheme='green'>Online</Badge>
              ) : character.status === 'Dead' ? (
                <Badge colorScheme='red'>Offline</Badge>
              ) : (
                <Badge colorScheme='blackAlpha'>Inactive</Badge>
              )}
            </Box>
          </Flex>

          <Flex flexDirection='column'>
            <Text fontWeight='700' fontSize='2xl'>Gender</Text>

            <Text>{character.gender}</Text>
          </Flex>

          <Flex flexDirection='column'>
            <Text fontWeight='700' fontSize='2xl'>Location</Text>

            <Text>{character.origin.name}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}