import styles from './CreateLink.module.scss';
import Link from 'next/link';
import { cookiesService } from '@/lib/cookies/cookies-service';

export const CreateLink = () => {
  const token = cookiesService.getToken()
  return (
    <Link className={styles.create} href={token ? '/jobs/new': '/login'}>Create Listing</Link>
  );
};