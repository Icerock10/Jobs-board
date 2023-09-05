'use client';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { logOut as logOutAction } from '@/store/auth/actions';

export const useLogOut = () => {
  const { replace } = useRouter();
  const dispatch = useAppDispatch()
  const logOut = () => {
    dispatch(logOutAction())
    replace('/login');
  };
  return { logOut };
};
