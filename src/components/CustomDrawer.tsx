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
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';
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
}
const CustomDrawer: React.FC<DrawerProps> = (props) => {
  const { long, lat, setLong, setLat, setError, fetchData, isLoading, setIsLoading, isOpen, onClose, onOpen } = props;

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement={'right'}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Choose your coordinate</DrawerHeader>
        <DrawerBody>
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
          />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default CustomDrawer;
