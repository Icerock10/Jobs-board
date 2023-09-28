import { TaskForm } from '@/app/(public)/(taskBoard)/tasks/create/Form/TaskForm';

export default function Page() {
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>New Task</h1>
      </div>
      <TaskForm />
    </section>
  );
};
