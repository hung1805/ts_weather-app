import { Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { countryInstance, iconUrl, weatherInstance } from '../api/axios';
import { City, Country, WeatherResponse } from '../types';
import { capitalizeString } from '../utilities/utilities';
import PrimaryButton from './PrimaryButton';

interface CityFormProps {
  setError: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  country: string;
  countries: Country[] | [];
  setCountry: Dispatch<SetStateAction<string>>;
  setCountries: Dispatch<SetStateAction<Country[] | []>>;
  city: string;
  cities: City[] | [];
  setCity: Dispatch<SetStateAction<string>>;
  setCities: Dispatch<SetStateAction<City[] | []>>;
  setIcon: Dispatch<SetStateAction<string>>;
  setData: Dispatch<SetStateAction<WeatherResponse | undefined>>;
  onClose: () => void;
  setHeading: Dispatch<SetStateAction<string>>;
}
const CityFormInput: React.FC<CityFormProps> = ({
  isLoading,
  setIsLoading,
  setError,
  country,
  countries,
  setCountries,
  setCountry,
  cities,
  city,
  setCities,
  setCity,
  setData,
  setIcon,
  onClose,
  setHeading,
}) => {
  const fetchCountryData = async () => {
    const headers = { 'X-CSCAPI-KEY': `${import.meta.env.VITE_COUNTRY_API_KEY}` };
    const options = {
      method: 'GET',
      headers,
      redirect: 'follow',
    };
    try {
      await countryInstance.get('/countries', options).then((response) => {
        setCountries(response.data);
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const fetchCitiesByCountry = async () => {
    if (!country) return;
    else {
      const headers = { 'X-CSCAPI-KEY': `${import.meta.env.VITE_COUNTRY_API_KEY}` };
      const options = {
        method: 'GET',
        headers,
        redirect: 'follow',
      };

      const item = countries.filter((item) => item.name === country);
      if (item.length > 0) {
        try {
          await countryInstance.get(`/countries/${item[0].iso2}/cities`, options).then((response) => {
            setCities(response.data);
          });
        } catch (error) {
          if (error instanceof Error) {
            setError(error.message);
          }
        }
      }
    }
  };

  const getCityWeatherData = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await weatherInstance.get(`?q=${city}&appid=${import.meta.env.VITE_OPEN_WEATHER_API_KEY}`, {
        timeout: 5000,
      });
      if (response.data.cod === 200) {
        const temp = {
          coords: response.data.coord,
          description: {
            main: response.data.weather[0].main,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
          },
          main: response.data.main,
          wind: response.data.wind,
          location: {
            id: response.data.sys.id,
            country: response.data.sys.country,
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset,
          },
          id: response.data.id,
          name: response.data.name,
          timezone: response.data.timezone,
          visibility: response.data.visibility,
        };
        setData(temp);
        setIcon(`${iconUrl}${response.data.weather[0].icon}.png`);
        setHeading(`${capitalizeString(city)}'s Weather Data:`);
      } else throw new Error(response.data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
    setIsLoading(false);
  };

  const handleSelectContry = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };
  const handleSelectCity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCity(e.target.value);
  };

  const handleGetWeatherByCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (city) {
      getCityWeatherData(city);
      onClose();
    }
  };

  useEffect(() => {
    fetchCountryData();

    return () => {};
  }, []);
  useEffect(() => {
    fetchCitiesByCountry();
  }, [country]);

  return (
    <form onSubmit={(e) => handleGetWeatherByCity(e)}>
      <FormControl>
        <FormLabel>Your Country</FormLabel>
        {countries.length > 0 && (
          <Select placeholder='Choose a country' onChange={(e) => handleSelectContry(e)} display={'block'} my={12}>
            {countries.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        )}
        {cities.length > 0 ? (
          <Select placeholder='Choose a city' onChange={(e) => handleSelectCity(e)} display={'block'} my={12}>
            {cities.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </Select>
        ) : (
          <Select display={'block'} my={12} placeholder='Please choose a country to start'></Select>
        )}
      </FormControl>

      <Button variant={'outline'} type={'submit'} isLoading={isLoading} loadingText={'Submitting'}>
        Get Weather Data
      </Button>
    </form>
  );
};

export default CityFormInput;
