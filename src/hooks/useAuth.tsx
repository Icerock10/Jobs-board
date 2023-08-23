'use client';
import { useEffect } from 'react';
import { authService } from '@/lib/api-requests/auth-service';
import { useRouter } from 'next/navigation';

export const Auth = ({ token }: {token: string}) => {
  const { replace, refresh } = useRouter()
  async function checkIfUserAuthed() {
    const response = await authService.getAuthUser(token);
    if(!response) {
      replace('/login')
      refresh()
    }
  }

  useEffect(() => {
    void checkIfUserAuthed();
  }, []);

  return <></>;
};
