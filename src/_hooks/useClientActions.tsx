import {
  createListingAndRevalidate,
  deleteOneByIdAction, publishOrExtendListing,
  signUpOrLoginAction,
  updateOneByIdAndRevalidate,
} from '@/_lib/server-actions/server-actions';
import { toastService } from '@/_lib/services/toast/toastr-service';
import { useRouter } from 'next/navigation';
import { FieldValues, UseFormReset } from 'react-hook-form';
import { useAppDispatch } from '@/_hooks/reduxHooks';
import {
  getCurrent,
  setHidden,
  setLike,
  resetFilters as resetAction,
} from '@/store/preview/previewSlice';
import { IListing } from '@/_utils/types/types';
import { useCallback } from 'react';
import { toggleModal } from '@/store/visibility/visibilitySlice';
import { manageLocalStorageItems } from '@/_utils/helpers/manageLocalStorageItems';
import { resetSort, sortBy } from '@/store/tasks/taskSlice';
import { getCustomOrders } from '@/_utils/helpers/getCustomOrder';
export const useClientActions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const getCurrentListing = useCallback((listing: IListing) => {
    dispatch(getCurrent(listing));
  }, [dispatch]);
  
  const createOrUpdateListing = async (formData: FieldValues, id?: string) => {
    const response = id ? await updateOneByIdAndRevalidate(formData, id) : await createListingAndRevalidate(formData);
    if (response?.status === 200) {
      toastService.success(response.data.message);
      router.back();
    }
    router.replace('/login');
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
    dispatch(toggleModal());
    if (response?.status === 200) {
      toastService.success(response.data.message);
    }
    toastService.error(response?.data.error);
  };
  
  const setHiddenAndWriteToLocalStorage = useCallback((_id: string) => {
    dispatch(setHidden(_id));
    manageLocalStorageItems('hidden', _id);
  }, [dispatch]);
  
  const setLikeAndWriteToLocalStorage = useCallback((_id: string) => {
    dispatch(setLike(_id));
    manageLocalStorageItems('liked', _id);
  }, [dispatch]);
  
  const resetFilters = useCallback((reset: UseFormReset<IListing>) => {
    reset();
    dispatch(resetAction());
  }, [dispatch]);
  
  const clearSort = () => dispatch(resetSort());
  const sortByCriteria = (sortingOption: string, criteria: string) => {
    dispatch(sortBy({
      customOrder: getCustomOrders(criteria) || [],
      sortingOption,
      sortCriteria: criteria.toLowerCase(),
    }));
  };
  
  return {
    createOrUpdateListing,
    submitRegistrationOrLoginForm,
    removeListingAndShowToast,
    getCurrentListing,
    publishOrExtendAndShowNotification,
    setHiddenAndWriteToLocalStorage,
    setLikeAndWriteToLocalStorage,
    resetFilters,
    clearSort,
    sortByCriteria
  };
};