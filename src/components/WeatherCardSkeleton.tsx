import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react';
interface Props {}

const WeatherCardSkeleton: React.FC<Props> = () => {
  return (
    <Box borderRadius={'10px'}>
      <Flex direction={'column'}>
        <SkeletonText noOfLines={1} my={2} />
        <Flex justifyContent={'center'}>
          <SkeletonCircle size={'50px'} />
        </Flex>
        <SkeletonText noOfLines={1} my={2} />
        <SkeletonText noOfLines={1} my={2} />
        <Skeleton p={8} mt={3} />
      </Flex>
    </Box>
  );
};

export default WeatherCardSkeleton;
