import { ReactNode } from 'react';
export default function Layout({children}: {children: ReactNode}) {
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>Edit Listing</h1>
      </div>
      {children}
    </section>
  )
}