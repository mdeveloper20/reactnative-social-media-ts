import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import IPost from '~/services/models/IPost';

// Define a type for the slice state
interface PostsState {
  entries: IPost[];
  page: number;
  isFetching: boolean;
}

// Define the initial state using that type
const initialState: PostsState = {
  entries: [],
  page: 1,
  isFetching: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    appendPost: (state, action: PayloadAction<IPost[]>) => {
      state.entries.push(...action.payload);
      state.page++;
      state.isFetching = false;
    },
    resetPosts: (state, action: PayloadAction<IPost[]>) => {
      state.entries = [...action.payload];
      state.isFetching = false;
      state.page = 2;
    },
    setFetching: (state, action: PayloadAction<boolean>) => {
      state.isFetching = action.payload;
    },
  },
});

export const {appendPost, resetPosts, setFetching} = postsSlice.actions;

export default postsSlice.reducer;
