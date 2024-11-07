import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FacebookProvider, Comments, CommentsCount } from 'react-facebook'; // Import components from react-facebook

function CommentsComponent({ postId, postUrl = "https://www.example.com/test-post" }) { // Default postUrl for testing
  const dispatch = useDispatch();
  const { comments, loading, error, success } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState('');
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest'); // State to manage sorting

  // Load Facebook SDK
  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse(); // Re-parse Facebook elements if SDK is already available
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
  }, []);


  // Handle comment submission (example, but not integrated with actual Facebook commenting)
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    // Example: Add a comment to Redux store, this would actually interface with the Facebook API in a real scenario
    if (newComment.trim()) {
      // Here, you would dispatch a Redux action to submit the comment
      // dispatch(postFacebookComment({ postId, commentData }));
      setNewComment(''); // Clear the comment input after posting
      setIsTextareaFocused(false); // Optionally blur the textarea after submitting
    }
  };

  return (
    <div className="mt-10" data-testid="comments-component">
      <h2 className="text-lg text-[#292929] font-semibold" data-testid="comments-heading">
        Comments
      </h2>

      {/* Display loading state */}
      {loading && <p data-testid="loading-comments">Loading comments...</p>}

      {/* Display error state */}
      {error && <p data-testid="error-message">{error}</p>}

      {/* Display success message */}
      {success && !loading && !error && <p data-testid="success-message">Comment posted successfully!</p>}

      {/* Facebook Comments Plugin */}
      <div className="mt-5" data-testid="facebook-comments">
        <FacebookProvider appId="your-app-id">
          <div className="fb-comments" data-href={postUrl} data-width="100%" data-numposts="5"></div>
        </FacebookProvider>
      </div>

    </div>
  );
}

export default CommentsComponent;
