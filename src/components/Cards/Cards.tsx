'use client'

import { Avatar, Badge, Box, Text, Card, CardHeader, CardFooter, Flex, Heading, SimpleGrid } from '@chakra-ui/react'
import Link from 'next/link'
import SkeletonCard from '../Skeleton/SkeletonCard'
import { useCharacters } from '@/api/Hooks/useCharacters'
import { useState } from 'react'
import Image from 'next/image'
import { PaginationButtons } from '../PaginationButtons/PaginationButtons'

export interface iCharacters {
  id: number
  name: string
  image: string
  species: string
  status: string
  gender: string
  origin: { name: string }
}

export default function Cards() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useCharacters(page)

  if (isLoading) {
    return (
      <SimpleGrid columns={[1, 2, 3, 4]} gap='1rem'>
        {Array.from({ length: 20 }, (_, index) => (
          <SkeletonCard key={index} />
        ))}
      </SimpleGrid>
    )
  }

  if (isError || !data.results || data.results.length === 0) {
    return null
  }

  const characters = data.results

  const hasNextPage = data.info.next !== null

  const handlePageChange = (page: number) => {
    setPage(page)
  }  

  return (
    <Flex flexDirection='column' alignItems='center' gap='1rem'>
      <PaginationButtons page={page} hasNextPage={hasNextPage} onPageChange={handlePageChange} />

      <SimpleGrid columns={[1, 2, 3, 4]} gap='1rem'>
        {characters.map((characters: iCharacters) => (
          <Link href={`/character/${characters.id}`} key={characters.id}>
            <Card minH='sm' maxW='sm'>
              <CardHeader>
                <Flex flexDirection='row' gap='1rem'>
                  <Avatar
                    border='2px solid #222222'
                    name={characters.name}
                    src={characters.image}
                  />

                  <Flex flexDirection='column'>
                    <Text
                      fontWeight='500'
                      fontSize='16px'
                      textTransform='lowercase'
                    >
                      @{characters.name.replace(/\s/g, '')}
                    </Text>

                    <Box>
                      {characters.status === 'Alive' ? (
                        <Badge colorScheme='green'>Online</Badge>
                      ) : characters.status === 'Dead' ? (
                        <Badge colorScheme='red'>Offline</Badge>
                      ) : (
                        <Badge colorScheme='blackAlpha'>Inactive</Badge>
                      )}
                    </Box>
                  </Flex>
                </Flex>
              </CardHeader>

              <Image
                src={`https://source.unsplash.com/random?${characters.id}`}
                alt='Imagm Aleatoria'
                width={200}
                height={192}
                style={{
                  width: '100%',
                  maxHeight: '192px',
                  objectFit: 'cover'
                }}
              />

              <CardFooter>
                <Heading size='lg'>{characters.name}</Heading>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </SimpleGrid>

      <PaginationButtons page={page} hasNextPage={hasNextPage} onPageChange={handlePageChange} />
    </Flex>
  )
}