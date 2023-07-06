import { Article, UpdateArticlePayload } from '@/services/article/article.dto';
import {
  deleteArticleAPI,
  getArticleByIdAPI,
  getArticleDetailAPI,
  updateArticleAPI,
} from '@/services/article/article.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { HydrateAction } from '../users/userSlice';
import { BaseResponseData } from '@/dtos/base';

interface ArticlesState {
  data: BaseResponseData<Article> | null;
  isDeleteSuccess: boolean;
  isUpdateSuccess: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: ArticlesState = {
  data: null,
  isDeleteSuccess: false,
  isUpdateSuccess: false,
  loading: false,
  error: false,
};

export const getArticleDetail = createAsyncThunk('article/getArticleDetail', (slug: string) =>
  getArticleDetailAPI(slug),
);

export const getArticleById = createAsyncThunk('article/getArticleById', (id: number) => getArticleByIdAPI(id));

export const deleteArticle = createAsyncThunk('article/deleteArticle', (articleId: number) =>
  deleteArticleAPI(articleId),
);

export const updateArticle = createAsyncThunk('article/updateArticle', (payload: UpdateArticlePayload) =>
  updateArticleAPI(payload),
);

export const articleDetailSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isDeleteSuccess = false;
      state.isUpdateSuccess = false;
      state.error = false;
    },
  },
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
      })

      .addCase(getArticleById.pending, (state) => {
        state.data = null;
        state.loading = true;
      })
      .addCase(getArticleById.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getArticleById.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteArticle.fulfilled, (state) => {
        state.loading = false;
        state.isDeleteSuccess = true;
      })
      .addCase(deleteArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateArticle.fulfilled, (state) => {
        state.loading = false;
        state.isUpdateSuccess = true;
      })
      .addCase(updateArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetState } = articleDetailSlice.actions;
