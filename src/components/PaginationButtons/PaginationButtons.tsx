import React from 'react'
import { Button, Flex } from '@chakra-ui/react'

interface PaginationButtonsProps {
  page: number
  hasNextPage: boolean
  onPageChange: (newPage: number) => void
}

export const PaginationButtons: React.FC<PaginationButtonsProps> = ({ page, onPageChange }) => {
  const handlePreviousClick = () => {
    if (page > 1) {
      onPageChange(page - 1)
    }
  }

  const handleNextClick = () => {
    onPageChange(page + 1)
  }

  return (
    <Flex gap='1rem'>
      {page > 1 && (
        <Button variant='solid' onClick={handlePreviousClick}>
          Previous
        </Button>
      )}

      <Button variant='solid' onClick={handleNextClick}>
        Next
      </Button>
    </Flex>
  )
}