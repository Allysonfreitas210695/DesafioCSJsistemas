import React from 'react';
import * as S from './styled';

type IInput = {
  type: string;
  placeholder: string;
  required?: boolean;
  name: string;
  id: string;
  onChange: (value:  React.ChangeEvent<HTMLInputElement>) => void
  value: string;
}

export const Input: React.FC<IInput> = ({type, placeholder, required = true, id, name, onChange, value}) => {
  return (
    <S.Input 
      type={type} 
      id={id} 
      name={name} 
      placeholder={placeholder} 
      required={required}
      onChange={onChange}
      value={value}
    />
  )
}
