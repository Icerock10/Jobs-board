'use client';
import styles from './TaskBody.module.scss';
import React from 'react';
import DotsIcon from '../../../../public/SVG/dots.svg';
import { Menu } from '@/_components/Tasks/TaskBody/Menu/Menu';
import clsx from 'clsx';
import { TaskItems } from '@/_components/Tasks/Taskitems/TaskItems';
import { useTasks } from '@/_hooks/useTasks';

export const TaskBody = () => {
  const { tasks, toggleTaskMenu } = useTasks();
  if (!tasks.length) {
    return (
      <div className={clsx(styles.table_body, styles.table_body__hovered, styles.table_body__placeholder)}>
        No results </div>
    );
  }
  return tasks?.map(({ title, status, priority, category, _id, isTaskMenuShown, isDeleted }) => {
    return (
      <div
        className={clsx(isDeleted && styles.deleted, styles.table_body, !isTaskMenuShown && styles.table_body__hovered)}
        key={_id}>
        <TaskItems taskItems={[title, status, priority, category]} />
        <div onClick={() => toggleTaskMenu(_id)} className={styles.dots}>
          <DotsIcon />
          <Menu toggleTaskMenu={toggleTaskMenu} isMenuShown={isTaskMenuShown} />
        </div>
      </div>
    );
  });
};