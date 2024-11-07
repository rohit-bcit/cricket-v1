import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../redux/features/postSlice'; // Importing the action to fetch posts
import Loader from './Loader'; // Assuming you have a Loader component for loading state
import { Link } from 'react-router-dom';

function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

function Latest() {
    const dispatch = useDispatch();

    // Accessing the Redux state for blogs, loading, and error
    const { blogs, loading, error } = useSelector((state) => state.posts);

    // UseEffect to dispatch fetchPosts action if not already fetched
    useEffect(() => {
        // Only dispatch fetchPosts if the blogs are empty and not currently loading
        if (blogs.length === 0 && !loading && !error) {
            dispatch(fetchPosts());
        }
    }, [dispatch, blogs.length, loading, error]);

    // Handle loading and error states
    if (loading && blogs.length === 0) return <Loader />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col my-6">
            <h2 className="text-lg font-semibold">
                Latest <span className="text-[#0D8888]">news</span>
            </h2>

            {/* Iterate over the blogs and render each one */}
            {blogs.length > 0 ? (
                blogs.map((singleBlog) => {
                    const decodedTitle = decodeHTMLEntities(singleBlog.title);
                    const publishedDate = new Date(singleBlog.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    });

                    // Image URL from the blog data (adjust based on your API structure)
                    const imageSrc = singleBlog.featuredImage.node?.sourceUrl || '';

                    return (
                        <Link
                            key={singleBlog.id}
                            to={`/${singleBlog.slug}`}
                            className="flex flex-col border-b my-2 p-3 pb-[15px] border-[#EDEDED]"
                        >
                            {/* Render image if available */}
                            {imageSrc && (
                                <img src={imageSrc} alt={decodedTitle} className="rounded-lg" />
                            )}

                            <h3 className="font-medium text-[16px] leading-[22px] my-2 text-[#292929]">
                                {decodedTitle}
                            </h3>

                            <div className="text-sm leading-[17px] text-[#5C5C5C] font-normal tracking-wider">
                                {publishedDate}
                            </div>
                        </Link>
                    );
                })
            ) : (
                <div>No blog posts available.</div>
            )}

            {/* Button to navigate to the "More News" page */}
            <Link
                className="my-4 text-center py-2 px-4 flex items-center justify-center gap-2 bg-[#0d8888] text-white uppercase rounded-md font-medium"
                to="/news"
            >
                More News
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32" fill="none">
                        <path
                            d="M8 22.6668L16 16.0002L8 9.3335"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M16 22.6668L24 16.0002L16 9.3335"
                            stroke="white"
                            strokeOpacity="0.4"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </span>
            </Link>
        </div>
    );
}

export default Latest;
