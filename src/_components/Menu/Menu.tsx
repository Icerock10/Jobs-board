'use client';
import Link from 'next/link';
import { ProfileMenu } from '@/_components/ProfileMenu/ProfileMenu';
import styles from './Menu.module.scss';
import clsx from 'clsx';

export const Menu = ({ className, email }: { className?: string; email?: unknown | null }) => {
  return (
    <nav className={clsx(className, styles.nav, styles.hidden)}>
      <Link href={'/tasks'}>Task Board</Link>
      <Link href={'/jobs'}>Job Listings</Link>
      {email ? <ProfileMenu email={email} /> : <Link href={'/login'}>Login</Link>}
    </nav>
  );
};
