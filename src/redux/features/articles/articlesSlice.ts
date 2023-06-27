import { Article } from '@/services/article/article.dto';
import { getArticlesAPI, searchArticlesAPI } from '@/services/article/article.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { HydrateAction } from '../users/userSlice';
import { BaseResponseData } from '@/dtos/base';
import { PaginationOption, SearchAPIProps } from '@/dtos/api.dto';

interface ArticlesState {
  data: BaseResponseData<Article>[];
  searchData: BaseResponseData<Article>[];
  loading: boolean;
  error: boolean;
  isMaximum: boolean;
  nextPage: number;
  pageCount: number;
}

const initialState: ArticlesState = {
  data: [],
  searchData: [],
  loading: false,
  error: false,
  isMaximum: false,
  nextPage: 2,
  pageCount: 0,
};

export const getArticles = createAsyncThunk('articles/getArticles', ({ page, pageSize }: PaginationOption) =>
  getArticlesAPI({ page, pageSize }),
);

export const getMoreArticles = createAsyncThunk('articles/getMoreArticles', ({ page, pageSize }: PaginationOption) =>
  getArticlesAPI({ page, pageSize }),
);

export const searchArticles = createAsyncThunk('articles/searchArticles', ({ query, options, sort }: SearchAPIProps) =>
  searchArticlesAPI(query, options, sort),
);

export const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase<typeof HYDRATE, HydrateAction>(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.articles,
        };
      })
      .addCase(getArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.data = action.payload.data;
        if (state.data.length === action.payload.meta.pagination.total) {
          state.isMaximum = true;
        }
        state.loading = false;
      })
      .addCase(getArticles.rejected, (state) => {
        state.loading = false;
        state.error = false;
      })

      .addCase(getMoreArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMoreArticles.fulfilled, (state, action) => {
        state.data = [...state.data, ...action.payload.data];
        if (state.data.length === action.payload.meta.pagination.total) {
          state.isMaximum = true;
        }
        state.loading = false;
        state.nextPage++;
      })
      .addCase(getMoreArticles.rejected, (state) => {
        state.loading = false;
        state.error = false;
      })

      .addCase(searchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchArticles.fulfilled, (state, action) => {
        state.searchData = action.payload.data;
        state.pageCount = action.payload.meta.pagination.pageCount;
        state.loading = false;
      })
      .addCase(searchArticles.rejected, (state) => {
        state.loading = false;
        state.error = false;
      });
  },
});
