import styles from './CreateLink.module.scss';
import Link from 'next/link';
import { cookiesService } from '@/_lib/services/cookies/cookies-service';

export const CreateLink = () => {
  const token = cookiesService.getToken()
  return (
    <Link className={styles.create} href={token ? '/create': '/login'}>Create Listing</Link>
  );
};