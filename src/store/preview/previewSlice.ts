import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IListing } from '@/_utils/types/types';
import { listing } from '@/_utils/mocks/listing';

export type StateProps = {
  listing: IListing;
  isStateReset: boolean
  isPreviewShown: boolean,
  arrayOfListings: IListing[]
  originalArray: IListing[]
  showHidden: boolean
};

const initialState: StateProps = {
  listing,
  isStateReset: false,
  isPreviewShown: false,
  arrayOfListings: [],
  originalArray: [],
  showHidden: false,
};

export const preview = createSlice({
  name: 'preview',
  initialState,
  reducers: {
    setListings(state, { payload }) {
      state.arrayOfListings = payload;
      state.originalArray = payload;
    },
    setHidden(state, { payload }) {
      state.arrayOfListings.map(listing => listing._id === payload ? listing.isHidden = !listing.isHidden : listing);
      state.originalArray = [...state.arrayOfListings]
    },
    filterListing(state, { payload: { title, location, type, experienceLevel, salary, hidden } }) {
      let filteredArray = [...state.originalArray];
      if (title) {
        filteredArray = filteredArray.filter(item =>
          item.title.toLowerCase().includes(title.toLowerCase()),
        );
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
        showHidden: hidden
      };
    },
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
  setListings,
  filterListing,
  setHidden,
} = preview.actions;
export default preview.reducer;
