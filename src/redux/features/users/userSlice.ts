import { UpdateUserPayload, UserResponseData } from '@/services/user/users.dto';
import { RootState } from '@/redux/store';
import { getUserDetailAPI, updateUserAPI } from '@/services/user/user.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import authSlice from '../auth/authSlice';

interface UsersState {
  data: UserResponseData | null;
  loading: boolean;
  error: boolean;
  isUpdated: boolean;
}

export interface HydrateAction {
  type: typeof HYDRATE;
  payload: RootState;
}

const initialState: UsersState = {
  data: null,
  loading: false,
  error: false,
  isUpdated: false,
};

export const getUserDetail = createAsyncThunk('users/getUserDetail', (id: number) => getUserDetailAPI(id));
export const updateUser = createAsyncThunk(
  'users/updateUser',
  ({ user, payload }: { user: UserResponseData; payload: UpdateUserPayload }) => updateUserAPI(user, payload),
);

export const userDetailSlice = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = false;
      state.isUpdated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: HydrateAction) => {
        return {
          ...state,
          ...action.payload.userDetail,
        };
      })
      .addCase(getUserDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getUserDetail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isUpdated = true;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.isUpdated = false;
        state.error = true;
      });
  },
});

export const { resetState } = userDetailSlice.actions;
