'use server';
import { redirect } from 'next/navigation';
import { authService } from '@/lib/api-requests/auth-service';
import { revalidatePath } from 'next/cache';
import { cookiesService } from '@/lib/cookies/cookies-service';

export const signUpOrLoginAction = async (formData: FormData, isRegistration?: boolean) => {
  const { email, password } = Object.fromEntries(formData);
  const response = isRegistration
    ? await authService.register(email, password)
    : await authService.login(email, password);
  if (response?.status === 401) return response.data;
  const { token } = response?.data;
  cookiesService.setToken(token);
  redirect('/jobs/listings');
};

export const getMyListings = async (token?: string) => {
  const response = await authService.getListings(token);
  if (response?.status === 200) {
    return response.data.listings;
  }
  redirect('/login');
};

export const getPublished = async () => {
  const response = await authService.getPublishedListings();
  if (response?.status === 200) {
    return response.data.listings;
  }
};

export const removeJob = async (id: string) => {
  const token = cookiesService.getToken()!;
  const response = await authService.deleteListing(id, token);
  revalidatePath('/jobs');
  return response;
};
export const publishOrExtendJob = async (_id: string, daysLeft: number) => {
  const token = cookiesService.getToken();
  const response = await authService.updateListing(_id, daysLeft, token!);
  if (response?.status === 200) {
    revalidatePath('/jobs');
    return { successMessage: response?.data?.successMessage };
  }
  return { errorMessage: response?.data };
};
export const logOut = async () => {
  cookiesService.removeToken();
  redirect('/login');
  revalidatePath('/');
};

export const checkUrlValidity = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      return true;
    }
  } catch (e) {
    return false;
  }
};

export const createListing = async (formData: FormData) => {
  const token = cookiesService.getToken();
  const convertFormDataToObject = Object.fromEntries(formData);
  const response = await authService.createListingFromAxios(convertFormDataToObject, token);
  revalidatePath('/jobs');
  return response;
};