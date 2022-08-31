import { Button } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  loadingText: string;
  isLoading: boolean;
  type: 'submit' | 'reset' | 'button' | undefined;
}

const PrimaryButton: React.FC<ButtonProps> = ({ type, isLoading, children, loadingText }) => {
  return (
    <Button type={type} isLoading={isLoading} loadingText={loadingText} colorScheme='teal' variant='outline' mt={4}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
