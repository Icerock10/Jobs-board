import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { toastService } from '@/lib/toast/toastr-service';

type IVisibilityState = {
  isModalShown: boolean;
  price: null | number;
  days: null | number;
  status: string;
  title: string;
  id: string;
  isProfileMenuShown: boolean;
  isSwitcherMenuActive: boolean;
  isBurgerMenuActive: boolean;
};

const initialState: IVisibilityState = {
  isModalShown: false,
  price: null,
  days: null,
  title: '',
  id: '',
  status: 'Idle',
  isProfileMenuShown: false,
  isSwitcherMenuActive: false,
  isBurgerMenuActive: false,
};

export const visibility = createSlice({
  name: 'visibility',
  initialState,
  reducers: {
    toggleModal(state) {
      state.isModalShown = !state.isModalShown;
    },
    toggleProfileMenu(state) {
      state.isProfileMenuShown = !state.isProfileMenuShown;
    },
    toggleBurgerMenu(state) {
      state.isBurgerMenuActive = !state.isBurgerMenuActive;
    },
    toggleSwitcherMenu(state) {
      state.isSwitcherMenuActive = !state.isSwitcherMenuActive;
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

export const {
  toggleModal,
  toggleBurgerMenu,
  getSelectedPrice,
  setSuccessfulPurchase,
  toggleProfileMenu,
  toggleSwitcherMenu,
} = visibility.actions;

export default visibility.reducer;
