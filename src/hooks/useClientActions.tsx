import { useCallback } from 'react';
import { fillListings, getValidUrl } from '@/store/preview/previewSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { createListing, removeJob, signUpOrLoginAction, updateEditableListing } from '@/lib/db/server-actions';
import { toastService } from '@/lib/toast/toastr-service';
import { useRouter } from 'next/navigation';
import { FieldValue, FieldValues } from 'react-hook-form';
export const useClientActions = () => {
  const { isStateReset } = useAppSelector(state => state.preview);
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const collectListingsData = useCallback(async (field: string, value: string) => {
    if (!isStateReset) return;
    const newFieldValuePair = { field, value };
    if (field === 'url') dispatch(getValidUrl(value));
    dispatch(fillListings(newFieldValuePair));
  }, [dispatch, isStateReset]);
  
  const createOrUpdateListing = async (formData: FormData, id?: string) => {
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
    collectListingsData,
    createOrUpdateListing,
    submitRegistrationOrLoginForm,
    removeJobAction,
  };
};