'use server';
import { redirect } from 'next/navigation';
import { authService } from '@/_lib/api-requests/auth-service';
import { revalidatePath } from 'next/cache';
import { cookiesService } from '@/_lib/cookies/cookies-service';
import { FieldValues } from 'react-hook-form';

export const signUpOrLoginAction = async (formData: FieldValues, isRegistration?: boolean) => {
  const { email, password } = formData;
  const response = isRegistration
    ? await authService.register(email, password)
    : await authService.login(email, password);
  if(response?.status === 200) {
    const { token } = response?.data;
    if(token) {
      cookiesService.setToken(token);
      return redirect('/listings')
    }
  }
  return response?.data;
};

export const getMyListings = async () => {
  const token = cookiesService.getToken();
  const response = await authService.getListings(token);
  if (response?.status === 200) {
    return response.data;
  }
  revalidatePath('/');
  redirect('/login');
};

export const getListingById = async (_id: string) => {
  const token = cookiesService.getToken();
  const response = await authService.getListings(token, _id);
  if (response?.status === 200) {
    return response.data;
  }
  revalidatePath('/');
  redirect('/login');
};

export const getPublished = async () => {
  const response = await authService.getPublishedListings();
  if (response?.status === 200) {
    return response.data.listings;
  }
};

export const removeJob = async (id: string) => {
  const token = cookiesService.getToken();
  const response = await authService.deleteListing(id, token);
  revalidatePath('/jobs');
  return response;
};
export const publishOrExtendJob = async (_id: string, daysLeft: number) => {
  const token = cookiesService.getToken();
  const response = await authService.updateListing(_id, daysLeft, token);
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

export const updateEditableListing = async (formData: FieldValues, id: string) => {
  const token = cookiesService.getToken();
  const response = await authService.updateOneListing(id, formData, token);
  revalidatePath('/');
  return response;
};

export const createListing = async (formData: FieldValues) => {
  const token = cookiesService.getToken();
  const response = await authService.createListingFromAxios(formData, token);
  revalidatePath('/jobs');
  return response;
};

export const getTokenAndRedirect = () => {
  const token = cookiesService.getToken();
  if(token) {
    redirect('/jobs')
  }
}