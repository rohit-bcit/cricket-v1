import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Cache variables for faster data retrieval
const postsCache = {};
const postSlugCache = {};

// Helper functions for fetching external data (same as before)
const fetchFeaturedImage = async (mediaId) => {
  try {
    const response = await axios.get(`https://cricketscore.io/wp-json/wp/v2/media/${mediaId}`);
    return { imageUrl: response.data.source_url, caption: response.data.caption.rendered };
  } catch (error) {
    throw new Error('Error fetching featured image: ' + (error.response?.data || error.message));
  }
};

const fetchTags = async (tagIds) => {
  try {
    const tags = await Promise.all(tagIds.map(async (tagId) => {
      const response = await axios.get(`https://cricketscore.io/wp-json/wp/v2/tags/${tagId}`);
      return response.data.name;
    }));
    return tags;
  } catch (error) {
    throw new Error('Error fetching tags: ' + (error.response?.data || error.message));
  }
};

const fetchAuthor = async (authorId) => {
  try {
    const response = await axios.get(`https://cricketscore.io/wp-json/wp/v2/users/${authorId}`);
    return response.data.name;
  } catch (error) {
    throw new Error('Error fetching author: ' + (error.response?.data || error.message));
  }
};

// Asynchronous thunk actions with caching

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue, getState }) => {
  // Check if posts are already cached
  if (postsCache.posts && postsCache.timestamp && Date.now() - postsCache.timestamp < 60000) {
    // Cache for 1 minute (60,000 ms)
    return postsCache.posts;
  }

  try {
    const response = await axios.get('https://cricketscore.io/wp-json/wp/v2/posts');
    postsCache.posts = response.data;
    postsCache.timestamp = Date.now(); // Update cache timestamp
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const fetchPostBySlug = createAsyncThunk('posts/fetchPostBySlug', async (slug, { rejectWithValue }) => {
  // Check if the post by slug is already cached
  if (postSlugCache[slug]) {
    return postSlugCache[slug];
  }

  try {
    const response = await axios.get(`https://cricketscore.io/wp-json/wp/v2/posts?slug=${slug}`);
    if (response.data.length > 0) {
      const blogData = response.data[0];
      const postDetails = { ...blogData };

      const [featuredImage, tags, author] = await Promise.all([ 
        blogData.featured_media ? fetchFeaturedImage(blogData.featured_media) : null,
        blogData.tags ? fetchTags(blogData.tags) : [],
        blogData.author ? fetchAuthor(blogData.author) : null
      ]);

      const postWithDetails = {
        ...postDetails,
        featuredImage: featuredImage?.imageUrl,
        imageCaption: featuredImage?.caption,
        tags,
        author
      };

      // Cache the post by slug
      postSlugCache[slug] = postWithDetails;
      return postWithDetails;
    } else {
      return rejectWithValue('Post not found');
    }
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

// New action to search posts by query
export const searchPosts = createAsyncThunk(
  'posts/searchPosts',
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://cricketscore.io/wp-json/wp/v2/posts?search=${query}`);
      return response.data; // Returning the posts from the API
    } catch (error) {
      // If an error occurs, handle it gracefully by returning a rejected action
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

// Initial state
const initialState = {
  blogs: [],
  blog: null,
  searchResults: [], // Store search results here
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchPosts action
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
      // Handle fetchPostBySlug action
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
      })
      // Handle searchPosts action
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload; // Store the search results
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default postsSlice.reducer;
