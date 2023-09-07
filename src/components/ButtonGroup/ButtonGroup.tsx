import styles from './ButtonGroup.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import { removeJob } from '@/lib/db/_actions';
export const ButtonGroup = ({id}: {id: string}) => {
  return (
    <div className={styles.button_group}>
      <button onClick={() => removeJob(id)} className={styles.link}>Delete</button>
      <Link className={clsx(styles.link, styles.link_bordered)} href={`/jobs/edit`}>Edit</Link>
      <button className={styles.button}>Publish</button>
    </div>
  );
};
