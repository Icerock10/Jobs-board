'use client';
import styles from './Modal.module.scss';
import { ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { toggleModal } from '@/store/visibility/visibilitySlice';
import clsx from 'clsx';
import { useClickOutside } from '@/hooks/useClickOutside';

export const Modal = ({ children }: { children?: ReactNode }) => {
  const isModalShown = useAppSelector(state => state.visibility.isModalShown);
  const dispatch = useAppDispatch()
  const toggleModalAction = () => dispatch(toggleModal())
  const { modalRef } = useClickOutside(toggleModalAction, isModalShown)
  return (
    <div className={clsx(styles.modal_container, isModalShown && styles.active)}>
      <div ref={modalRef} className={styles.modal}>
        {children}
      </div>
    </div>
  );
};
