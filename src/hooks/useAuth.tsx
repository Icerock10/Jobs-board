'use client';
import { useEffect } from 'react';
import { authService } from '@/lib/api-requests/auth-service';
import { useRouter } from 'next/navigation';
import { toastService } from '@/lib/toast/toastr-service';

export const Auth = ({ token }: { token: string }) => {
  const { replace, refresh } = useRouter();

  async function checkIfUserAuthed() {
    const response = await authService.getAuthUser(token);
    if (response?.status === 401) {
      toastService.error(response.data)
      replace('/login');
      refresh();
    }
  }

  useEffect(() => {
    void checkIfUserAuthed();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
