import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostBySlug } from '../redux/features/postSlice';
import Loader from '../components/Loader';
import TableOfContent from '../components/TableOfContent';
import Sidebar from '../components/Sidebar';
import { TiSocialFacebook } from "react-icons/ti";
import { FaTwitter } from "react-icons/fa";

function decodeHTMLEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

function SingleBlog() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPostBySlug(slug));
  }, [dispatch, slug]);

  // Memoizing decoded content, titles, and date/time
  const decodedTitle = useMemo(() => blog?.title ? decodeHTMLEntities(blog.title.rendered) : 'No Title', [blog]);
  const decodedContent = useMemo(() => blog?.content ? decodeHTMLEntities(blog.content.rendered) : 'No Content', [blog]);
  const decodedCaption = useMemo(() => blog?.imageCaption ? decodeHTMLEntities(blog.imageCaption) : '', [blog]);

  const publishedDate = useMemo(() => blog?.date ? new Date(blog.date).toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'
  }) : 'No Date', [blog]);

  const publishedTime = useMemo(() => blog?.date ? new Date(blog.date).toLocaleTimeString('en-US', {
    hour: 'numeric', minute: 'numeric', hour12: true
  }) : 'No Time', [blog]);

  // Adding IDs to content headers only if blog data is available
  const contentWithIds = useMemo(() => {
    if (!blog) return '';
    const parser = new DOMParser();
    const doc = parser.parseFromString(decodedContent, 'text/html');
    const headers = doc.querySelectorAll('h2');
    headers.forEach((header, index) => {
      const id = header.id || header.textContent.replace(/\s+/g, '-').toLowerCase() + `-${index}`;
      header.id = id;
    });
    return doc.body.innerHTML;
  }, [blog, decodedContent]);

  // Error and loading states
  if (loading) return <div><Loader /></div>;
  if (error) return <div role="alert" className="text-red-500">Unable to load blog post: {error}</div>;
  if (!blog) return <div>No blog post found.</div>;

  // Share URLs
  const postUrl = window.location.href; // Get the current URL
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(decodedTitle)}`;

  return (
    <div className="p-4 mb-[70px] mt-2">
      {/* Blog Title */}
      <h1 className="text-lg font-bold mb-2 text-[#292929] leading-[1.15]">{decodedTitle}</h1>

      {/* Blog Meta Information */}
      <ul className="text-sm text-[#292929] my-2 flex flex-wrap gap-x-2">
        <li>by <span className="text-[#0D8888] font-medium text-sm">{blog.author || 'Unknown'}</span></li>
        <li>• Published on <span className="text-[#0D8888] font-medium text-sm">{publishedDate},</span></li>
        <li><span className="text-[#0D8888] font-medium text-sm">{publishedTime}</span></li>
      </ul>
      
      {/* Social Share Buttons */}
      <div className='flex items-center gap-4 my-4'>
        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className='h-6 bg-[#3b5998] text-white flex items-center rounded-md py-1s'>
          <span className='w-[2.5em] flex justify-center '><span className='bg-white w-[17px] h-[17px] items-end flex justify-center rounded-full '><TiSocialFacebook className='text-[#3b5998]' /></span></span>
          <span className='gard leading-4 text-xs px-[15px] font-medium h-full flex items-center'>Share</span>
        </a>
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className='h-6 bg-[#1da1f2] text-white flex items-center rounded-md py-1s'>
          <span className='w-[2.5em] flex justify-center '><FaTwitter /></span>
          <span className='gard leading-4 text-xs px-[15px] font-medium h-full flex items-center'>Tweet</span>
        </a>
      </div>

      {/* Blog Featured Image */}
      {blog.featuredImage && (
        <>
          <img
            src={blog.featuredImage}
            alt={decodedTitle}
            className="w-full rounded-[4px] mb-2"
            loading="lazy"  // Lazy load the image
          />
          {decodedCaption && <div className="text-sm text-[#5c5c5c] font-medium mb-4" dangerouslySetInnerHTML={{ __html: decodedCaption }} />}
        </>
      )}

      {/* Table of Contents */}
      <TableOfContent content={contentWithIds} />

      {/* Blog Content */}
      <div dangerouslySetInnerHTML={{ __html: contentWithIds }} className="blog-content text-sm text-[#292929]" />
      
      {/* Social Share Buttons Again */}
      <div className='flex items-center gap-4 my-8'>
        <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" className='h-6 bg-[#3b5998] text-white flex items-center rounded-md py-1s'>
          <span className='w-[2.5em] flex justify-center '><span className='bg-white w-[17px] h-[17px] items-end flex justify-center rounded-full '><TiSocialFacebook className='text-[#3b5998]' /></span></span>
          <span className='gard leading-4 text-xs px-[15px] font-medium h-full flex items-center'>Share</span>
        </a>
        <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className='h-6 bg-[#1da1f2] text-white flex items-center rounded-md py-1s'>
          <span className='w-[2.5em] flex justify-center '><FaTwitter /></span>
          <span className='gard leading-4 text-xs px-[15px] font-medium h-full flex items-center'>Tweet</span>
        </a>
      </div>

      {/* Tags Section */}
      {blog.tags && blog.tags.length > 0 && (
        <div className="my-5">
          <h2 className="text-lg font-semibold">Tags</h2>
          <div className="flex gap-1 flex-wrap my-4">
            {blog.tags.map((tag, index) => (
              <div key={index} className="bg-[#0D8888] capitalize text-white text-sm rounded p-2">
                {decodeHTMLEntities(tag)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}

export default SingleBlog;
