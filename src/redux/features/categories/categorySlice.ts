import { Category } from '@/services/category/category.dto';
import { getCategoryDetailAPI } from '@/services/category/category.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { HydrateAction } from '../users/userSlice';

interface CategoriesState {
  data: Category | null;
  loading: boolean;
  error: boolean;
}

const initialState: CategoriesState = {
  data: null,
  loading: false,
  error: false,
};

export const getCategoryDetail = createAsyncThunk('Categoriess/getCategory', (slug: string) =>
  getCategoryDetailAPI(slug),
);

export const categorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: HydrateAction) => {
        return {
          ...state,
          ...action.payload.categoryDetail,
        };
      })
      .addCase(getCategoryDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategoryDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getCategoryDetail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
