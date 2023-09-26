import { CreateLink } from '@/_components/CreateLink/CreateLink';
import { ReactNode } from 'react';
export default function Template({children}: {children: ReactNode}) {
  return (
    <div className='container'>
      <div className='container_title'>
        <h1>My Job Listings</h1>
        <CreateLink />
      </div>
      {children}
    </div>
  )
}