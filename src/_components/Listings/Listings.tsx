'use client';
import styles from './Listings.module.scss';
import MoneyIcon from '@/../public/SVG/money.svg';
import ScheduleIcon from '@/../public/SVG/schedule.svg';
import RankIcon from '@/../public/SVG/job_ranking.svg';
import { ButtonGroup } from '@/_components/ButtonGroup/ButtonGroup';
import { calculateDaysLeft } from '@/_utils/helpers/compareDates';
import { IListing } from '@/_utils/types/types';
import clsx from 'clsx';
import { PreviewButton } from '@/_components/Button/PreviewButton/PreviewButton';
import { Modal } from '@/_components/Modal/Modal';
import { Preview } from '@/_components/ListingPreview/Preview';
import { useAppSelector } from '@/_hooks/reduxHooks';
import { useClientActions } from '@/_hooks/useClientActions';
export const Listings = ({ listings, hasPublicAccess }: { listings: IListing[], hasPublicAccess?: boolean }) => {
  const stateListing = useAppSelector(state => state.preview.listing);
  const { getCurrentListing } = useClientActions();
  
  return (
    <div className={styles.listings}>
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
                <div onClick={() => getCurrentListing(listing)}><PreviewButton>View More</PreviewButton></div>
                <Modal>
                  <Preview isModalPreview={true} listing={stateListing} />
                </Modal>
              </div>
              :
              <ButtonGroup id={_id} title={title} draft={draft} />}
          </div>
        );
      })}
    </div>
  );
};
