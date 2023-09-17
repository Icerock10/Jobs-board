import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListing } from '@/utils/types/types';
import { listing } from '@/utils/mocks/listing';

export type StateProps = {
  listing: IListing;
  isStateReset: boolean
  isPreviewShown: boolean,
};

const initialState: StateProps = {
  listing,
  isStateReset: false,
  isPreviewShown: false,
};

export const preview = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    getCurrent(state, { payload }: PayloadAction<IListing>) {
      state.listing = payload;
    },
    togglePreview(state) {
      state.isPreviewShown = !state.isPreviewShown;
    },
  },
});

export const {
  getCurrent,
  togglePreview,
} = preview.actions;
export default preview.reducer;
