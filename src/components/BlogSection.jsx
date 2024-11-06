import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BlogCard from './BlogCard';
import { fetchPosts } from '../redux/features/postSlice'; 
import Loader from './Loader'; // Import the Loader component

function BlogSection() {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    // Loading and error handling
    if (loading) return <Loader text="Loading blogs..." />; // Show "Loading blogs..." text to enhance UX
    if (error) return <div role="alert" className="text-red-500">Error: {error}</div>; // Improved error handling with role for accessibility

    return (
        <div className='flex flex-col bg-white mt-[25px] mb-20 px-4 pb-5'>
            <h2 className='font-semibold text-[22px] leading-[25.78px] mb-[15px]'>NEWS & BLOGS</h2>
            <div className='flex flex-col gap-5'>
                {blogs.length === 0 ? (
                    <div>No blogs available at the moment. Please check back later.</div> // Improved empty state message
                ) : (
                    blogs.map((item) => (
                        <BlogCard key={item.id} blog={item} />
                    ))
                )}
            </div>
        </div>
    );
}

export default BlogSection;
