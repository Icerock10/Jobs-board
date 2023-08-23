import { redirect } from 'next/navigation';
import { authService } from '@/lib/api-requests/auth-service';
import { cookies } from 'next/headers';
export const signUpAction = async (data: FormData) => {
  'use server'
  const email = data.get('email');
  const password = data.get('password');
  const token = await authService.register(email, password)
  cookies().set('token', token)
  redirect('/tasks')
};