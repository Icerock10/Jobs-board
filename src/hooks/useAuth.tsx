'use client';
import { useEffect } from 'react';
import { authUser } from '@/store/auth/actions';
import cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';

export const useAuth = () => {
  const token = cookies.get('token')!;
  const dispatch = useAppDispatch();
  const { email, error, status } = useAppSelector(state => state.auth);
  
  useEffect(() => {
    if(!token) return;
    dispatch(authUser(token));
  }, [dispatch, token]);

  return {
    email,
    error,
    status
  };
};
