import Link from 'next/link';
import { getPublished } from '@/lib/db/_actions';
import { Job } from '@/components/Jobs/Job';
import styles from './listings/Listings.module.scss'
export default async function Jobs() {
  const listings = await getPublished()
  return (
    <section className={styles.container}>
      Jobs are here
      <Link href={'/jobs/new'}>Create</Link>
      <Job listings={listings}/>
    </section>
  );
}
