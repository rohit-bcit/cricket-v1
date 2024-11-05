import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Asynchronous thunk action for fetching all posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('https://cricketscore.io/wp-json/wp/v2/posts');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Helper function for fetching featured image
const fetchFeaturedImage = async (mediaId) => {
  const response = await axios.get(`https://cricketscore.io/wp-json/wp/v2/media/${mediaId}`);
  return { imageUrl: response.data.source_url, caption: response.data.caption.rendered };
};

// Helper function for fetching tags
const fetchTags = async (tagIds) => {
  const tags = await Promise.all(tagIds.map(async (tagId) => {
    const response = await axios.get(`https://cricketscore.io/wp-json/wp/v2/tags/${tagId}`);
    return response.data.name;
  }));
  return tags;
};

// Asynchronous thunk action for fetching a single post by slug
export const fetchPostBySlug = createAsyncThunk('posts/fetchPostBySlug', async (slug, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://cricketscore.io/wp-json/wp/v2/posts?slug=${slug}`);
    if (response.data.length > 0) {
      const blogData = response.data[0];
      let postDetails = { ...blogData };

      if (blogData.featured_media) {
        const { imageUrl, caption } = await fetchFeaturedImage(blogData.featured_media);
        postDetails = { ...postDetails, featuredImage: imageUrl, imageCaption: caption };
      }

      if (blogData.tags && blogData.tags.length > 0) {
        const tags = await fetchTags(blogData.tags);
        postDetails = { ...postDetails, tags };
      }

      return postDetails;
    } else {
      return rejectWithValue('Post not found');
    }
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// Initial state
const initialState = {
  blogs: [],
  blog: null,
  loading: false,
  error: null,
};

// Create slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchPostBySlug.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchPostBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default postsSlice.reducer;
