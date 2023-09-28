import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';
import { useClickOutside } from '@/_hooks/useClickOutside';
import clsx from 'clsx';
import styles from './Menu.module.scss';
import { deleteTask } from '@/store/tasks/taskSlice';
import Link from 'next/link';
import React from 'react';
import {TaskFields} from '@/app/(public)/(taskBoard)/tasks/TaskFeature/TableBody/Menu/TaskFields/TaskFields';
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
      <Link href={`/tasks/edit/${currentId}`} className={clsx(styles.menu_item, styles.divider)}><span>Edit</span></Link>
      <div onClick={() => dispatch(deleteTask(currentId))} className={styles.menu_item}><span>Delete</span></div>
    </div>
  );
};