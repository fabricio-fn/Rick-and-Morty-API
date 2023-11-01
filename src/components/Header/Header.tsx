'use client'

import { ChangeEvent, useState } from 'react'
import { Input, Badge, Spinner, Text, Box, Card, Flex, Avatar, Heading } from '@chakra-ui/react'
import Link from 'next/link'
import { useCharacterSearch } from '@/api/Hooks/useSearchCharacter'
import { iCharacters } from '../Cards/Cards'

export default function Header() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { suggestionsQuery } = useCharacterSearch(searchQuery)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <Box as='header'>
    <Flex gap='4' flexDirection='column'>
      <Flex flex='1' gap='4' flexDirection='row' alignItems='center' color='#f9f9f9'>
        <Link href='/'>HOME</Link>

        <Input
          placeholder='Search a character'
          value={searchQuery}
          onChange={handleInputChange}
        />
      </Flex>

      {suggestionsQuery.isLoading ? (
        <Spinner thickness='4px' speed='1s' emptyColor='gray.200' color='blue.500' size='xl' />

      ) : suggestionsQuery.isError ? (
        <Text>Error when searching for suggestion</Text>

      ) : suggestionsQuery.isSuccess && suggestionsQuery.data.length > 0 ? (

        <Flex flex='1' gap='4' flexDirection='column'>
          {suggestionsQuery.data.slice(0, 6).map((character: iCharacters) => (
            <Link
              onClick={() => setSearchQuery('')}
              href={`/character/${character.id}`}
              key={character.id}
            >
              <Card maxW='sm'>
                <Flex padding='1rem' flex='1' gap='4' flexDirection='row'>
                  <Avatar name={character.name} src={character.image} />

                  <Box>
                    <Heading size='sm'>{character.name}</Heading>
                    
                    <Box>
                      {character.status === 'Alive' ? (
                        <Badge colorScheme='green'>Online</Badge>
                      ) : character.status === 'Dead' ? (
                        <Badge colorScheme='red'>Offline</Badge>
                      ) : (
                        <Badge colorScheme='blackAlpha'>Inactive</Badge>
                      )}
                    </Box>
                  </Box>
                </Flex>
              </Card>
            </Link>
          ))}
        </Flex>
      ) : null}
    </Flex>
    </Box>
  )
}