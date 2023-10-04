import styles from './Preview.module.scss';
import clsx from 'clsx';
import MoneyIcon from '../../../../public/SVG/money.svg';
import ScheduleIcon from '../../../../public/SVG/schedule.svg';
import RankIcon from '../../../../public/SVG/job_ranking.svg';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LinkIcon from '../../../../public/SVG/link.svg';
import { PreviewButton } from '@/_components/Button/PreviewButton/PreviewButton';
import Link from 'next/link';
import { IListing } from '@/_utils/types/types';

export const Preview = ({ isModalPreview, listing }: { isModalPreview?: boolean, listing: IListing }) => {
  return (
    <div className={clsx(isModalPreview ? '' : styles.preview)}>
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
              {Number(listing?.salary).toLocaleString()}
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
          {isModalPreview &&
            <Link className={styles.jobLink} href={!listing?.url ? '#' : listing?.url}>Apply On Company
              Site <LinkIcon /></Link>}
        </div>
        <div className={styles.listings_footer}>
          <div className={clsx(styles.description, styles.markdown)}>{isModalPreview ? <ReactMarkdown
            remarkPlugins={[remarkGfm]}>{listing?.fullDescription}</ReactMarkdown> : listing.shortDescription}</div>
          {isModalPreview ? null : <PreviewButton>View More</PreviewButton>}
        </div>
      </div>
    </div>
  );
};