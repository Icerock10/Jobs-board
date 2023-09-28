import { useClickOutside } from '@/_hooks/useClickOutside';
import clsx from 'clsx';
import styles from './Menu.module.scss';
import TopArrow from '@/../public/SVG/top_arrow.svg';
import DownArrow from '@/../public/SVG/down_arrow.svg';
import CrossIcon from '@/../public/SVG/cross.svg';
import React from 'react';
import { sortingOptions } from '@/_utils/mocks/sortingOptions';
import { useClientActions } from '@/_hooks/useClientActions';
export const Menu = ({ isSelected, toggleSelectedSortMenu, criteria }: {
  isSelected: boolean,
  toggleSelectedSortMenu: () => void,
  criteria: string
}) => {
  const { sortMenuRef } = useClickOutside(toggleSelectedSortMenu, isSelected);
  const { clearSort, sortByCriteria } = useClientActions();
  
  return (
    <div ref={sortMenuRef} className={clsx(styles.sort, isSelected && styles.sort_active)}>
      {sortingOptions.map(sortingOption => {
        const isSortingOption = sortingOption.includes('Clear');
        const hasDescOption = sortingOption === 'Desc';
        const hasAscOption = sortingOption === 'Asc';
        return (
          <div className={clsx(hasDescOption ? styles.divider : '', isSortingOption && styles.cross)}
               onClick={() => isSortingOption ? clearSort() : sortByCriteria(sortingOption, criteria)}
               key={sortingOption}>
            {hasAscOption && <TopArrow />}
            {hasDescOption && <DownArrow />}
            {isSortingOption && <CrossIcon />}
            {sortingOption}
          </div>
        );
      })}
    </div>
  );
};