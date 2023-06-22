import { Article } from '@/services/article/article.dto';
import { getArticleDetailAPI, getArticlesAPI, getArticlesByWriterAPI } from '@/services/article/article.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { HydrateAction } from '../users/userSlice';
import { BaseResponseData } from '@/dtos/base';

interface ArticlesState {
  data: BaseResponseData<Article> | null;
  loading: boolean;
  error: boolean;
}

const initialState: ArticlesState = {
  data: null,
  loading: false,
  error: false,
};

export const getArticleDetail = createAsyncThunk('article/getArticleDetail', (slug: string) =>
  getArticleDetailAPI(slug),
);

export const articleDetailSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action: HydrateAction) => {
        return {
          ...state,
          ...action.payload.articleDetail,
        };
      })
      .addCase(getArticleDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticleDetail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getArticleDetail.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
