import { createSlice } from '@reduxjs/toolkit';

type IVisibilityState = {
  isModalShown: boolean;
  isProfileMenuShown: boolean;
  isSwitcherMenuActive: boolean;
  isBurgerMenuActive: boolean;
  isPreviewShown: boolean
};

const initialState: IVisibilityState = {
  isModalShown: false,
  isProfileMenuShown: false,
  isSwitcherMenuActive: false,
  isBurgerMenuActive: false,
  isPreviewShown: false,
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
    togglePreview(state) {
      state.isPreviewShown = !state.isPreviewShown;
    },
  },
});

export const {
  toggleModal,
  toggleBurgerMenu,
  toggleProfileMenu,
  toggleSwitcherMenu,
  togglePreview,
} = visibility.actions;

export default visibility.reducer;
