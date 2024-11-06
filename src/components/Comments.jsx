import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFacebookComments, postFacebookComment } from '../redux/features/commentSlice'; // Import the thunks

function Comments({ postId, postUrl }) { // postUrl is passed as a prop
  const dispatch = useDispatch();
  const { comments, loading, error, success } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState('');
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest'); // state to manage sorting

  // Fetch comments when the component mounts or when postId changes
  useEffect(() => {
    dispatch(fetchFacebookComments(postId)); // Fetch comments from Redux when postId changes

    // Load the Facebook SDK script only once
    if (window.FB) {
      window.FB.XFBML.parse(); // Re-parse Facebook elements
    } else {
      const script = document.createElement('script');
      script.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v21.0";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.FB) {
          window.FB.XFBML.parse(); // Re-parse Facebook elements after SDK is loaded
        }
      };
      document.body.appendChild(script);
    }
  }, [dispatch, postId]);

  // Handle comment submission via Redux
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return; // Don't submit if comment is empty

    const commentData = {
      post: postId,
      content: newComment,
      author_name: 'Anonymous', // Replace with actual user's name if logged in
      author_email: 'anonymous@example.com', // Replace with actual user's email if logged in
    };

    // Dispatch postFacebookComment action with postId and commentData
    dispatch(postFacebookComment({ postId, commentData }));

    setNewComment(''); // Clear the comment input after posting
    setIsTextareaFocused(false); // Optionally blur the textarea after submitting
  };

  // Handle comment sorting
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Sort comments by newest or oldest
  const sortedComments = [...comments].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date) - new Date(a.date); // Newest first
    } else if (sortOrder === 'oldest') {
      return new Date(a.date) - new Date(b.date); // Oldest first
    }
    return 0; // Default case
  });

  return (
    <div className="mt-10">
      <h2 className="text-lg text-[#292929] font-semibold">Comments</h2>

      <div className="flex items-center justify-between border-b pb-5">
        <div className="flex items-center gap-1 text-sm text-[#1c1e21] font-semibold my-4">
          <span>{comments.length}</span>
          <span>comments</span>
        </div>

        <div className="flex items-center gap-1">
          <span className="text-[#4b4f56] text-sm">Sort by</span>
          <select
            className="bg-transparent border outline-0 rounded-sm border-[#1c1e21] text-[#1c1e21] text-xs py-1"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div>
        <textarea
          className="text-[#afafaf] font-medium w-full outline-0 border py-4 px-2"
          placeholder="Add a comment.."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onFocus={() => setIsTextareaFocused(true)}
          onBlur={() => setIsTextareaFocused(false)}
        />
      </div>

      {isTextareaFocused && (
        <div className="flex py-2 px-2 justify-end border bg-[#f5f6f7]">
          <button
            onClick={handleCommentSubmit}
            className="bg-[#4267b2] border-[#4267b2] border text-white py-1 px-3 rounded-sm leading-none font-semibold text-sm"
            disabled={!newComment.trim()}
          >
            Post
          </button>
        </div>
      )}

      {/* Display loading state */}
      {loading && <p>Loading comments...</p>}

      {/* Display error state */}
      {error && <p>{error}</p>}

      {/* Display success message */}
      {success && !loading && !error && <p>Comment posted successfully!</p>}

      {/* Display comments */}
      <div className="mt-5">
        {sortedComments.map((comment) => (
          <div key={comment.id} className="mb-5">
            <div className="font-semibold text-sm">{comment.author_name}</div>
            <div
              className="text-sm text-[#1c1e21]"
              dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
            />
          </div>
        ))}
      </div>

      {/* Render the Facebook comments plugin */}
      <div
        className="fb-comments"
        data-href={postUrl} // Dynamically set the post URL
        data-width="500" // Set the width of the comments section
        data-numposts="5" // Number of comments to show
      ></div>
    </div>
  );
}

export default Comments;
