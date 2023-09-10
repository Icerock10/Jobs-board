import styles from './DropMenu.module.scss';
import clsx from 'clsx';
import React from 'react';
import { getSelectedPrice } from '@/store/visibility/visibilitySlice';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useClickOutside } from '@/hooks/useClickOutside';

export const DropMenu = ({ options, isOpen, setIsOpen }: { options: {days: number, price: number}[]; isOpen: boolean, setIsOpen: (arg: boolean) => void }) => {
  const dispatch = useAppDispatch();
  const openDropDown = () => setIsOpen(!isOpen);
  const { dropDownRef } = useClickOutside(openDropDown, isOpen)
  return (
    <div ref={dropDownRef} onClick={openDropDown} className={clsx(styles.dropdown, isOpen && styles.active)}>
      {options.map(({ days, price }, index) => {
         return (
          <React.Fragment key={index}>
            <div onClick={() => dispatch(getSelectedPrice({price, days}))}>{days} Days {`$${price}`}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
