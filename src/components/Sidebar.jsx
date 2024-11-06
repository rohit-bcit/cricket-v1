import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/features/postSlice'; // Importing the action to fetch posts
import SideBarCard from './SideBarCard'; // Assuming this component will display the individual posts
import Comments from './Comments';
import Latest from './Latest';

function Sidebar() {
  const dispatch = useDispatch();

  // Accessing Redux state
  const { blogs, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    // Dispatch the action to fetch posts when Sidebar component mounts and if blogs are not already loaded
    if (blogs.length === 0 && !loading) {
      dispatch(fetchPosts());
    }
  }, [dispatch, blogs.length, loading]);

  // Display loading state or error
  if (loading) return <div>Loading related posts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col my-6">
      <h2 className="text-lg font-semibold">
        Related <span className="text-[#0D8888]">Stories</span>
      </h2>

      {/* Displaying related posts using SideBarCard */}
      {blogs.length > 0 ? (
        blogs.map((post) => (
          <SideBarCard key={post.id} blog={post} />
        ))
      ) : (
        <p>No related posts available.</p>
      )}

      <Comments/>
      <Latest/>
    </div>
  );
}

export default Sidebar;
