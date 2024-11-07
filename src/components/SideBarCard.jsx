import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Utility function to decode HTML entities
function decodeHTMLEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}



function SideBarCard({ blog }) {
  // Format the published date (with a null check for blog.date)
  const publishedDate = new Date(blog.date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const slug = blog.slug;
  const decodedTitle = decodeHTMLEntities(blog.title || 'Default Title');
  // Image URL directly from the blog data (no need for additional fetching)
  const imageSrc = blog.featuredImage?.node?.sourceUrl ;

  return (
    <Link to={`/${slug}`} className="flex flex-col border-b my-2 p-3 pb-[15px] border-[#EDEDED]">
      
        <img src={imageSrc} alt={decodedTitle} className="rounded-lg" />
    
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
