import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type StateProps = {
  listings: object;
};

const initialState: StateProps = {
  listings: {},
};

export const preview = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    fillListings(
      state,
      { payload: { field, value } }: PayloadAction<{ field: string; value: string }>,
    ) {
      state.listings = {
        ...state.listings,
        [field]: value,
      };
    },
  },
});

export const { fillListings } = preview.actions;
export default preview.reducer;
