import { getMyListings } from '@/lib/db/server-actions';
import { Job } from '@/components/Jobs/Job';
import styles from './Listings.module.scss';
import { cookiesService } from '@/lib/cookies/cookies-service';
import { Create } from '@/components/Create/Create';
export default async function ListingsPage() {
  const token = cookiesService.getToken()
  const listings = await getMyListings(token);
  return (
    <div className={styles.container}>
      <div className={styles.container_title}>
        <h1>My Job Listings</h1>
        <Create />
      </div>
      <Job listings={listings} />
    </div>
  );
}
