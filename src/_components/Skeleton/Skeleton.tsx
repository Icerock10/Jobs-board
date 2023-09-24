'use client';
import styles from './Skeleton.module.scss';
import MoneyIcon from '@/../public/SVG/money.svg';
import ScheduleIcon from '@/../public/SVG/schedule.svg';
import RankIcon from '@/../public/SVG/job_ranking.svg';
import clsx from 'clsx';

export const Skeleton = () => {
  return (
    <div className={styles.gridContainer}>
      {[...Array(9)].map((_, i) => {
        return (
          <div key={i} className={styles.gridContainer_item}>
            <div className={styles.item_heading}></div>
            <div className={clsx(styles.item_heading, styles.item_heading__small)}></div>
            <div className={clsx(styles.item_heading, styles.item_heading__medium)}></div>
            <div className={styles.item_summary}>
              <div><MoneyIcon /></div>
              <div><ScheduleIcon /></div>
              <div><RankIcon /></div>
            </div>
            <div className={styles.item_main}></div>
            <div className={styles.item_main}></div>
            <div className={clsx(styles.item_main, styles.item_main__medium)}></div>
            <div className={styles.item_footer}></div>
          </div>
        )
      })}
    </div>
  );
};