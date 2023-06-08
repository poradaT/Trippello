import React, { useState } from "react";

const AddComment = ({ ideaId, onNewComment, user }) => {
    const [commentText, setCommentText] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const formData = {
          user_id: user.id,
          idea_id: ideaId,
          comment: commentText,
          comment_date: new Date().toISOString().split("T")[0],
        };
  
        const res = await fetch(`/api/comments`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        if (res.ok) {
          const newComment = await res.json();
          onNewComment(newComment);
          setCommentText("");
        } else {
          throw new Error("Failed to create comment");
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
        <>
 
      <div className="add-comment-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Write a comment..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button type="submit">Add Comment</button>
        </form>
      </div>
      </>
    );
  };
  
  export default AddComment;
  