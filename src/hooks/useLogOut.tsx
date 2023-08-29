'use client';
import { removeTokenFromCookies } from '@/lib/db/_actions';
import { useRouter } from 'next/navigation';
export const useLogOut = () => {
  const { refresh, replace } = useRouter();
  const logOut = () => {
    void removeTokenFromCookies();
    replace('/login');
    refresh();
  };
  return { logOut };
};
