import { BaseResponseData } from '@/dtos/base';
import { Category } from '@/services/category/category.dto';
import { getCategoriesAPI } from '@/services/category/category.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { HydrateAction } from '../users/userSlice';

interface CategoriesState {
  data: BaseResponseData<Category>[];
  loading: boolean;
  error: boolean;
}

const initialState: CategoriesState = {
  data: [],
  loading: false,
  error: false,
};

export const getCategories = createAsyncThunk('Categoriess/getCategories', () => getCategoriesAPI());

export const categoriesSlice = createSlice({
  name: 'Categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: HydrateAction) => {
        return {
          ...state,
          ...action.payload.categories,
        };
      })
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
