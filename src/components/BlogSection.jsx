import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from './BlogCard';
import { fetchPosts } from '../redux/features/postSlice'; 
import Loader from './Loader'; // Import the Loader component

function BlogSection() {
    const dispatch = useDispatch();
    
    // Accessing the Redux state for blogs, loading, and error
    const { blogs, loading, error } = useSelector((state) => state.posts);

    // Using useEffect to fetch posts only if necessary
    useEffect(() => {
        if (blogs.length === 0 && !loading && !error) {
            dispatch(fetchPosts());
        }
    }, [dispatch, blogs.length, loading, error]);

    // Loading and error handling
    if (loading && blogs.length === 0) {
        return <Loader text="Loading blogs..." />; // Display loading spinner
    }

    if (error) {
        return <div role="alert" className="text-red-500">Error: {error}</div>; // Improved error handling with accessibility
    }

    // If no blogs are available
    if (blogs.length === 0) {
        return (
            <div className="flex flex-col bg-white mt-[25px] mb-20 px-4 pb-5">
                <h2 className='font-semibold text-[22px] leading-[25.78px] mb-[15px]'>NEWS & BLOGS</h2>
                <div className="text-gray-500 text-center">
                    No blogs available at the moment. Please check back later.
                </div>
            </div>
        );
    }

    // Rendering blogs if available
    return (
        <div className='flex flex-col bg-white mt-[25px] mb-20 px-4 pb-5'>
            <h2 className='font-semibold text-[22px] leading-[25.78px] mb-[15px]'>NEWS & BLOGS</h2>
            
            <div className='flex flex-col gap-5'>
                {blogs.map((item) => (
                    <BlogCard key={item.id} blog={item} />
                ))}
            </div>
        </div>
    );
}

export default BlogSection;
