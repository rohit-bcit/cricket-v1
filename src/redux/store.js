// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/postSlice'; // Ensure the path is correct
import commentReducer from './features/commentSlice'; // Ensure the path is correct

const store = configureStore({
    reducer: {
        posts: postsReducer,
        comments: commentReducer,

    },
});

export default store;
