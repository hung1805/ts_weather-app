import { Box, Flex, Heading, IconButton } from '@chakra-ui/react';
import React from 'react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';

interface NavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Navbar: React.FC<NavProps> = ({ isOpen, onToggle }) => {
  const handleToggleDrawer = () => {
    onToggle();
  };
  return (
    <Flex direction={'row'} justifyContent={'space-around'} p={6}>
      <Heading size={'md'} color={'green.700'}>
        Weather App
      </Heading>
      <IconButton aria-label='Toggle Drawer' onClick={handleToggleDrawer} icon={<HamburgerIcon w={5} h={5} />} />
    </Flex>
  );
};

export default Navbar;
