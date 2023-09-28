import styles from './Tasks.module.scss';
import React from 'react';
import { TableHead } from '@/app/(public)/(taskBoard)/tasks/TaskFeature/TableHead/TableHead';
import { TableBody } from '@/app/(public)/(taskBoard)/tasks/TaskFeature/TableBody/TableBody';
import { CreateTask } from '@/_components/Tasks/CreateTask/CreateTask';

export default function Tasks() {
 return (
   <section className='container'>
     <div className='container_title'>
       <h1>Tasks</h1>
       <CreateTask />
     </div>
     <div className={styles.table}>
       <TableHead />
       <TableBody />
     </div>
   </section>
 )
};












