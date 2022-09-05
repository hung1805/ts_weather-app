import { Button } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  loadingText?: string;
  isLoading?: boolean;
  type: 'submit' | 'reset' | 'button' | undefined;
}

const PrimaryButton: React.FC<ButtonProps> = ({ type, isLoading, children, loadingText, onClick }) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      isLoading={isLoading}
      loadingText={loadingText}
      colorScheme='teal'
      variant='outline'
      mt={4}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
