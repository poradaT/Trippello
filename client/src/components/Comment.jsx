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

  const deleteComment = async (commentId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/comments/${commentId}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete comment");
      }
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error(error);
    }
  };

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
              {comments.map((comment) => (
                <div className="comment-card" key={comment.id}>
                  <h5>{comment.comment}</h5>
                  <h6 style={{ marginTop: "4px" }}>
                    Commented by: {comment.user_name}
                  </h6>
                  <button
                    className="delete-comment-button"
                    onClick={() => deleteComment(comment.id)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-comment">
              <p>No comments yet</p>
            </div>
          )}
          <div className="add-comment-section">
            <AddComment
              ideaId={ideaId}
              onNewComment={handleNewComment}
              user={user}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
