'use client'
import Link from 'next/link';
import { ProfileMenu } from '@/components/ProfileMenu/ProfileMenu';
import styles from './Menu.module.scss';
import clsx from 'clsx';
import { useAuth } from '@/hooks/useAuth';

export const Menu = ({ className }: { className?: string }) => {
  const { email } = useAuth()
  return (
    <nav className={clsx(className, styles.nav, styles.hidden)}>
      <Link href={'/tasks'}>
        Task Board
      </Link>
      <Link href={'/jobs'}>Job Listings</Link>
      {email ? <ProfileMenu email={email}/> : <Link href={'/login'}>Login</Link>}
    </nav>
  );
};


