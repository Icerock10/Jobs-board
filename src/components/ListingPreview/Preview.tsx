import styles from './Preview.module.scss';
import clsx from 'clsx';
import MoneyIcon from '../../../public/SVG/money.svg';
import ScheduleIcon from '../../../public/SVG/schedule.svg';
import RankIcon from '../../../public/SVG/job_ranking.svg';
import { PreviewButton } from '@/components/Button/PreviewButton/PreviewButton';
import { useAppSelector } from '@/hooks/reduxHooks';

export const Preview = ({ isModalPreview }: { isModalPreview?: boolean }) => {
  const { listing } = useAppSelector(state => state.preview)
  return (
    <div className={clsx(styles.listings, isModalPreview && styles.listings_modalView)}>
      <div className={styles.listings_item}>
        <section className={styles.title_wrap}>
          <h2>{listing?.title}</h2>
        </section>
        <span className={styles.subtitle}>{listing?.companyName}</span>
        <span className={clsx(styles.location, styles.subtitle)}>{listing?.location}</span>
        <section className={styles.summary}>
          <div>
            <MoneyIcon />
            {listing?.salary}
          </div>
          <div>
            <ScheduleIcon />
            {listing?.type}
          </div>
          <div>
            <RankIcon />
            {listing?.experienceLevel}
          </div>
        </section>
      </div>
      <div className={styles.listings_footer}>
        <p className={styles.description}>{listing?.shortDescription}</p>
        {isModalPreview ? null : <PreviewButton>View More</PreviewButton>}
      </div>
    </div>
  );
};