import styles from './DropMenu.module.scss';
import clsx from 'clsx';
import React from 'react';
import { options } from '@/_utils/mocks/options';
import { useClickOutside } from '@/_hooks/useClickOutside';
import { getDataForPublish } from '@/store/preview/previewSlice';
import { useAppDispatch } from '@/_hooks/reduxHooks';
import { useVisibility } from '@/_hooks/useVisibility';

type DropMenuProps = {
  isDraftMenuOpen: boolean;
  toggleDraftMenu: () => void;
  title: string;
  id: string;
}

export const DropMenu = ({ isDraftMenuOpen, toggleDraftMenu, title, id }: DropMenuProps) => {
  const dispatch = useAppDispatch();
  const { draftMenuRef } = useClickOutside(toggleDraftMenu, isDraftMenuOpen);
  const { toggleModalAction } = useVisibility();
  
  return (
    <div
      ref={draftMenuRef}
      onClick={toggleDraftMenu}
      className={clsx(styles.dropdown, isDraftMenuOpen && styles.active)}
    >
      {options.map(({ days, price }, index) => {
        return (
          <div key={index} onClick={() => {
            dispatch(getDataForPublish({ price, days, title, id }));
            toggleModalAction();
          }}>
            {days} Days {`$${price}`}
          </div>
        );
      })}
    </div>
  );
};
