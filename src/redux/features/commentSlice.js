import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for fetching Facebook comments
export const fetchFacebookComments = createAsyncThunk(
  'comments/fetchFacebookComments',
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://graph.facebook.com/v12.0/${postId}/comments`, 
        {
          params: {
            access_token: 'your-facebook-access-token', // Get this through Facebook Login
          }
        }
      );
      return response.data.data; // return comments
    } catch (error) {
      return rejectWithValue('Error fetching Facebook comments');
    }
  }
);

// Thunk for posting Facebook comments
export const postFacebookComment = createAsyncThunk(
  'comments/postFacebookComment',
  async ({ postId, message }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v12.0/${postId}/comments`,
        {
          message,
          access_token: 'your-facebook-access-token', // Use a valid access token
        }
      );
      return response.data; // return the posted comment
    } catch (error) {
      return rejectWithValue('Error posting Facebook comment');
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
    builder
      .addCase(fetchFacebookComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFacebookComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload; // Set Facebook comments to state
      })
      .addCase(fetchFacebookComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error state
      })
      .addCase(postFacebookComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postFacebookComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload); // Add the new comment to state
      })
      .addCase(postFacebookComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error state
      });
  },
});

export default commentsSlice.reducer;
