import { ReactNode } from 'react';
import { CreateLink } from '@/_components/CreateLink/CreateLink';
import { FilterListings } from '@/_components/FilterListings/FilterListings';
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <section className='container'>
      <div className='container_title'>
        <h1>Job Listings</h1>
        <CreateLink />
      </div>
      <FilterListings />
      {children}
    </section>
  );
}