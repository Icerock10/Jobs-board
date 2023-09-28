import styles from './DropDown.module.scss';
import clsx from 'clsx';
import { setTasksAttributes } from '@/store/tasks/taskSlice';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';

export const DropDown = ({ hoveredField, dropDownMenus, field }: {
  hoveredField: string | null,
  dropDownMenus: string[],
  field: string
}) => {
  const { tasks, currentId } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  return (
    <div className={clsx(styles.status, hoveredField === field && styles.status_active)}>
      {dropDownMenus.map((dropDownMenu, index) => {
        const isSelectedAttribute = tasks.find(task => task._id === currentId && task[field.toLowerCase()] === dropDownMenu);
        return (
          <div onClick={() => dispatch(setTasksAttributes({ currentId, field, dropDownMenu }))}
               className={clsx(styles.status_item, isSelectedAttribute && styles.status_marker)}
               key={`---${index}`}>
            <span>{dropDownMenu}</span>
          </div>
        );
      })}
    </div>
  );
};