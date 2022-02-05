import {configureStore} from '@reduxjs/toolkit';
import postsReducer from './reducers/postsReducer';

const store = configureStore({
  reducer: {
    // to have state.counter should write counter: slice
    posts: postsReducer,
    // add more slices here
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
