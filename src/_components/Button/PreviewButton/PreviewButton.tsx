import styles from './PreviewButton.module.scss';
import { ReactNode } from 'react';
import { useVisibility } from '@/_hooks/useVisibility';

export const PreviewButton = ({ children }: { children: ReactNode }) => {
  const { toggleModalAction } = useVisibility();
  return (
    <button onClick={toggleModalAction} className={styles.preview}>
      {children}
    </button>
  );
};