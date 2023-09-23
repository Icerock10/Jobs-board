import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListing } from '@/_utils/types/types';
import { listing } from '@/_utils/mocks/listing';
import { getListingsHiddenFields } from '@/_utils/helpers/getListingsHiddenFields';

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
    filterListing(state, { payload: { title, location, type, experienceLevel, salary, hidden, favorites } }) {
      let filteredArray = [...state.originalArray];
      if (title) {
        filteredArray = filteredArray.filter(item =>
          item.title.toLowerCase().includes(title.toLowerCase()),
        );
      }
      if (favorites) {
        filteredArray = filteredArray.filter(item => item.isLiked);
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
