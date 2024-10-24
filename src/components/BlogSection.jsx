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

    if (loading) return <Loader />; // Use the Loader component for loading state
    if (error) return <div>Error: {error}</div>; // Error handling

    return (
        <div className='flex flex-col bg-white mt-[25px] mb-20 px-4 pb-5'>
            <h2 className='font-semibold text-[22px] leading-[25.78px] mb-[15px]'>NEWS & BLOGS</h2>
            <div className='flex flex-col gap-5'>
                {blogs.length === 0 ? (
                    <div>No blogs available.</div>
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
