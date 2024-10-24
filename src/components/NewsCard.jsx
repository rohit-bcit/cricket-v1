import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function NewsCard({ blog }) {
  const [featuredImage, setFeaturedImage] = useState('');
 

  useEffect(() => {
    const fetchData = async () => {
      // Fetch featured image
      if (blog.featured_media) {
        const imageUrl = await fetchFeaturedImage(blog.featured_media);
        setFeaturedImage(imageUrl);
      }
    };

    fetchData();
  }, [blog]);

  const publishedDate = new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const slug = blog.slug;


  return (
    <Link to={`/${slug}`} className='flex flex-col border rounded-lg p-3 pb-[15px] border-[#EDEDED]'>
      {featuredImage && (
        <img src={featuredImage} alt={blog.title.rendered} className='rounded-lg' />
      )}
      <h3 className='font-medium text-[16px] leading-[22px] mt-4 text-[#292929]'>
        {blog.title.rendered}
      </h3>
      <p className='text-[14px] leading-[17px] mt-2 text-[#5C5C5C]'>
        {blog.excerpt.rendered.replace(/<p>|<\/p>/g, '')}
      </p>
      <div className='text-[12px] leading-[17px] text-[#5C5C5C] font-normal my-3'>
        {publishedDate}
      </div>
    </Link>
  );
}
async function fetchFeaturedImage(mediaId) {
  const response = await fetch(`https://cricketscore.io/wp-json/wp/v2/media/${mediaId}`);
  const mediaData = await response.json();
  return mediaData.source_url;
}


export default NewsCard;
