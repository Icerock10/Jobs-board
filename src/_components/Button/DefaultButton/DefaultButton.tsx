import clsx from 'clsx';
import styles from './DefaultButton.module.scss';
import { ReactNode } from 'react';
export const DefaultButton = ({
  handleClick = () => {},
  children,
}: {
  handleClick?: () => void;
  children: ReactNode;
}) => {
  const isCancelButton = children === 'Cancel';
  return (
    <button
      className={clsx(styles.secondary_btn, isCancelButton ? styles.secondary_btn__borderless : '')}
      onClick={e => {
        e.preventDefault();
        handleClick();
      }}
    >
      {children}
    </button>
  );
};