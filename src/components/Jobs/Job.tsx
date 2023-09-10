'use client';
import styles from './Jobs.module.scss';
import MoneyIcon from '@/../public/SVG/money.svg';
import ScheduleIcon from '@/../public/SVG/schedule.svg';
import RankIcon from '@/../public/SVG/job_ranking.svg';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { calculateDaysLeft } from '@/utils/helpers/compareDates';
import { IListing } from '@/utils/types/types';
import clsx from 'clsx';
export const Job = ({ listings, hasPublicAccess }: {listings: IListing[], hasPublicAccess?: boolean}) => {
  return (
    <div className={styles.job}>
      {listings?.map((listing) => {
        const {
          title,
          _id,
          companyName,
          type,
          location,
          draft,
          salary,
          experienceLevel,
          shortDescription,
        } = listing;
        return (
          <div className={styles.job_wrapper} key={_id}>
            <div className={styles.job_item}>
              <div className={styles.title}>
                <section className={styles.title_wrap}>
                  <h2>{title}</h2>
                  <span className={styles.draft}>{draft ? `Active - ${calculateDaysLeft(draft)}` : 'Draft'}</span>
                </section>
                <span className={styles.subtitle}>{companyName}</span>
                <span className={clsx(styles.location, styles.subtitle)}>{location}</span>
                <section className={styles.summary}>
                  <div>
                    <MoneyIcon /> {`$${salary}`}
                  </div>
                  <div>
                    <ScheduleIcon /> {type}
                  </div>
                  <div>
                    <RankIcon />
                    {experienceLevel}
                  </div>
                </section>
              </div>
            </div>
            <p className={styles.description}>{shortDescription}</p>
            {hasPublicAccess ? <span>View More</span> : <ButtonGroup id={_id} title={title} draft={draft} />}
          </div>
        );
      })}
    </div>
  );
};
