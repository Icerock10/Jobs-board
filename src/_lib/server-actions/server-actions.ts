'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { cookiesService } from '@/_lib/services/cookies/cookies-service';
import { FieldValues } from 'react-hook-form';
import { userService } from '@/_lib/services/api/user-service';
import { listingsService } from '@/_lib/services/api/listings-service';

export const signUpOrLoginAction = async (formData: FieldValues, isRegistration?: boolean) => {
  const { email, password } = formData;
  const response = isRegistration
    ? await userService.register(email, password)
    : await userService.login(email, password);
  if (response?.status === 200) {
    const { token } = response?.data;
    if (token) {
      cookiesService.setToken(token);
      return redirect('/listings');
    }
  }
  return response?.data;
};

export const getSecuredListingsOrRedirect = async () => {
  const token = cookiesService.getToken()!;
  const response = await listingsService.getAllSecured(token);
  if (response?.status === 200) return response.data;
  revalidatePath('/');
  redirect('/login');
};
export const deleteOneByIdAction = async (id: string) => {
  const token = cookiesService.getToken();
  const response = await listingsService.deleteOneById(id, token);
  revalidatePath('/');
  return response;
};
export const logOut = async () => {
  cookiesService.removeToken();
  revalidatePath('/');
  redirect('/login');
};

export const createListingAndRevalidate = async (formData: FieldValues) => {
  const token = cookiesService.getToken();
  const response = await listingsService.create(formData, token);
  revalidatePath('/');
  return response;
};

export const updateOneByIdAndRevalidate = async (formData: FieldValues, id: string) => {
  const token = cookiesService.getToken();
  const response = await listingsService.updateOneById(id, formData, token);
  revalidatePath('/');
  return response;
};

export const getTokenAndRedirect = () => {
  const token = cookiesService.getToken();
  if (token) {
    redirect('/jobs');
  }
};
export const publishOrExtendListing = async (_id: string, daysLeft: number) => {
  const token = cookiesService.getToken();
  const response = await listingsService.publish(_id, daysLeft, token);
  revalidatePath('/');
  return response;
};

export const getListingById = async (id: string) => {
  const token = cookiesService.getToken();
  const response = await listingsService.getOneById(token, id);
  if (response?.status === 200) {
    return response.data;
  }
  revalidatePath('/');
  redirect('/login');
};
