import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';
import { useClickOutside } from '@/_hooks/useClickOutside';
import clsx from 'clsx';
import styles from './Menu.module.scss';
import Link from 'next/link';
import React, { useCallback } from 'react';
import { TaskFields } from '@/app/(public)/(taskBoard)/tasks/TaskFeature/TableBody/Menu/TaskFields/TaskFields';
import { deleteTask, markTaskDeleted } from '@/store/tasks/taskSlice';
export const Menu = ({ toggleTaskMenu, isMenuShown }: {
  toggleTaskMenu: () => void,
  isMenuShown: boolean,
}) => {
  const { currentId } = useAppSelector(state => state.tasks);
  const { taskMenuRef } = useClickOutside(toggleTaskMenu, isMenuShown);
  const dispatch = useAppDispatch()
  const deleteTaskWithTimeout = useCallback((currentId?: string) => {
    dispatch(markTaskDeleted(currentId))
    setTimeout(() => {
      dispatch(deleteTask())
    }, 300)
  }, [dispatch])
  return (
    <div ref={taskMenuRef} className={clsx(styles.menu, isMenuShown && styles.menu_active)}>
      <TaskFields />
      <Link href={`/tasks/edit/${currentId}`}
            className={clsx(styles.menu_item, styles.divider)}><span>Edit</span></Link>
      <div onClick={() => deleteTaskWithTimeout(currentId)} className={styles.menu_item}><span>Delete</span></div>
    </div>
  );
};