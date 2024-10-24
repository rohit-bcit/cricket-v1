import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../components/Loader';

function SingleBlog() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [featuredImage, setFeaturedImage] = useState('');

  useEffect(() => {
    const fetchBlogData = async () => {
      // Fetch blog data by slug
      const blogResponse = await fetch(`https://cricketscore.io/wp-json/wp/v2/posts?slug=${slug}`);
      const blogDataArray = await blogResponse.json();
      
      
      if (blogDataArray.length > 0) {
        const blogData = blogDataArray[0];
        setBlog(blogData);
        if (blogData.featured_media) {
          const imageUrl = await fetchFeaturedImage(blogData.featured_media);
          setFeaturedImage(imageUrl);
        }
      }
    };
    fetchBlogData(); // Corrected function call
  }, [slug]);

  if (!blog) return <div><Loader/></div>;

  return (
    <div className='p-4'>
      {featuredImage && (
        <img src={featuredImage} alt={blog.title.rendered} className='w-full rounded-lg mb-4' />
      )}
      <h1 className='text-2xl font-bold mb-2'>{blog.title.rendered}</h1>
      <p className='text-gray-600 mb-4'>{new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
      <div dangerouslySetInnerHTML={{ __html: blog.content.rendered }} className='blog-content' />
    </div>
  );
}

// Fetch featured image function
async function fetchFeaturedImage(mediaId) {
  const response = await fetch(`https://cricketscore.io/wp-json/wp/v2/media/${mediaId}`);
  const mediaData = await response.json();
  return mediaData.source_url;
}

export default SingleBlog;
