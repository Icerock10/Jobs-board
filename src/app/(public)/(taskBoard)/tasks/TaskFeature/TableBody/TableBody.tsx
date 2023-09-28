'use client';
import styles from './TableBody.module.scss';
import React, { useCallback } from 'react';
import DotsIcon from '@/../public/SVG/dots.svg';
import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';
import { showTaskMenu } from '@/store/tasks/taskSlice';
import {Menu} from '@/app/(public)/(taskBoard)/tasks/TaskFeature/TableBody/Menu/Menu';
import clsx from 'clsx';
import {TaskItems} from '@/app/(public)/(taskBoard)/tasks/TaskFeature/TableBody/TaskItems';

export const TableBody = () => {
  const { tasks } = useAppSelector(state => state.tasks);
  const dispatch = useAppDispatch();
  const toggleTaskMenu = useCallback((id?: string) => dispatch(showTaskMenu(id)), [dispatch]);
  
  return tasks.map(({ title, status, priority, category, _id, isTaskMenuShown }) => {
    return (
      <div className={clsx(styles.table_body, !isTaskMenuShown && styles.table_body__hovered)} key={_id}>
        <TaskItems taskItems={[title, status, priority, category]} />
        <div onClick={() => toggleTaskMenu(_id)} className={styles.dots}>
          <DotsIcon />
          <Menu toggleTaskMenu={toggleTaskMenu} isMenuShown={isTaskMenuShown} />
        </div>
      </div>
    );
  });
};