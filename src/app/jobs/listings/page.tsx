import { getAllJobs } from '@/lib/db/_actions';
import { cookies } from 'next/headers';
import { Job } from '@/components/Listings/Job';
export default async function ListingsPage() {
  // here I'm going to fetch all listings
  const token = cookies().get('token')?.value
  const listings = await getAllJobs(token)
  return (
    <>
      <div>Very Protected page!!!!!!</div>
      <Job listings={listings}/>
    </>
  );
}
