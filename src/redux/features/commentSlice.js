import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching comments
export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (postId, { rejectWithValue }) => {
    if (!postId) {
      // If postId is invalid (undefined or null), reject the request
      return rejectWithValue('Post ID is missing');
    }

    try {
      const response = await axios.get(
        `https://cricketscore.io/wp-json/wp/v2/comments?post=${postId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('Error fetching comments');
    }
  }
);

// Thunk for posting a comment
export const postComment = createAsyncThunk(
  'comments/postComment',
  async ({ postId, commentData }, { rejectWithValue }) => {
    if (!postId) {
      return rejectWithValue('Post ID is missing');
    }

    const auth = {
      headers: {
        'Authorization': `Basic ${btoa('your-username' + ':' + 'your-application-password')}`, // Basic Auth or Application Password
      },
    };

    try {
      const response = await axios.post(
        `https://cricketscore.io/wp-json/wp/v2/comments`,
        {
          post: postId, // Ensure postId is included in the body
          ...commentData, // Spread the other comment data here
        },
        auth
      );
      return response.data; // Return the new comment data
    } catch (error) {
      return rejectWithValue('Error posting comment');
    }
  }
);
// Slice
const commentsSlice = createSlice({
  name: 'comments',
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetching comments
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error on new request
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload; // Set fetched comments to state
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error state
      });

    // Handle posting a comment
    builder
      .addCase(postComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload); // Add new comment to state
      })
      .addCase(postComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error state
      });
  },
});

export default commentsSlice.reducer;
