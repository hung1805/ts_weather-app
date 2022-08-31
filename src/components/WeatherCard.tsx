import { Container, Flex, Heading, Image, Text } from '@chakra-ui/react';
import bgImage from '../asset/images/image1.avif';
import { WeatherResponse } from '../types';
import { capitalizeString, convertKelvinToCel, detectDay } from '../utilities/utilities';

interface WeatherCardProps {
  data: WeatherResponse;
  icon: string;
}
const WeatherCard: React.FC<WeatherCardProps> = ({ data, icon }) => {
  const day = detectDay();
  return (
    <Container boxShadow={'xl'} maxWidth={'sm'} borderRadius={'10px'} color={'white'} bgImage={bgImage} p={6}>
      <Flex direction={'column'} alignItems={'center'}>
        <Heading fontSize={'sm'}>{day.day}</Heading>
        <Heading fontSize={'xl'}>{day.date}</Heading>
        <Image src={icon} alt={icon} fit={'cover'} sizes={'xl'} />
        <Heading fontSize={'2xl'} mb={2}>
          {data.name && data.name} {data.location.country && `(${data.location.country})`}
        </Heading>
        <Text>{capitalizeString(data.description.description)}</Text>
        <Flex
          direction={'row'}
          alignItems={'stretch'}
          gap={6}
          bgColor={'whiteAlpha.400'}
          p={2}
          m={4}
          borderRadius={'10px'}
        >
          <Flex direction={'column'} textAlign={'center'}>
            <Text>Current Temp</Text>
            <Text fontWeight={'bold'}>{convertKelvinToCel(data.main.temp)}&deg;C</Text>
          </Flex>
          <Flex direction={'column'} textAlign={'center'}>
            <Text>Feel Like</Text>
            <Text fontWeight={'bold'}>{convertKelvinToCel(+data.main.feels_like)}&deg;C</Text>
          </Flex>
          <Flex direction={'column'} textAlign={'center'}>
            <Text>Humidity</Text>
            <Text fontWeight={'bold'}>{data.main.humidity}%</Text>
          </Flex>
        </Flex>
      </Flex>
    </Container>
  );
};

export default WeatherCard;
