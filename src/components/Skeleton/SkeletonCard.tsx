import { Card, CardBody, CardHeader, Skeleton, SkeletonCircle, Box, SkeletonText } from "@chakra-ui/react";

export default function SkeletonCard() {
  return (
    <Card maxW='sm' margin='2' background='#f9f9f9'>
      <CardHeader>
       
          <SkeletonCircle size='10' />
        
      </CardHeader>

      <Box>
        <Skeleton height='190px' />
      </Box>
      
      <CardBody>
        <SkeletonText mt='2' noOfLines={2} spacing='4' skeletonHeight='5' />
      </CardBody>
    </Card >
  )
}