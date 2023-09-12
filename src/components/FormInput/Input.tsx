import React, { ChangeEvent } from 'react';
import styles from './Input.module.scss';
type InputProps = {
  labelText: string;
  type: string;
  name: string;
  handleChange?: (fieldName: string, value: string) => void;
};

export const Input = ({ labelText, type, name, handleChange = () => {} }: InputProps) => {
  const upperCaseFirstChar = labelText.charAt(0).toUpperCase() + labelText.slice(1);
  return (
    <React.Fragment>
      <label htmlFor={name}>{upperCaseFirstChar}</label>
      <input
        className={styles.input}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(name, e.target.value)}
        name={name}
        id={name}
        type={type}
      />
    </React.Fragment>
  );
};
