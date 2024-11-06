import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/features/postSlice';
import { Link } from 'react-router-dom';

function decodeHTMLEntities(text) {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
}

// Function to fetch the featured image URL
const fetchFeaturedImage = async (mediaId) => {
    try {
        const response = await fetch(`https://cricketscore.io/wp-json/wp/v2/media/${mediaId}`);
        const data = await response.json();
        return data.source_url; // Return the image URL
    } catch (error) {
        console.error('Error fetching featured image:', error);
        return null; // Return null if fetching fails
    }
};

function Latest() {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.posts);
    const [imageLoading, setImageLoading] = useState(true); // Track image loading state
    const [featuredImages, setFeaturedImages] = useState({}); // Store featured images for each blog post

    useEffect(() => {
        if (blogs.length === 0 && !loading) {
            dispatch(fetchPosts());
        }
    }, [dispatch, blogs.length, loading]);

    useEffect(() => {
        const fetchImages = async () => {
            const images = {};
            for (const blog of blogs) {
                if (blog.featured_media) {
                    const imageUrl = await fetchFeaturedImage(blog.featured_media);
                    images[blog.id] = imageUrl; // Save the image URL with the blog post ID as key
                }
            }
            setFeaturedImages(images);
            setImageLoading(false); // Once all images are loaded, set loading to false
        };

        if (blogs.length > 0) {
            setImageLoading(true); // Reset image loading state when blogs change
            fetchImages();
        }
    }, [blogs]); // Re-run when `blogs` data changes

    if (loading) return <div>Loading related posts...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="flex flex-col my-6">
            <h2 className="text-lg font-semibold">
                Latest <span className="text-[#0D8888]">news</span>
            </h2>
            {/* Iterate over the blogs and render each one */}
            {blogs.map((blog) => {
                const decodedTitle = decodeHTMLEntities(blog.title.rendered);
                const publishedDate = new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                });
                const featuredImage = featuredImages[blog.id]; // Get the image URL for this blog post

                return (
                    <Link
                        key={blog.id}
                        to={`/${blog.slug}`}
                        className="flex flex-col border-b my-2 py-3 pb-[15px] border-[#EDEDED]"
                    >
                        {/* Loading or error state for featured image */}
                        {imageLoading ? (
                            <div className="w-full h-[200px] bg-gray-200 rounded-lg animate-pulse" />
                        ) : featuredImage ? (
                            <img src={featuredImage} alt={decodedTitle} className="rounded-lg" />
                        ) : (
                            <div className="w-full h-[200px] bg-gray-200 rounded-lg">No Image Available</div>
                        )}

                        <h3 className="font-medium text-[16px] leading-[22px] my-2 text-[#292929]">
                            {decodedTitle}
                        </h3>

                        <div className="text-sm leading-[17px] text-[#5C5C5C] font-normal tracking-wider">
                            {publishedDate}
                        </div>
                    </Link>
                );
            })}
            <Link className='my-4 text-center py-2 px-4 flex items-center justify-center gap-2 bg-[#0d8888] text-white uppercase rounded-md font-medium' to = "/news"> More News <span ><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32" fill="none"><path d="M8 22.6668L16 16.0002L8 9.3335" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 22.6668L24 16.0002L16 9.3335" stroke="white" stroke-opacity="0.4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span></Link>
        </div>
    );
}

export default Latest;
