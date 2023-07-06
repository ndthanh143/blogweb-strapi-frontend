import { Article } from '@/services/article/article.dto';
import { getArticlesByCategoryAPI, getArticlesByWriterAPI } from '@/services/article/article.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HydrateAction } from '../users/userSlice';
import { HYDRATE } from 'next-redux-wrapper';
import { BaseResponseData } from '@/dtos/base';
import { FilterArticlesProps } from '@/dtos/api.dto';

interface ArticlesState {
  data: BaseResponseData<Article>[];
  loading: boolean;
  error: boolean;
  pageCount: number;
}

const initialState: ArticlesState = {
  data: [],
  loading: false,
  error: false,
  pageCount: 0,
};

export const getArticlesByWriter = createAsyncThunk(
  'articles/getArticlesByWriter',
  ({ id, options }: FilterArticlesProps) => getArticlesByWriterAPI(id, options),
);

export const getArticlesByCategory = createAsyncThunk(
  'articles/getArticlesByCategory',
  ({ id, options, sort }: FilterArticlesProps) => getArticlesByCategoryAPI(id, options, sort),
);

export const articlesFilterSlice = createSlice({
  name: 'articlesFilter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase<typeof HYDRATE, HydrateAction>(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.articlesFilter,
        };
      })
      .addCase(getArticlesByWriter.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticlesByWriter.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.pageCount = action.payload.meta.pagination.pageCount;
      })
      .addCase(getArticlesByWriter.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(getArticlesByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticlesByCategory.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.loading = false;
        state.pageCount = action.payload.meta.pagination.pageCount;
      })
      .addCase(getArticlesByCategory.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
