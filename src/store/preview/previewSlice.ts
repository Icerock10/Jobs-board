import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListing } from '@/_utils/types/types';
import { listing } from '@/_utils/mocks/listing';
import { getListingsStorageFields } from '@/_utils/helpers/getListingsHiddenFields';
import { getFilteredListings } from '@/_utils/helpers/getFilteredListings';

export type StateProps = {
  listing: IListing;
  arrayOfListings: IListing[]
  originalArray: IListing[]
  showHidden: boolean
  isReset: boolean
  publishData: { price: number | null, days: number | null, title: string, id: string }
};

const initialState: StateProps = {
  listing,
  arrayOfListings: [],
  originalArray: [],
  showHidden: false,
  isReset: false,
  publishData: {
    price: null,
    days: null,
    title: '',
    id: '',
  },
};

export const preview = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    setListings(state, { payload }) {
      state.arrayOfListings = getListingsStorageFields(payload);
      state.originalArray = getListingsStorageFields(payload);
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
        arrayOfListings: filteredArray,
        showHidden: payload.hidden,
        isReset: false,
      };
    },
    getDataForPublish(state, { payload }) {
      state.publishData = payload;
    },
    getCurrent(state, { payload }: PayloadAction<IListing>) {
      state.listing = payload;
    },
    resetFilters(state) {
      state.isReset = true;
    },
  },
});

export const {
  getCurrent,
  setListings,
  filterListing,
  setHidden,
  setLike,
  getDataForPublish,
  resetFilters,
} = preview.actions;
export default preview.reducer;
