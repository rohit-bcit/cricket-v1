import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../redux/features/postSlice'; // Import the action
import Loader from '../components/Loader';
import BlogCard from '../components/BlogCard';

function Search() {
  const dispatch = useDispatch();
  const location = useLocation();

  // Get the query parameter from the URL
  const query = new URLSearchParams(location.search).get('query') || '';

  // Access the search results from the Redux store
  const { searchResults, loading, error } = useSelector((state) => state.posts);

  // Fetch search results when the query changes
  useEffect(() => {
    if (query.length > 2) {
      dispatch(searchPosts(query)); // Dispatch the search action if query length > 2
    }
  }, [query, dispatch]);

  // Handle case when no query is provided
  if (!query) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold">Please enter a search term</h2>
      </div>
    );
  }

  return (
    <div className="max-w-screen-lg mx-auto p-5">
      <h2 className="text-3xl font-bold text-center mb-6">
        Search Results for: "{query}"
      </h2>

      {/* Show Loader if still fetching */}
      {loading && (
        <div className="flex justify-center items-center">
          <Loader /> {/* Your loader component */}
        </div>
      )}

      {/* Show Error if something went wrong */}
      {error && (
        <div className="bg-red-100 text-red-600 p-3 rounded-lg text-center mb-5">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Display results when they are fetched */}
      {searchResults && Array.isArray(searchResults) && searchResults.length > 0 ? (
        <div className="mt-6 mb-20 ">
          {searchResults.map((post, index) => (
            <BlogCard key={index} blog = {post}/>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center text-lg text-gray-600">
            No results found.
          </div>
        )
      )}
    </div>
  );
}

export default Search;
