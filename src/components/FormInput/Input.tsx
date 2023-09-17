import React from 'react';
import styles from './Input.module.scss';
import { EMAIL_PATTERN } from '@/utils/constants/constants';
import { validateUrl } from '@/utils/helpers/validateUrl';

type InputProps = {
  labelText: string;
  type: string;
  name: string;
  register: any;
  watch?: any
};

export const Input = ({ labelText, type, name, register, watch }: InputProps) => {
  const isConfirm = name === 'confirm';
  const isEmail = name === 'email';
  const isURL = name === 'url';
  return (
    <React.Fragment>
      <label htmlFor={name}>{labelText}</label>
      <input
        type={type}
        className={styles.input}
        id={name}
        {...register(name, {
          required: { value: true, message: 'Field is Required' },
          ...(isConfirm && { validate: (val: string) =>  watch('password') === val}),
          ...(isEmail && {pattern: { value: EMAIL_PATTERN, message: 'Invalid Email' }}),
          ...(isURL && {validate: (url: string) => validateUrl(url)})
        })}
      />
    </React.Fragment>
  );
};
