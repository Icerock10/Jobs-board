'use client'
import styles from './Logo.module.scss';
import VercelLogo from '@/../public/SVG/vercel.svg';
import Link from 'next/link';
import { AppPath } from '@/_utils/enums/enums';

export const Logo = () => {
  return (
      <Link href={AppPath.JOBS} className={styles.logo}>
        <VercelLogo />
      </Link>
  );
};