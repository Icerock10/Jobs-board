import { createListing, removeJob, signUpOrLoginAction, updateEditableListing } from '@/_lib/db/server-actions';
import { toastService } from '@/_lib/toast/toastr-service';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { useAppDispatch } from '@/_hooks/reduxHooks';
import { getCurrent } from '@/store/preview/previewSlice';
import { IListing } from '@/_utils/types/types';
import { useCallback } from 'react';
export const useClientActions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  
  const getCurrentListing = useCallback((listing: IListing) => {
    dispatch(getCurrent(listing))
  }, [dispatch])
  
  const createOrUpdateListing = async (formData: FieldValues, id?: string) => {
    const response = id ? await updateEditableListing(formData, id) : await createListing(formData);
    if (response?.status === 200) {
      toastService.success(response.data.successMessage);
      router.back();
    }
    toastService.error(response?.data);
  };
  const submitRegistrationOrLoginForm = async (formData: FieldValues, isRegistration?: boolean) => {
    const isErrorResponse = await signUpOrLoginAction(formData, isRegistration);
    if (isErrorResponse) {
      toastService.error(isErrorResponse);
    }
  };
  const removeJobAction = async (id: string) => {
    const response = await removeJob(id);
    if (response?.status === 200) {
      toastService.success(response?.data?.successMessage);
    }
    toastService.error(response?.data);
  };
  return {
    createOrUpdateListing,
    submitRegistrationOrLoginForm,
    removeJobAction,
    getCurrentListing
  };
};