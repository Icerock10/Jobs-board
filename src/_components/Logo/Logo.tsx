'use client'
import styles from './Logo.module.scss';
import VercelLogo from '@/../public/SVG/vercel.svg';
export const Logo = () => {
  return (
      <div className={styles.logo}>
        <VercelLogo />
      </div>
  );
};