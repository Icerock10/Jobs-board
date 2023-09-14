'use client';
import styles from './Modal.module.scss';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useVisibility } from '@/hooks/useVisibility';
import CrossIcon from '../../../public/SVG/cross.svg';

export const Modal = ({ children }: { children?: ReactNode }) => {
  const { isModalShown, toggleModalAction } = useVisibility();
  const { modalRef } = useClickOutside(toggleModalAction, isModalShown);
  return (
    <div className={clsx(styles.modal_container, isModalShown && styles.active)}>
      <div ref={modalRef} className={styles.modal}>
        <button className={styles.cancel} onClick={toggleModalAction}>
          <CrossIcon />
        </button>
        {children}
      </div>
    </div>
  );
};
