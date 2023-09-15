import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListing } from '@/utils/types/types';
import { listing } from '@/utils/mocks/listing';

export type StateProps = {
  listing: IListing;
  isStateReset: boolean
  isUrlFieldValid: boolean,
  isPreviewShown: boolean
};

const initialState: StateProps = {
  listing,
  isStateReset: false,
  isUrlFieldValid: false,
  isPreviewShown: false,
};

export const preview = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    fillListings(
      state,
      { payload: { field, value } }: PayloadAction<{ field: string; value: string }>,
    ) {
      state.listing = {
        ...state.listing,
        [field]: value,
      };
    },
    getCurrentListing(state, { payload }: PayloadAction<IListing>) {
      state.listing = payload;
    },
    setValidUrl(state) {
      state.isUrlFieldValid = !state.isUrlFieldValid;
    },
    resetListingAndClosePreview(state, { payload }: PayloadAction<IListing | undefined>) {
      state.isStateReset = !state.isStateReset;
      state.isPreviewShown = false;
      state.listing = payload ? payload : listing;
    },
    togglePreview(state) {
      state.isPreviewShown = !state.isPreviewShown;
    },
  },
});

export const { fillListings, getCurrentListing, resetListingAndClosePreview, togglePreview } = preview.actions;
export default preview.reducer;
