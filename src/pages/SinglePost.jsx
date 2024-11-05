import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostBySlug } from "../redux/features/postSlice";
import Loader from "../components/Loader";

function decodeHTMLEntities(text) {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

function SingleBlog() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { blog, loading, error } = useSelector((state) => state.posts);
  console.log(blog);

  useEffect(() => {
    dispatch(fetchPostBySlug(slug));
  }, [dispatch, slug]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const decodedTitle = blog ? decodeHTMLEntities(blog.title.rendered) : "";
  const decodedContent = blog ? decodeHTMLEntities(blog.content.rendered) : "";
  const decodedCaption = blog ? decodeHTMLEntities(blog.imageCaption) : "";
  const publishedDate = blog
    ? new Date(blog.date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";
  const publishedTime = blog
    ? new Date(blog.date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "";

  return (
    <div className="p-4 mb-[70px] mt-2">
      <h1 className="text-lg font-bold mb-2 text-[#292929] leading-[1.15]">
        {decodedTitle}
      </h1>
      <ul className="text-sm text-[#292929] my-2 flex flex-wrap gap-x-2">
        <li>
          by
          <span className="text-[#0D8888] font-medium text-sm mb-4 "> admin</span>
        </li>
        <li className="text-nowrap">
          • Published on
          <span className="text-[#0D8888] font-medium text-sm text-nowrap"> {publishedDate},</span>
        </li>
        <li>
          <span className="text-[#0D8888] font-medium text-sm ">{publishedTime}</span>
        </li>
      </ul>
      <div className="flex items-center gap-4">
        <div>
          <i className="fab fa-facebook" aria-hidden="true"></i>
        </div>
      </div>
      {blog?.featuredImage && (
        <>
          <img src={blog.featuredImage} alt={decodedTitle} className="w-full rounded-[4px] mb-2" />
          {decodedCaption && (
            <div
              className="text-sm text-[#5c5c5c] font-medium mb-4"
              dangerouslySetInnerHTML={{ __html: decodedCaption }}
            />
          )}
        </>
      )}
      <div dangerouslySetInnerHTML={{ __html: decodedContent }} className="blog-content text-sm text-[#292929]" />
      <div className="my-5">
        <h2 className="text-lg font-semibold">Tags</h2>
        <div className="flex gap-1 flex-wrap my-4">
          {blog?.tags &&
            blog.tags.map((tag, index) => (
              <div key={index} className="bg-[#0D8888] capitalize text-white text-sm rounded p-2">
                {decodeHTMLEntities(tag)}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
