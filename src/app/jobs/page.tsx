import { getPublished } from '@/lib/db/server-actions';
import { Job } from '@/components/Jobs/Job';
import styles from './listings/Listings.module.scss'
import { Create } from '@/components/Create/Create';
export default async function Jobs() {
  const listings = await getPublished()
  return (
    <section className={styles.container}>
      <div className={styles.container_title}>
        <h1>Jobs</h1>
        <Create />
      </div>
      <Job listings={listings} hasPublicAccess={true}/>
    </section>
  );
}
