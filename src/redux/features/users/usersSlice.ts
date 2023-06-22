import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { HydrateAction } from './userSlice';
import { getUsersAPI, searchUsersAPI } from '@/services/user/user.service';
import { UserResponseData } from '@/services/user/users.dto';
import { SearchAPIProps } from '@/dtos/api.dto';

interface UsersState {
  data: UserResponseData[];
  searchData: UserResponseData[];
  loading: boolean;
  error: boolean;
  pageCount: number;
}

const initialState: UsersState = {
  data: [],
  searchData: [],
  loading: false,
  error: false,
  pageCount: 0,
};

export const getUsers = createAsyncThunk('users/getUser', () => getUsersAPI());

export const searchUsers = createAsyncThunk('users/search', ({ query, options }: SearchAPIProps) =>
  searchUsersAPI(query, options),
);

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: HydrateAction) => {
        return {
          ...state,
          ...action.payload.users,
        };
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(searchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.searchData = action.payload;
        state.loading = false;
      })
      .addCase(searchUsers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
