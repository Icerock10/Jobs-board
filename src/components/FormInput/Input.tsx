import React, { ChangeEvent } from 'react';
import styles from './Input.module.scss';
type InputProps = {
  type: string;
  name: string;
  handleChange: (fieldName: string, value: string) => void;
};

export const Input = ({ type, name, handleChange }: InputProps) => {
  const upperCaseFirstChar = name.charAt(0).toUpperCase() + name.slice(1);
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
