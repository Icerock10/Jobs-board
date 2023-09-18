import {
  createListingAndRevalidate,
  deleteOneByIdAction, publishOrExtendListing,
  signUpOrLoginAction,
  updateOneByIdAndRevalidate,
} from '@/_lib/server-actions/server-actions';
import { toastService } from '@/_lib/services/toast/toastr-service';
import { useRouter } from 'next/navigation';
import { FieldValues } from 'react-hook-form';
import { useAppDispatch } from '@/_hooks/reduxHooks';
import { getCurrent } from '@/store/preview/previewSlice';
import { IListing } from '@/_utils/types/types';
import { useCallback } from 'react';
import { toggleModal } from '@/store/visibility/visibilitySlice';
export const useClientActions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  
  const getCurrentListing = useCallback((listing: IListing) => {
    dispatch(getCurrent(listing))
  }, [dispatch])
  
  const createOrUpdateListing = async (formData: FieldValues, id?: string) => {
    const response = id ? await updateOneByIdAndRevalidate(formData, id) : await createListingAndRevalidate(formData);
    if (response?.status === 200) {
      toastService.success(response.data.message);
      router.back();
    }
    router.replace('/login')
    toastService.error(response?.data.error);
  };
  const submitRegistrationOrLoginForm = async (formData: FieldValues, isRegistration?: boolean) => {
    const isErrorResponse = await signUpOrLoginAction(formData, isRegistration);
    if (isErrorResponse) {
      toastService.error(isErrorResponse);
    }
  };
  
  
  const removeListingAndShowToast = async (id: string) => {
    const response = await deleteOneByIdAction(id);
    if (response?.status === 200) {
      toastService.success(response.data.message);
    }
    toastService.error(response?.data.error);
  };
  const publishOrExtendAndShowNotification = async (id: string, days: number) => {
    const response = await publishOrExtendListing(id, days);
    dispatch(toggleModal())
    if(response?.status === 200) {
      toastService.success(response.data.message)
    }
    toastService.error(response?.data.error)
  };
  
  return {
    createOrUpdateListing,
    submitRegistrationOrLoginForm,
    removeListingAndShowToast,
    getCurrentListing,
    publishOrExtendAndShowNotification
  };
};