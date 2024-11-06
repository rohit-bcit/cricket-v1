import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Utility function to decode HTML entities
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

function SideBarCard({ blog }) {
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageLoading, setImageLoading] = useState(true); // Track image loading state

  useEffect(() => {
    const fetchData = async () => {
      if (blog.featured_media) {
        const imageUrl = await fetchFeaturedImage(blog.featured_media);
        setFeaturedImage(imageUrl);
        setImageLoading(false); // Mark image as loaded
      } else {
        setImageLoading(false); // Mark image as loaded if no featured media
      }
    };

    fetchData();
  }, [blog]); // Re-run the effect when the blog data changes

  const publishedDate = new Date(blog.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const slug = blog.slug;
  const decodedTitle = decodeHTMLEntities(blog.title.rendered);
  

  return (
    <Link to={`/${slug}`} className="flex flex-col border-b my-2 py-3 pb-[15px] border-[#EDEDED]">
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

      {/* <div className="text-[12px] leading-[17px] text-[#5C5C5C] font-normal my-3">
        {publishedDate}
      </div> */}
    </Link>
  );
}

export default SideBarCard;
