import { Box, SkeletonText } from "@chakra-ui/react";

export default function SkeletonCharacter() {
  return (
    <Box minW='100vh' height='40vh' padding='6' boxShadow='lg' bg='#f9f9f9' borderRadius='.3rem'>
      <SkeletonText noOfLines={4} spacing='2' skeletonHeight='10' />
    </Box>
  )
}