import { useCallback } from 'react';
import { fillListings } from '@/store/preview/previewSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { createListing, signUpOrLoginAction, updateEditableListing } from '@/lib/db/server-actions';
import { toastService } from '@/lib/toast/toastr-service';
import { useRouter } from 'next/navigation';
export const useClientActions = () => {
  const { isStateReset } = useAppSelector(state => state.preview);
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const collectListingsData = useCallback(async (field: string, value: string) => {
    if (!isStateReset) return;
    console.log(field);
    const newFieldValuePair = { field, value };
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
  const submitRegistrationOrLoginForm = async (formData: FormData, isRegistration?: boolean) => {
    const isErrorMessage = await signUpOrLoginAction(formData, isRegistration);
    if (isErrorMessage) return toastService.error(isErrorMessage);
    router.back()
  };
  return {
    collectListingsData,
    createOrUpdateListing,
    submitRegistrationOrLoginForm,
  };
};