import React, { useEffect } from 'react';
import { Toast, useToast } from '@chakra-ui/react';

interface NotificationProps {
  error: string;
}

const Notification: React.FC<NotificationProps> = ({ error }) => {
  const toast = useToast();
  useEffect(() => {
    if (error)
      toast({
        title: 'Error',
        description: error,
        status: 'error',
        duration: 3000,
        position: 'top-right',
        isClosable: true,
      });
  }, [error]);
  return <></>;
};

export default Notification;
