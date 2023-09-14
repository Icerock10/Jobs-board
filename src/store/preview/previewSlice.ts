import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListing } from '@/utils/types/types';

export type StateProps = {
  listing: IListing;
  isStateReset: boolean
  isUrlFieldValid: boolean
};

const initialState: StateProps = {
  listing: {
    title: '',
    companyName: '',
    location: '',
    url: '',
    type: '',
    experienceLevel: '',
    salary: 0,
    shortDescription: '',
    fullDescription: '',
    isPublished: false,
    draft: '',
    _id: '',
  },
  isStateReset: false,
  isUrlFieldValid: false
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
      state.isUrlFieldValid = !state.isUrlFieldValid
    },
    resetListing(state) {
      state.isStateReset = !state.isStateReset;
      state.listing = {
        title: '',
        companyName: '',
        location: '',
        url: '',
        type: '',
        experienceLevel: '',
        salary: 0,
        shortDescription: '',
        fullDescription: '',
        isPublished: false,
        draft: '',
        _id: '',
      }
    },
  },
});

export const { fillListings, getCurrentListing, resetListing } = preview.actions;
export default preview.reducer;
