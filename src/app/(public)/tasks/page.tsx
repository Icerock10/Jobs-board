import styles from './Tasks.module.scss';
import React from 'react';
import { TaskBody } from '@/_components/Tasks/TaskBody/TaskBody';
import { TaskHead } from '@/_components/Tasks/TaskHead/TaskHead';
import { CreateTask } from '@/_components/Tasks/CreateTask/CreateTask';

export default function Tasks() {
 return (
   <section className='container'>
     <div className='container_title'>
       <h1>Tasks</h1>
       <CreateTask />
     </div>
     <div className={styles.table}>
       <TaskHead />
       <TaskBody />
     </div>
   </section>
 )
};












