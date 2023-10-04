import React from 'react';
import styles from './Input.module.scss';
import { EMAIL_PATTERN } from '@/_utils/constants/constants';
import { validateUrl } from '@/_utils/helpers/validateUrl';

type InputProps = {
  labelText: string;
  type: string;
  name: string;
  register: any;
  watch?: any,
  hasError?: boolean;
};

export const Input = ({ labelText, type, name, register, watch, hasError }: InputProps) => {
  const isConfirm = name === 'confirm';
  const isEmail = name === 'email';
  const isURL = name === 'url';
  const isSalaryField = name === 'salary';
  return (
    <React.Fragment>
      <label className={hasError ? styles.dirty : ''} htmlFor={name}>{labelText}</label>
      <input
        type={type}
        className={styles.input}
        id={name}
        maxLength={30}
        {...register(name, {
          required: { value: true, message: 'Field is Required' },
          ...(isConfirm && { validate: (val: string) =>  watch('password') === val}),
          ...(isEmail && {pattern: { value: EMAIL_PATTERN, message: 'Invalid Email' }}),
          ...(isURL && {validate: (url: string) => validateUrl(url)}),
          ...(isSalaryField && {validate: (num: string) => parseInt(num) > 1 && parseInt(num) <= 10000})
        })}
      />
    </React.Fragment>
  );
};
