import { Box, Container, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { iconUrl, weatherInstance } from './api/axios.js';
import CustomDrawer from './components/CustomDrawer.js';
import Navbar from './components/Navbar.js';
import Notification from './components/Notification';
import WeatherCard from './components/WeatherCard.js';
import { WeatherResponse } from './types';

function App() {
  const [data, setData] = useState<WeatherResponse | undefined>();
  const [long, setLong] = useState<number>(0);
  const [lat, setLat] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [icon, setIcon] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();

  const fetchData = async (lat: number, long: number): Promise<void> => {
    try {
      if (long && lat) {
        const res = await weatherInstance.get(
          `?lat=${lat}&lon=${long}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`
        );
        if (res.data.cod === 200) {
          const temp = {
            coords: res.data.coord,
            description: {
              main: res.data.weather[0].main,
              description: res.data.weather[0].description,
              icon: res.data.weather[0].icon,
            },
            main: res.data.main,
            wind: res.data.wind,
            location: {
              id: res.data.sys.id,
              country: res.data.sys.country,
              sunrise: res.data.sys.sunrise,
              sunset: res.data.sys.sunset,
            },
            id: res.data.id,
            name: res.data.name,
            timezone: res.data.timezone,
            visibility: res.data.visibility,
          };
          setData(temp);
          setIcon(`${iconUrl}${res.data.weather[0].icon}.png`);
        } else throw new Error(res.data);
      } else return;
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchData(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setError(error.message);
      }
    );
  }, []);

  return (
    <Box bgColor={'blackAlpha.100'} minH={'100vh'}>
      <Navbar isOpen={isOpen} onToggle={onToggle} />
      {data && (
        <Container>
          <WeatherCard data={data} icon={icon} />
        </Container>
      )}
      <CustomDrawer
        long={long}
        lat={lat}
        setLong={setLong}
        setLat={setLat}
        setError={setError}
        fetchData={fetchData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
      {error && <Notification error={error} />}
    </Box>
  );
}

export default App;
