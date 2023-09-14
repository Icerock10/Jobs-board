import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListing } from '@/utils/types/types';

export type StateProps = {
  listing: IListing;
  isStateReset: boolean
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
    getCurrentListing(state, { payload }: PayloadAction<IListing>) {
      state.listing = payload;
    },
  },
});

export const { fillListings, getCurrentListing, resetListing } = preview.actions;
export default preview.reducer;
