import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListing } from '@/_utils/types/types';
import { listing } from '@/_utils/mocks/listing';
import { getListingsHiddenFields } from '@/_utils/helpers/getListingsHiddenFields';
import { getFilteredListings } from '@/_utils/helpers/getFilteredListings';

export type StateProps = {
  listing: IListing;
  isPreviewShown: boolean,
  arrayOfListings: IListing[]
  originalArray: IListing[]
  showHidden: boolean
  isReset: boolean
};

const initialState: StateProps = {
  listing,
  isPreviewShown: false,
  arrayOfListings: [],
  originalArray: [],
  showHidden: false,
  isReset: false,
};

export const preview = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    setListings(state, { payload }) {
      state.arrayOfListings = getListingsHiddenFields(payload);
      state.originalArray = getListingsHiddenFields(payload);
    },
    setHidden(state, { payload }) {
      state.arrayOfListings.map(listing => listing._id === payload ? listing.isHidden = !listing.isHidden : listing);
      state.originalArray = [...state.arrayOfListings];
    },
    setLike(state, { payload }) {
      state.arrayOfListings.map(listing => {
        if (listing._id === payload) {
          return listing.isLiked = !listing.isLiked;
        }
        return listing;
      });
      state.originalArray = [...state.arrayOfListings];
    },
    filterListing(state, { payload }) {
      const filteredArray = getFilteredListings(state.originalArray, payload);
      return {
        ...state,
        arrayOfListings: state.isReset ? state.originalArray : filteredArray,
        showHidden: payload.hidden,
        isReset: false,
      };
    },
    getCurrent(state, { payload }: PayloadAction<IListing>) {
      state.listing = payload;
    },
    togglePreview(state) {
      state.isPreviewShown = !state.isPreviewShown;
    },
    resetFilters(state) {
      state.isReset = true;
    },
  },
});

export const {
  getCurrent,
  togglePreview,
  setListings,
  filterListing,
  setHidden,
  setLike,
  resetFilters,
} = preview.actions;
export default preview.reducer;
