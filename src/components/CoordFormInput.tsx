import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormLabel,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import PrimaryButton from './PrimaryButton';

interface FormInputProps {
  long: number;
  lat: number;
  setLat: Dispatch<SetStateAction<number>>;
  setLong: Dispatch<SetStateAction<number>>;
  setError: Dispatch<SetStateAction<string>>;
  fetchData: (lat: number, long: number) => Promise<void>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  setHeading: Dispatch<SetStateAction<string>>;
}

const CoordFormInput: React.FC<FormInputProps> = ({
  long,
  lat,
  setLong,
  setLat,
  fetchData,
  setError,
  isLoading,
  setIsLoading,
  onClose,
  setHeading,
}) => {
  const handleGetWeatherByCoord = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lat && long && lat !== 0 && long !== 0) {
      setIsLoading(true);
      fetchData(lat, long);
      setIsLoading(false);
      setHeading(`Weather Data at ${long}(long) and ${lat}(lat):`);
      onClose();
    } else setError('Pick up your long and lat');
  };

  return (
    <form onSubmit={(e) => handleGetWeatherByCoord(e)}>
      <FormControl>
        <FormLabel>Your Longtitude:</FormLabel>
        <Input type='number' value={long} onChange={(e) => setLong(+e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Your Lattitude:</FormLabel>
        <Input type='number' value={lat} onChange={(e) => setLat(+e.target.value)} />
      </FormControl>
      <PrimaryButton type={'submit'} isLoading={isLoading} loadingText={'Submitting'}>
        Get Weather Data
      </PrimaryButton>
    </form>
  );
};

export default CoordFormInput;
