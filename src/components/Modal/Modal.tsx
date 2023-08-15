import styles from './Modal.module.scss';
import { ReactNode } from 'react';

export const Modal = ({ children, isShown, toggle }: {
  children?: ReactNode,
  isShown: boolean,
  toggle: () => void
}) => {
  return (
    <>
      {isShown ?
        <div className={styles.modal__container}>
          <div className={styles.modal}>
            <button onClick={toggle}>X</button>
            {children}
          </div>
        </div>
        :
        null
      }
    </>
  );
};