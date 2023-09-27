import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';
import { useClickOutside } from '@/_hooks/useClickOutside';
import clsx from 'clsx';
import styles from './Menu.module.scss';
import { deleteTask } from '@/store/tasks/taskSlice';
import React from 'react';
import { TaskFields } from '@/app/(public)/tasks/TaskFeature/TableBody/Menu/TaskFields/TaskFields';
export const Menu = ({ toggleTaskMenu, isMenuShown }: {
  toggleTaskMenu: () => void,
  isMenuShown: boolean,
}) => {
  const dispatch = useAppDispatch();
  const { currentId } = useAppSelector(state => state.tasks);
  const { taskMenuRef } = useClickOutside(toggleTaskMenu, isMenuShown);
  return (
    <div ref={taskMenuRef} className={clsx(styles.menu, isMenuShown && styles.menu_active)}>
      <TaskFields />
      <div className={styles.menu_item}><span>Edit</span></div>
      <div onClick={() => dispatch(deleteTask(currentId))} className={styles.menu_item}><span>Delete</span></div>
    </div>
  );
};