'use client';
import styles from './Button.module.scss';
import React, { ReactNode } from 'react';
import clsx from 'clsx';
import { SmallSpinner } from '@/_components/Spinner/Small/SmallSpinner';

export const FormButton = ({ children, isValid, isSubmitting, handleClick }: { children: ReactNode; isValid?: boolean, isSubmitting: boolean, handleClick?: () => void }) => {
  return (
    <button onClick={handleClick} disabled={!isValid || isSubmitting} className={clsx(styles.submit_button, isValid ? styles.enabled : styles.disabled)}>
      {isSubmitting ? <SmallSpinner /> : children}
    </button>
  );
};
