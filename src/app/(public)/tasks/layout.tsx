import { ReactNode } from 'react';
export default function Layout({children}: {children: ReactNode}) {
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>Tasks</h1>
        <h5>Create Task</h5>
      </div>
      {children}
    </section>
  )
}