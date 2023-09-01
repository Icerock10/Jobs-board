'use client'
import Link from 'next/link';
import { ProfileMenu } from '@/components/ProfileMenu/ProfileMenu';
import styles from './Menu.module.scss';
import clsx from 'clsx';
import cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { authService } from '@/lib/api-requests/auth-service';

export const Menu = ({ className }: { className?: string }) => {
  const [email, setEmail] = useState(null)
  const token = cookies.get('token')
  useEffect(() => {
    const fetchUser = async () => {
        const response = await authService.getAuthUser(token)
        if(response?.status === 401) {
          return setEmail(null)
        }
        setEmail(response?.data?.email)
    }
    void fetchUser()
  }, [token])
  
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


