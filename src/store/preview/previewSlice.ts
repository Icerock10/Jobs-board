import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListing } from '@/_utils/types/types';
import { listing } from '@/_utils/mocks/listing';
import { getListingsStorageFields } from '@/_utils/helpers/getListingsHiddenFields';

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
    filterListing(state, { payload: { title, location, type, experienceLevel, salary, hidden, favorites } }) {
      let filteredArray = [...state.originalArray];
      if (title) {
        filteredArray = filteredArray.filter(item =>
          item.title.toLowerCase().includes(title.toLowerCase()),
        );
      }
      if (favorites) {
        filteredArray = filteredArray.filter(item => item.isLiked)
      }
      if (salary) {
        filteredArray = filteredArray.filter(item =>
          item.salary > Number(salary),
        );
      }
      if (type) {
        filteredArray = filteredArray.filter(item =>
          type === 'Any' ? item : item.type.includes(type),
        );
      }
      if (experienceLevel) {
        filteredArray = filteredArray.filter(item =>
          experienceLevel === 'Any' ? item : item.experienceLevel.includes(experienceLevel),
        );
      }
      if (location) {
        filteredArray = filteredArray.filter(item =>
          item.location.toLowerCase().includes(location.toLowerCase()),
        );
      }
      return {
        ...state,
        arrayOfListings: filteredArray,
        showHidden: hidden,
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
