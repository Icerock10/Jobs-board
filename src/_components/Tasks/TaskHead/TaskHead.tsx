'use client';
import styles from './TaskHead.module.scss';
import React from 'react';
import clsx from 'clsx';
import SortIcon from '@/../public/SVG/sortIcon.svg';
import { Menu } from '@/_components/Tasks/TaskHead/Menu/Menu';
import { useIndex } from '@/_hooks/useIndex';
import { tableHeadMock } from '@/_utils/mocks/tableHead';

export const TaskHead = () => {
  const { index, toggleSelectedSortMenu } = useIndex();

  return (
    <div className={clsx(styles.table_head, index > 0 ? '' : styles.table_head__hovered)}>
      {tableHeadMock.map((item, i) => {
        const isSelected = index === i;
        return (
          <React.Fragment key={item}>
            <div onClick={() => toggleSelectedSortMenu(i)}
                 className={clsx(styles.table_head__item, isSelected && styles.table_head__item_active)}>
              {item}
              <SortIcon />
              <Menu isSelected={isSelected} toggleSelectedSortMenu={toggleSelectedSortMenu} criteria={item} />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};