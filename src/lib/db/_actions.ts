'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { authService } from '@/lib/api-requests/auth-service';
import { ResponseCookies } from 'next/dist/compiled/@edge-runtime/cookies';
export const signUpOrLoginAction = async (formData: FormData, isRegistration?: boolean) => {
  const { email, password } = Object.fromEntries(formData);
  const response = isRegistration
    ? await authService.register(email, password)
    : await authService.login(email, password);
  if (response?.status === 401) return response.data;
  const { token } = response?.data;
  cookies().set('token', token);
  redirect('/jobs')
};
export const removeTokenFromCookies = async (): Promise<ResponseCookies> => {
  return cookies().delete('token');
};
export const createJob = async (data: { location: string; level: string }) => {
  try {
    const response = await fetch('http://localhost:3000/api/job', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (e) {
    console.log(e, 'error inside createJob');
  }
};
