'use client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import styles from './Button.module.scss';
import React from 'react';
import clsx from 'clsx';
import { SmallSpinner } from '@/components/Spinner/Small/SmallSpinner';

export const LoadingButton = ({ isLogin, isValid }: { isLogin: string; isValid?: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <button disabled={!isValid} className={clsx(styles.submit_button, isValid ? styles.enabled : styles.disabled)}>
      {pending ? <SmallSpinner /> : isLogin}
    </button>
  );
};
