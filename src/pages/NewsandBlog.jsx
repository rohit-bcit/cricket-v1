import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader'; // Import your loader component
import { fetchPosts } from '../redux/features/postSlice'; // Import your fetch action
import BlogCard from '../components/BlogCard.jsx';

function NewsandBlog() {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.posts); // Adjust the path based on your Redux setup

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    if (loading) return <Loader />; // Show loader while fetching
    if (error) return <div>Error: {error}</div>; // Handle error

    return (
        <div className='py-5 px-4 mb-20'>
            <h2 className='text-[#292929] font-semibold text-[16px] leading-[18.75px] uppercase mb-[15px]'>News & Blog</h2>
            <div className='flex flex-col gap-3'>

            {blogs.length === 0 ? (
                <div>No blog posts available.</div>
            ) : (
                blogs.map((post, index) => (
                    <BlogCard key={index} blog={post}/>
                ))
            )}
            </div>
        </div>
    );
}

export default NewsandBlog;
