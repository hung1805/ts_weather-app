import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Coordinates, WeatherResponse } from './types';
import instance from './api/axios.js';
import Notification from './components/Notification';
import { iconUrl } from './api/axios.js';
import FormInput from './components/FormInput';

const defaultCoord: Coordinates = {
  long: 139,
  lat: 35,
};

function App() {
  const [data, setData] = useState<WeatherResponse | undefined>();
  const [address, setAddress] = useState<Coordinates>({ long: 35, lat: 30 });
  const [error, setError] = useState<string>('');
  const [icon, setIcon] = useState<string>('');

  useEffect(() => {
    const fetch = async () => {
      const userLocation = navigator.geolocation.getCurrentPosition(
        (location) =>
          //Success Callback
          {
            setAddress({ long: location.coords.longitude, lat: location.coords.latitude });
          },
        //Error Callback
        (error) => {
          throw Error(error.message);
        }
        //Skip the option object
      );
      try {
        const res = await instance.get(`?lat=35&lon=139&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`);
        setData(res.data);
        setIcon(`${iconUrl}/${res.data.weather[0].icon}.png`);
      } catch (err) {
        console.log(err);
      }
    };
    fetch();
  }, []);

  return (
    <>
      <FormInput address={address} setAddress={setAddress} />
      {icon && <img src={icon} alt={icon} />}
      {error && <Notification error={error} />}
    </>
  );
}

export default App;
