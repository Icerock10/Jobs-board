import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toastService } from '@/lib/toast/toastr-service';

const initialState: { isModalShown: boolean; price: null | number; days: null | number, status: string } = {
  isModalShown: false,
  price: null,
  days: null,
  status: 'Idle'
};

export const visibility = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    toggleModal(state) {
      state.isModalShown = !state.isModalShown;
    },
    getSelectedPrice(state, { payload }: PayloadAction<{ price: number; days: number }>) {
      state.isModalShown = true;
      state.price = payload.price;
      state.days = payload.days;
    },
    setSuccessfulPurchase(
      state,
      {
        payload: { errorMessage, successMessage },
      }: PayloadAction<{
        successMessage: string;
        errorMessage: string;
      }>,
    ) {
      state.isModalShown = false;
      errorMessage ? toastService.error(errorMessage) : toastService.success(successMessage);
    },
  },
});

export const { toggleModal, getSelectedPrice, setSuccessfulPurchase } = visibility.actions;

export default visibility.reducer;
