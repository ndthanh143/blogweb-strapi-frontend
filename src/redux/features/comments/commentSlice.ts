import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  AnswerCommentPayload,
  CommentAttribute,
  CommentPayload,
  UpdateCommentPayload,
} from '@/services/comment/comment.dto';
import {
  answerCommentAPI,
  createCommentAPI,
  deleteCommentAPI,
  updateCommentAPI,
} from '@/services/comment/comment.service';

interface CommentState {
  isPostSuccess: boolean;
  isDeleteSuccess: boolean;
  isUpdateSuccess: boolean;
  isAnswerSuccess: boolean;
  loading: boolean;
  updateLoading: boolean;
  answerLoading: boolean;
  error: boolean;
}

const initialState: CommentState = {
  isPostSuccess: false,
  isDeleteSuccess: false,
  isUpdateSuccess: false,
  isAnswerSuccess: false,
  loading: false,
  updateLoading: false,
  answerLoading: false,
  error: false,
};

export const postComment = createAsyncThunk('article/postComment', (payload: CommentPayload) =>
  createCommentAPI(payload),
);

export const deleteComment = createAsyncThunk('article/deleteComment', (commentId: number) =>
  deleteCommentAPI(commentId),
);

export const updateComment = createAsyncThunk('article/updateComment', (payload: UpdateCommentPayload) =>
  updateCommentAPI(payload),
);

export const answerComment = createAsyncThunk('article/answerComment', (payload: AnswerCommentPayload) =>
  answerCommentAPI(payload),
);

export const handleCommentSlice = createSlice({
  name: 'handleComment',
  initialState,
  reducers: {
    resetState: (state) => {
      state.isPostSuccess = false;
      state.isDeleteSuccess = false;
      state.isUpdateSuccess = false;
      state.isAnswerSuccess = false;
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
      })

      .addCase(updateComment.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isUpdateSuccess = action.payload;
        state.updateLoading = false;
      })
      .addCase(updateComment.rejected, (state) => {
        state.updateLoading = false;
        state.error = true;
      })

      .addCase(answerComment.pending, (state) => {
        state.answerLoading = true;
      })
      .addCase(answerComment.fulfilled, (state, action) => {
        state.isAnswerSuccess = action.payload;
        state.answerLoading = false;
      })
      .addCase(answerComment.rejected, (state) => {
        state.answerLoading = false;
        state.error = true;
      });
  },
});

export const { resetState } = handleCommentSlice.actions;
