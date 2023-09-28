'use client'
import PlusIcon from '@/../public/SVG/plus.svg'
import styles from './CreateTask.module.scss'
import Link from 'next/link';
export const CreateTask = () => {
  return (
      <Link className={styles.create} href={'/tasks/create'}><PlusIcon /> Task</Link>
  );
};