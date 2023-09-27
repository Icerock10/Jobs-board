import styles from './Tasks.module.scss';
import React from 'react';
import { TableHead } from '@/app/(public)/tasks/TaskFeature/TableHead/TableHead';
import { TableBody } from '@/app/(public)/tasks/TaskFeature/TableBody/TableBody';

export default function Tasks() {
  return (
    <div className={styles.table}>
      <TableHead />
      <TableBody />
    </div>
  );
};












