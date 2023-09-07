'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { authService } from '@/lib/api-requests/auth-service';
import { revalidatePath } from 'next/cache';

export const signUpOrLoginAction = async (formData: FormData, isRegistration?: boolean) => {
  const { email, password } = Object.fromEntries(formData);
  const response = isRegistration
    ? await authService.register(email, password)
    : await authService.login(email, password);
  if (response?.status === 401) return response.data;
  const { token } = response?.data;
  cookies().set('token', token);
  redirect('/jobs/listings');
};

export const getMyListings = async (token?: string) => {
  const response = await authService.getListings(token);
  if (response.status === 200) {
    return response.data.listings;
  }
  redirect('/login')
};

export const getPublishedListings = async () => {
  const response = await authService.getPublishedListings()
  return response.data.listings;
};

export const removeJob = async (id: string) => {
  const token = cookies().get('token')?.value;
  const response = await authService.deleteListing(id, token!)
  revalidatePath('/jobs/listings')
}