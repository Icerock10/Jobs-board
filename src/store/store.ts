import { configureStore } from '@reduxjs/toolkit';
import visibility from '@/store/visibility/visibilitySlice';
import preview from '@/store/preview/previewSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    visibility,
    preview
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
