import { useState, useEffect } from "react";
import Comment from "./Comment";
import EditIdea from "./EditIdea";

const Idea = ({
  sectionId,
  user,
  ideasProp,
  handleDeleteIdea,
  handleUpdateIdea,
}) => {
  const [comments, setComments] = useState([]);
  const [editingIdeaId, setEditingIdeaId] = useState(null);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleDeleteIdeaClick = (ideaId) => {
    handleDeleteIdea(sectionId, ideaId);
  };

  const handleEditIdeaClick = (ideaId) => {
    setEditingIdeaId(ideaId);
  };

  const handleCancelEdit = () => {
    setEditingIdeaId(null);
  };

  const handleIdeaUpdate = (sectionId, updatedIdea) => {
    handleUpdateIdea(sectionId, updatedIdea);
    setEditingIdeaId(null);
  };

  // Filter the ideasProp array to only include ideas that belong to the section
  const filteredIdeas =
    ideasProp !== null
      ? ideasProp.filter((idea) => idea.section_id === sectionId)
      : [];

  return (
    <div className="idea-container">
      {filteredIdeas.map((idea) => (
        <div className="idea-card" key={idea.id}>
          {editingIdeaId === idea.id ? (
            <EditIdea
              idea={idea}
              handleCancelEdit={handleCancelEdit}
              handleIdeaUpdate={handleIdeaUpdate}
              sectionId={sectionId}
            />
          ) : (
            <>
              <div className="card-header">
                <button
                  className="edit-idea-button"
                  onClick={() => handleEditIdeaClick(idea.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-idea-button"
                  onClick={() => handleDeleteIdeaClick(idea.id)}
                >
                  X
                </button>
              </div>
              <h5>{idea.name}</h5>
              <h6>{idea.description}</h6>
              {idea.photo_url && (
                <img
                  src={`http://localhost:3000/${idea.photo_url}`}
                  alt="Idea Photo"
                  style={{ width: "100%", height: "auto" }}
                />
              )}
              <div className="comment-link">
                <Comment ideaId={idea.id} user={user} />
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Idea;
