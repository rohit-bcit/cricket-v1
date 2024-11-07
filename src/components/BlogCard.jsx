import React from 'react';
import { Link } from 'react-router-dom';

// Utility to decode HTML entities
function decodeHTMLEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

function BlogCard({ blog }) {
  // Format the published date (with a null check for blog.date)
  const publishedDate = blog.date ? new Date(blog.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'No date available';

  // Slug, decoded title, and excerpt (handle possible null values)
  const slug = blog.slug;
  const decodedTitle = decodeHTMLEntities(blog.title || 'Default Title');
  const decodedExcerpt = decodeHTMLEntities(blog.excerpt.replace(/<p>|<\/p>/g, '') || 'No excerpt available');

  // Image URL directly from the blog data (no need for additional fetching)
  const imageSrc = blog.featuredImage?.node?.sourceUrl ;
  return (
    <Link to={`/${slug}`} className="flex flex-col border rounded-lg p-3 pb-[15px] border-[#EDEDED]">
      {/* Display featured image if available, else fallback */}
      <img 
        src={imageSrc} 
        alt={decodedTitle} 
        className="rounded-lg " 
      />

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

export default BlogCard;
