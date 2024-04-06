import { IPost } from '@/interfaces/post';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
  posts: IPost[];
  postsTimeLine: IPost[];
}

const initialState: IInitialState = {
  posts: [],
  postsTimeLine: [],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    saveListPost(state, action) {
      state.posts = action.payload;
    },
    savePostsTimeLine(state, action) {
      state.postsTimeLine = action.payload;
    },
    deletePostTimeLine(state, action) {
      const postId = action.payload;
      state.postsTimeLine = state.postsTimeLine.filter((post: IPost) => post._id !== postId);
    },
  },
});

export const { saveListPost, savePostsTimeLine, deletePostTimeLine } = postSlice.actions;
export default postSlice.reducer;
