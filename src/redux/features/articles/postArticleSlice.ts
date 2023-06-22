import { Article, PostArticlePayload } from '@/services/article/article.dto';
import { postArticleAPI } from '@/services/article/article.service';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponse } from '@/dtos/base';

interface ArticlesState {
  data: BaseResponse<Article> | null;
  loading: boolean;
  error: boolean;
}

const initialState: ArticlesState = {
  data: null,
  loading: false,
  error: false,
};

export const postArticle = createAsyncThunk('article/postArticle', (payload: PostArticlePayload) =>
  postArticleAPI(payload),
);

export const postArticleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    resetState: (state) => {
      (state.data = null), (state.error = false);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(postArticle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(postArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetState } = postArticleSlice.actions;
