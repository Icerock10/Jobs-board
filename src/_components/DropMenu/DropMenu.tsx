import styles from './DropMenu.module.scss';
import clsx from 'clsx';
import React from 'react';
import { options } from '@/_utils/mocks/options';
import { getSelectedPrice } from '@/store/visibility/visibilitySlice';
import { useAppDispatch } from '@/_hooks/reduxHooks';
import { useClickOutside } from '@/_hooks/useClickOutside';

export const DropMenu = ({
  isDraftMenuOpen,
  toggleDraftMenu,
  title,
  id,
}: {
  isDraftMenuOpen: boolean;
  toggleDraftMenu: () => void;
  title: string;
  id: string;
}) => {
  const dispatch = useAppDispatch();
  const { draftMenuRef } = useClickOutside(toggleDraftMenu, isDraftMenuOpen);
  return (
    <div
      ref={draftMenuRef}
      onClick={toggleDraftMenu}
      className={clsx(styles.dropdown, isDraftMenuOpen && styles.active)}
    >
      {options.map(({ days, price }, index) => {
        return (
          <div key={index} onClick={() => dispatch(getSelectedPrice({ price, days, title, id }))}>
            {days} Days {`$${price}`}
          </div>
        );
      })}
    </div>
  );
};
