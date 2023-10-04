import styles from './CreateLink.module.scss';
import Link from 'next/link';
import { cookiesService } from '@/_lib/services/cookies/cookies-service';
import { AppPath } from '@/_utils/enums/enums';

export const CreateLink = () => {
  const token = cookiesService.getToken()
  return (
    <Link className={styles.create} href={token ? AppPath.CREATE : AppPath.LOGIN}>Create Listing</Link>
  );
};