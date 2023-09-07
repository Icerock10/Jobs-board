'use client';
import styles from './Jobs.module.scss';
import MoneyIcon from '@/../public/SVG/money.svg';
import ScheduleIcon from '@/../public/SVG/schedule.svg';
import RankIcon from '@/../public/SVG/job_ranking.svg';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
export const Job = ({ listings }: any) => {
  return (
    <div className={styles.job}>
      {listings?.map((listing: any, index: number) => {
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
                <h3>{title}</h3>
                <span>{companyName}</span>
                <span className={styles.location}>{location}</span>
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
              <h4>{draft ?? 'Draft'}</h4>
            </div>
            <p className={styles.description}>{shortDescription}</p>
            <ButtonGroup id={_id}/>
          </div>
        );
      })}
    </div>
  );
};
