'use client';
import styles from './Listings.module.scss';
import MoneyIcon from '@/../public/SVG/money.svg';
import ScheduleIcon from '@/../public/SVG/schedule.svg';
import RankIcon from '@/../public/SVG/job_ranking.svg';
import { ButtonGroup } from '@/components/ButtonGroup/ButtonGroup';
import { calculateDaysLeft } from '@/utils/helpers/compareDates';
import { getCurrentListing } from '@/store/preview/previewSlice';
import { IListing } from '@/utils/types/types';
import clsx from 'clsx';
import { PreviewButton } from '@/components/Button/PreviewButton/PreviewButton';
import { Modal } from '@/components/Modal/Modal';
import { Preview } from '@/components/ListingPreview/Preview';
import { useAppDispatch } from '@/hooks/reduxHooks';
export const Listings = ({ listings, hasPublicAccess }: { listings: IListing[], hasPublicAccess?: boolean }) => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.listings}>
      {listings.map((listing) => {
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
          <div className={styles.listings_wrapper} key={_id}>
            <div className={styles.listings_item}>
              <div className={styles.title}>
                <section className={styles.title_wrap}>
                  <h2>{title}</h2>
                  <span className={styles.draft}>{draft ? `${calculateDaysLeft(draft)}` : 'Draft'}</span>
                </section>
                <span className={styles.subtitle}>{companyName}</span>
                <span className={clsx(styles.location, styles.subtitle)}>{location}</span>
                <section className={styles.summary}>
                  <div>
                    <MoneyIcon /> {`$${salary}`}
                  </div>
                  <div>
                    <ScheduleIcon />
                    {type}
                  </div>
                  <div>
                    <RankIcon />
                    {experienceLevel}
                  </div>
                </section>
              </div>
            </div>
            <p className={styles.description}>{shortDescription}</p>
            {hasPublicAccess ?
              <div className={styles.listings_previewWrapper}>
                <div onClick={() => dispatch(getCurrentListing(listing))}><PreviewButton>View More</PreviewButton></div>
                <Modal><Preview isModalPreview={true} /></Modal>
              </div>
              :
              <ButtonGroup id={_id} title={title} draft={draft} />}
          </div>
        );
      })}
    </div>
  );
};
