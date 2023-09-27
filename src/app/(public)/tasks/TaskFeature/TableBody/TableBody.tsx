'use client';
import styles from './TableBody.module.scss';
import React, { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';
import { showTaskMenu } from '@/store/tasks/taskSlice';
import { Menu } from '@/app/(public)/tasks/TaskFeature/TableBody/Menu/Menu';
export const TableBody = () => {
  const { tasks } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  const toggleTaskMenu = useCallback((id?: string) => dispatch(showTaskMenu(id)), [dispatch]);
  return tasks.map((task) => {
    return (
      <div className={styles.table_body} key={task._id}>
        <div>{task.title}</div>
        <div>{task.status}</div>
        <div>{task.priority}</div>
        <div>{task.category}</div>
        <div onClick={() => toggleTaskMenu(task._id)} className={styles.dots}>
          <div>...</div>
          <Menu toggleTaskMenu={toggleTaskMenu} isMenuShown={task?.isTaskMenuShown} />
        </div>
      </div>
    );
  })
};