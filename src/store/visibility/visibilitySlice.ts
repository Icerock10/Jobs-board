import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toastService } from '@/lib/toast/toastr-service';

const initialState: {
  isModalShown: boolean;
  price: null | number;
  days: null | number;
  status: string;
  title: string;
  id: string;
} = {
  isModalShown: false,
  price: null,
  days: null,
  title: '',
  id: '',
  status: 'Idle',
};

export const visibility = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    toggleModal(state) {
      state.isModalShown = !state.isModalShown;
    },
    getSelectedPrice(
      state,
      {
        payload: { price, days, title, id },
      }: PayloadAction<{
        price: number;
        days: number;
        title: string;
        id: string;
      }>,
    ) {
      state.isModalShown = true;
      state.price = price;
      state.days = days;
      state.title = title;
      state.id = id;
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
