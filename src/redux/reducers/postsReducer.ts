import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import IPost from '~/services/models/IPost';

// Define a type for the slice state
interface PostsState {
  entries: IPost[];
  page: number;
}

// Define the initial state using that type
const initialState: PostsState = {
  entries: [],
  page: 1,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    appendPost: (state, action: PayloadAction<IPost[]>) => {
      state.entries.push(...action.payload);
      state.page++;
    },
    resetPosts: (state, action: PayloadAction<IPost[]>) => {
      state.entries = [...action.payload];
      state.page = 2;
    },
  },
});

export const {appendPost, resetPosts} = postsSlice.actions;

export default postsSlice.reducer;
