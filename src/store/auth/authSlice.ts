import { createSlice } from '@reduxjs/toolkit';
import { authUser } from '@/store/auth/actions';
import { IState } from '@/utils/types/types';
import { logOut } from '@/store/auth/actions';

const initialState: IState = {
  email: null,
  status: 'idle',
  error: '',
};

export const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(authUser.pending, state => {
      state.status = 'pending';
    });
    builder.addCase(authUser.rejected, (state, { error }) => {
      state.status = 'rejected';
      state.email = null;
      state.error = error.message;
    });
    builder.addCase(authUser.fulfilled, (state, { payload: { data } }) => {
      state.status = 'fulfilled';
      state.email = data.email;
    })
    builder.addCase(logOut, state => {
      state.email = null
    })
  },
});

export default auth.reducer;
