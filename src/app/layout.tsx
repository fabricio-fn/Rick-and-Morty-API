import Providers from '@/Providers/Providers'
import Header from '@/components/Header/Header'
import { Container } from '@chakra-ui/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Desafio Adam Robo',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Container
            p='1rem 5%' maxW='1920px' minH='100vh'
            bg='#222222' display='flex' gap='1rem' flexDirection='column'
          >
            <Header />

            {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}