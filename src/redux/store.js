// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/postSlice'; // Ensure the path is correct

const store = configureStore({
    reducer: {
        posts: postsReducer,
    },
});

export default store;