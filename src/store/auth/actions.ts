import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Extra } from '@/utils/types/types';
import { AxiosResponse } from 'axios';
export const authUser = createAsyncThunk<{ data: { email: string } }, string, Extra>(
  'auth/user',
  async (payload, { extra }) => {
    const response = (await extra.authService.getAuthUser(payload)) as AxiosResponse;
    if (response.status >= 400) {
      throw new Error(response.data);
    }
    return response;
  },
);

export const logOut = createAction('auth/logout')