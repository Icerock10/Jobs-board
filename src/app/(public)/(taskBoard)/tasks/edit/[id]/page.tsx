'use client';

import { TaskForm } from '@/app/(public)/(taskBoard)/tasks/create/Form/TaskForm';
import { useAppSelector } from '@/_hooks/reduxHooks';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const { tasks } = useAppSelector(state => state.tasks)
  const foundTask = tasks.find(task => task._id === id)
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>Edit Task</h1>
      </div>
      <TaskForm foundTask={foundTask}/>
    </section>
  );
};