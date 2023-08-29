'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { authService } from '@/lib/api-requests/auth-service';
export const signUpOrLoginAction = async (formData: FormData, isRegistration?: boolean) => {
  const { email, password } = Object.fromEntries(formData)
  const response = isRegistration ? await authService.register(email, password) : await authService.login(email, password)
  if(response?.status === 401) return response.data
  const { token } = response?.data;
  cookies().set('token', token);
  redirect('/tasks')
};
export const removeTokenFromCookies = async () => {
  return cookies().delete('token');
};
