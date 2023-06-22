import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BaseResponseData } from '@/dtos/base';
import { Comment, CommentPayload } from '@/services/comment/comment.dto';
import { createCommentAPI, deleteCommentAPI } from '@/services/comment/comment.service';
import { stat } from 'fs';

interface CommentState {
  isPostSuccess: boolean;
  isDeleteSuccess: boolean;
  loading: boolean;
  error: boolean;
}

const initialState: CommentState = {
  isPostSuccess: false,
  isDeleteSuccess: false,
  loading: false,
  error: false,
};

export const postComment = createAsyncThunk('article/postComment', (payload: CommentPayload) =>
  createCommentAPI(payload),
);

export const deleteComment = createAsyncThunk('article/deleteComment', (commentId: number) =>
  deleteCommentAPI(commentId),
);

export const handleCommentSlice = createSlice({
  name: 'handleComment',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isPostSuccess = false;
      state.isDeleteSuccess = false;
      state.loading = false;
      state.error = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.isPostSuccess = action.payload;
        state.loading = false;
      })
      .addCase(postComment.rejected, (state) => {
        state.loading = false;
        state.error = true;
      })

      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isDeleteSuccess = action.payload;
        state.loading = false;
      })
      .addCase(deleteComment.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { resetState } = handleCommentSlice.actions;
