import { TaskForm } from '@/_components/Tasks/Form/TaskForm';

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
