import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface NotificationProps {
  error: string;
}

const Notification: React.FC<NotificationProps> = ({ error }) => {
  useEffect(() => {
    if (error) toast.warn(error);
  }, [error]);
  return <ToastContainer closeOnClick position='top-right' />;
};

export default Notification;
