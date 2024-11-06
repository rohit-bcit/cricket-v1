import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper functions outside the slice for readability

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

// Asynchronous thunk actions

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue, getState }) => {
  const { blogs } = getState().posts;
  if (blogs.length > 0) {
    return blogs;
  }

  try {
    const response = await axios.get('https://cricketscore.io/wp-json/wp/v2/posts');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response ? error.response.data : error.message);
  }
});

export const fetchPostBySlug = createAsyncThunk('posts/fetchPostBySlug', async (slug, { rejectWithValue }) => {
  try {
    const response = await axios.get(`https://cricketscore.io/wp-json/wp/v2/posts?slug=${slug}`);
    if (response.data.length > 0) {
      const blogData = response.data[0];
      const postDetails = { ...blogData };

      const [featuredImage, tags, author] = await Promise.all([
        blogData.featured_media ? fetchFeaturedImage(blogData.featured_media) : null,
        blogData.tags ? fetchTags(blogData.tags) : [],
        blogData.author ? fetchAuthor(blogData.author) : null,
      ]);

      return {
        ...postDetails,
        featuredImage: featuredImage?.imageUrl,
        imageCaption: featuredImage?.caption,
        tags,
        author,
      };
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
