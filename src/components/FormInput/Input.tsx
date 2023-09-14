import React, { ChangeEvent, useState } from 'react';
import styles from './Input.module.scss';
import { useAppSelector } from '@/hooks/reduxHooks';
import { IListing } from '@/utils/types/types';
type InputProps = {
  labelText: string;
  type: string;
  name: string;
  handleChange?: (fieldName: string, value: string) => void;
  value: string | number | boolean | Date | null
};

export const Input = ({ labelText, type, name, handleChange = () => {}, value }: InputProps) => {
  const upperCaseFirstChar = labelText.charAt(0).toUpperCase() + labelText.slice(1);
  const [val, setVal] = useState(value)
  return (
    <React.Fragment>
      <label htmlFor={name}>{upperCaseFirstChar}</label>
      <input
        className={styles.input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setVal(e.target.value)
          handleChange(name, e.target.value)
        }}
        name={name}
        id={name}
        max={90000}
        type={type}
        value={val as string}
      />
    </React.Fragment>
  );
};
