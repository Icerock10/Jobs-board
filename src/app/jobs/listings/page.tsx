import { getMyListings } from '@/lib/db/_actions';
import { cookies } from 'next/headers';
import { Job } from '@/components/Jobs/Job';
import styles from './Listings.module.scss';
import Link from 'next/link';
export default async function ListingsPage() {
  const token = cookies().get('token')?.value;
  const listings = await getMyListings(token);
  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <h1>My Job Listings</h1>
        <Link href={token ? '/jobs/new' : '/login'}>Create Listing</Link>
      </div>
      <Job listings={listings} />
    </div>
  );
}
