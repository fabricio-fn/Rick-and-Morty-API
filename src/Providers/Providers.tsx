"use client"

import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient()

interface iProviders {
  children: React.ReactNode;
}

export default function Providers({ children }: iProviders) {
  return (
    <CacheProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}