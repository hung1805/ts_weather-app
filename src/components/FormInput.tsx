import { FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';
import { Coordinates } from '../types';

interface FormInputProps {
  address: Coordinates;
  setAddress: Dispatch<SetStateAction<Coordinates>>;
}

const FormInput: React.FC<FormInputProps> = ({ address, setAddress }) => {
  return (
    <>
      <FormControl>
        <FormLabel>Your Longtitude:</FormLabel>
        <Input type='number' onChange={(e) => setAddress({ ...address, long: +e.target.value })} />
      </FormControl>
      <FormControl>
        <FormLabel>Your Lattitude:</FormLabel>
        <Input type='number' onChange={(e) => setAddress({ ...address, lat: +e.target.value })} />
      </FormControl>
    </>
  );
};

export default FormInput;
