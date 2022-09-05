import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useColorMode,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';
import { City, Country, WeatherResponse } from '../types';
import CityFormInput from './CityFormInput';
import CoordFormInput from './CoordFormInput';

interface DrawerProps {
  long: number;
  lat: number;
  setLat: Dispatch<SetStateAction<number>>;
  setLong: Dispatch<SetStateAction<number>>;
  setError: Dispatch<SetStateAction<string>>;
  fetchData: (lat: number, long: number) => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
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
  setHeading: Dispatch<SetStateAction<string>>;
}
const CustomDrawer: React.FC<DrawerProps> = (props) => {
  const {
    long,
    lat,
    setLong,
    setLat,
    setError,
    fetchData,
    isLoading,
    setIsLoading,
    isOpen,
    onClose,
    onOpen,
    countries,
    country,
    setCountries,
    setCountry,
    cities,
    city,
    setCities,
    setCity,
    setData,
    setIcon,
    setHeading,
  } = props;
  const { toggleColorMode } = useColorMode();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={'right'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Choose your coordinate</DrawerHeader>
        <DrawerBody>
          <Tabs variant={'enclosed'}>
            <TabList>
              <Tab>Coord</Tab>
              <Tab>City</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <CoordFormInput
                  long={long}
                  lat={lat}
                  setLong={setLong}
                  setLat={setLat}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  fetchData={fetchData}
                  setError={setError}
                  onClose={onClose}
                  setHeading={setHeading}
                />
              </TabPanel>
              <TabPanel>
                <CityFormInput
                  setError={setError}
                  isLoading={isLoading}
                  countries={countries}
                  setIsLoading={setIsLoading}
                  country={country}
                  setCountries={setCountries}
                  setCountry={setCountry}
                  city={city}
                  cities={cities}
                  setCity={setCity}
                  setCities={setCities}
                  setData={setData}
                  setIcon={setIcon}
                  onClose={onClose}
                  setHeading={setHeading}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
