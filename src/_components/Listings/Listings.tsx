'use client';
import styles from './Listings.module.scss';
import MoneyIcon from '@/../public/SVG/money.svg';
import ScheduleIcon from '@/../public/SVG/schedule.svg';
import NotVisibleIcon from '@/../public/SVG/not_visible.svg';
import VisibleIcon from '@/../public/SVG/visible.svg';
import Heart from '@/../public/SVG/heart.svg';
import RankIcon from '@/../public/SVG/job_ranking.svg';
import { ButtonGroup } from '@/_components/ButtonGroup/ButtonGroup';
import { calculateDaysLeft } from '@/_utils/helpers/compareDates';
import { IListing } from '@/_utils/types/types';
import clsx from 'clsx';
import { PreviewButton } from '@/_components/Button/PreviewButton/PreviewButton';
import { Modal } from '@/_components/Modal/Modal';
import { Preview } from '@/_components/ListingPreview/Preview';
import { useAppDispatch, useAppSelector } from '@/_hooks/reduxHooks';
import { useClientActions } from '@/_hooks/useClientActions';
import { useEffect } from 'react';
import { setListings } from '@/store/preview/previewSlice';

export const Listings = ({ listings, hasPublicAccess }: { listings: IListing[], hasPublicAccess?: boolean }) => {
  const stateListing = useAppSelector(state => state.preview.listing);
  const { arrayOfListings, showHidden } = useAppSelector(state => state.preview);
  const dispatch = useAppDispatch();
  const { getCurrentListing, setHiddenAndWriteToLocalStorage, setLikeAndWriteToLocalStorage } = useClientActions();
  
  useEffect(() => {
    dispatch(setListings(listings));
  }, [dispatch, listings]);
  
  return (
    <div className={styles.listings}>
      {arrayOfListings?.map((listing) => {
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
          isHidden,
          isLiked
        } = listing;
        return (
          <div className={clsx(styles.listings_wrapper, isHidden && styles.hidden, showHidden && styles.showHidden)}
               key={_id}>
            <div className={styles.listings_item}>
              <div className={styles.title}>
                <section className={styles.title_wrap}>
                  <h2>{title}</h2>
                  {hasPublicAccess ?
                    <div className={styles.listings_btnGroup}>
                      <button onClick={() => setHiddenAndWriteToLocalStorage(_id)}>
                        {isHidden ? <VisibleIcon /> : <NotVisibleIcon />}
                      </button>
                      <button onClick={() => setLikeAndWriteToLocalStorage(_id)}><Heart className={clsx(isLiked && styles.heart)} /></button>
                    </div>
                    :
                    <span className={styles.draft}>{draft ? `${calculateDaysLeft(draft)}` : 'Draft'}</span>}
                </section>
                <span className={styles.subtitle}>{companyName}</span>
                <span className={clsx(styles.location, styles.subtitle)}>{location}</span>
                <section className={styles.summary}>
                  <div>
                    <MoneyIcon /> {`$${salary.toLocaleString()}`}
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
