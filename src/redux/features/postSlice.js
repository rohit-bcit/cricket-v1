import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Cache variables for faster data retrieval
const postsCache = {};
const postsSlugCache = {};

// Helper function to make a GraphQL request
const fetchGraphQL = async (query) => {
  try {
    const response = await axios.post('https://cricketscore.io/graphql', {
      query,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data from GraphQL:', error); // Log any error encountered
    throw new Error('Error fetching data from GraphQL: ' + (error.response?.data || error.message));
  }
};

// Asynchronous thunk actions with caching
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, { rejectWithValue, getState }) => {
  if (postsCache.posts && postsCache.timestamp && Date.now() - postsCache.timestamp < 60000) {
    return postsCache.posts;
  }

  const query = `
    query {
      posts(first: 10) {
        nodes {
          id
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL(query);
    const posts = data.posts.nodes;

    // Cache posts and update the timestamp
    postsCache.posts = posts;
    postsCache.timestamp = Date.now();

    return posts;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Fetch single post by slug
export const fetchPostBySlug = createAsyncThunk('posts/fetchPostBySlug', async (slug, { rejectWithValue }) => {
  if (postsSlugCache[slug]) {
    return postsSlugCache[slug];
  }

  const query = `
    query {
      post(id: "${slug}", idType: SLUG) {
        id
        title
        content
        excerpt
        slug
        date
        featuredImage {
          node {
            sourceUrl
            altText
            caption
          }
        }
        tags {
          nodes {
            name
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL(query);
    const post = data.post;

    if (!post) {
      return rejectWithValue('Post not found');
    }

    const postWithDetails = {
      ...post,
      featuredImage: post.featuredImage?.node?.sourceUrl,
      imageAlt: post.featuredImage?.node?.altText,
      tags: post.tags?.nodes.map(tag => tag.name),
      author: post.author?.node?.name,
    };

    postsSlugCache[slug] = postWithDetails;

    return postWithDetails;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// Search posts by query
export const searchPosts = createAsyncThunk('posts/searchPosts', async (query, { rejectWithValue }) => {
  const gqlQuery = `
    query {
      posts(where: { search: "${query}" }) {
        nodes {
          id
          title
          excerpt
          slug
          date
          featuredImage {
            node {
              sourceUrl
            }
          }
        }
      }
    }
  `;

  try {
    const data = await fetchGraphQL(gqlQuery);
    return data.posts.nodes;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

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
        state.searchResults = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export default postsSlice.reducer;
