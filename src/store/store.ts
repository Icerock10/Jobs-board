import { configureStore } from '@reduxjs/toolkit';
import auth from '@/store/auth/authSlice';
import { authService } from '@/lib/api-requests/auth-service';
import logger from 'redux-logger';
export const store = configureStore({
  reducer: {
    auth,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          authService
        },
      },
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
