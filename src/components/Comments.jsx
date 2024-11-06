import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, postComment } from '../redux/features/commentSlice'; // Import the thunks


function Comments({ postId }) {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState('');
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);

  // Fetch comments when the component mounts or when postId changes
  useEffect(() => {
    dispatch(fetchComments(postId)); // Fetch comments from Redux when postId changes
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

    // Dispatch postComment action with postId and commentData
    dispatch(postComment({ postId, commentData }));

    setNewComment(''); // Clear the comment input after posting
  };

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

      {/* Display comments */}
      <div className="mt-5">
        {comments.map((comment) => (
          <div key={comment.id} className="mb-5">
            <div className="font-semibold text-sm">{comment.author_name}</div>
            <div
              className="text-sm text-[#1c1e21]"
              dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
