import { useState, useEffect } from "react";

import AddComment from "./AddComment";

const Comment = ({ ideaId, user }) => {

  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false); 
 
  const fetchComments = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/ideas/${ideaId}/comments`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await res.json();
      setComments(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [ideaId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="comment-container">
      <button className="comment-link" onClick={togglePopup}>
        View comments
      </button>
  
      {showPopup && (
        <div className="popup">
          <button className="close-button" onClick={togglePopup}>
            Close
          </button>
  
          {Array.isArray(comments) && comments.length > 0 ? (
            <div>
              {comments.map((comment, index) => (
                <div className="comment-card" key={comment.id}>
                  <h5>{comment.comment}</h5>
                  <h6 style={{ marginTop: "4px" }}>
                    Commented by: {comment.user_name}
                  </h6>
                  {index === comments.length - 1 && (
                    <div className="add-comment-section">
                      <AddComment ideaId={ideaId} onNewComment={handleNewComment} user={user} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              <p>No comments yet</p>
              <div className="add-comment-section">
                <AddComment ideaId={ideaId} onNewComment={handleNewComment} user={user}/>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
  
};

export default Comment;
