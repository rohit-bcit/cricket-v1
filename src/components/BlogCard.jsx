import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Utility to decode HTML entities
function decodeHTMLEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

function BlogCard({ blog }) {
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (blog.featured_media) {
        try {
          const imageUrl = await fetchFeaturedImage(blog.featured_media);
          setFeaturedImage(imageUrl);
        } catch (error) {
          setImageError(true); // Handle error in case the image fetch fails
          console.error('Failed to fetch featured image:', error);
        }
      }
    };

    fetchData();
  }, [blog]);

  // Format the published date
  const publishedDate = new Date(blog.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Slug, decoded title and excerpt
  const slug = blog.slug;
  const decodedTitle = decodeHTMLEntities(blog.title.rendered);
  const decodedExcerpt = decodeHTMLEntities(blog.excerpt.rendered.replace(/<p>|<\/p>/g, ''));

  return (
    <Link to={`/${slug}`} className="flex flex-col border rounded-lg p-3 pb-[15px] border-[#EDEDED]">
      {/* Display featured image if available, else fallback */}
      {featuredImage && !imageError ? (
        <img src={featuredImage} alt={decodedTitle} className="rounded-lg" />
      ) : (
        <div className="w-full h-[200px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
          No Image Available
        </div>
      )}

      {/* Title */}
      <h3 className="font-medium text-[16px] leading-[22px] mt-4 text-[#292929]">
        {decodedTitle}
      </h3>

      {/* Excerpt */}
      <p className="text-[14px] leading-[17px] mt-2 text-[#5C5C5C] max-h-9 text-ellipsis overflow-hidden">
        {decodedExcerpt}
      </p>

      {/* Published Date */}
      <div className="text-[12px] leading-[17px] text-[#5C5C5C] font-normal my-3">
        {publishedDate}
      </div>
    </Link>
  );
}

// Fetch featured image by mediaId
async function fetchFeaturedImage(mediaId) {
  const response = await fetch(`https://cricketscore.io/wp-json/wp/v2/media/${mediaId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch media');
  }
  const mediaData = await response.json();
  return mediaData.source_url; // Return image source URL
}

export default BlogCard;
