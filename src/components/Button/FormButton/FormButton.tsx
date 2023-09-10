'use client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import styles from './Button.module.scss';
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { SmallSpinner } from '@/components/Spinner/Small/SmallSpinner';

export const FormButton = ({ children, isValid }: { children: ReactNode; isValid?: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <button disabled={!isValid} className={clsx(styles.submit_button, isValid ? styles.enabled : styles.disabled)}>
      {pending ? <SmallSpinner /> : children}
    </button>
  );
};
