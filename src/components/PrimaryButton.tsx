import { Button } from '@chakra-ui/react';
import React from 'react';

interface ButtonProps {
  text: string;
  loadingText: string;
  isLoading: boolean;
}

const PrimaryButton: React.FC<ButtonProps> = ({ isLoading, text, loadingText }) => {
  return (
    <Button isLoading={isLoading} loadingText={loadingText} colorScheme='teal' variant='outline'>
      {text}
    </Button>
  );
};

export default PrimaryButton;
