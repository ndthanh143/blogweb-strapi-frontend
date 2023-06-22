import { Article } from '@/services/article/article.dto';
import { getArticlesByWriterAPI } from '@/services/article/article.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HydrateAction } from '../users/userSlice';
import { HYDRATE } from 'next-redux-wrapper';
import { BaseResponseData } from '@/dtos/base';

interface ArticlesState {
  data: BaseResponseData<Article>[];
  loading: boolean;
  error: boolean;
}

const initialState: ArticlesState = {
  data: [],
  loading: false,
  error: false,
};

export const getArticlesByWriter = createAsyncThunk('articles/getArticlesByWriter', (id: number) =>
  getArticlesByWriterAPI(id, {}),
);

export const articlesWriterSlice = createSlice({
  name: 'articlesFilter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase<typeof HYDRATE, HydrateAction>(HYDRATE, (state, action) => {
        return {
          ...state,
          ...action.payload.articlesWriter,
        };
      })
      .addCase(getArticlesByWriter.pending, (state) => {
        state.loading = true;
      })
      .addCase(getArticlesByWriter.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getArticlesByWriter.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
