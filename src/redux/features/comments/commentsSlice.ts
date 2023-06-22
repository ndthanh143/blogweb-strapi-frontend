import { BaseResponseData } from '@/dtos/base';
import { Comment } from '@/services/comment/comment.dto';
import { getCommentsArticleAPI } from '@/services/comment/comment.service';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface CommentsState {
  data: BaseResponseData<Comment>[];
  loading: boolean;
  error: boolean;
}

const initialState: CommentsState = {
  data: [],
  loading: false,
  error: false,
};

export const getCommentsArticle = createAsyncThunk('Categoriess/getCategory', (articleId: number) =>
  getCommentsArticleAPI(articleId),
);

export const commentsSlice = createSlice({
  name: 'Comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCommentsArticle.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentsArticle.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getCommentsArticle.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});
