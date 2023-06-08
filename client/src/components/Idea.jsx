import { useState, useEffect } from "react";
import Comment from "./Comment";

const Idea = ({ sectionId, user, ideasProp }) => {
  const [ideas, setIdeas] = useState([]);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/sections/${sectionId}/ideas`);
        if (!res.ok) {
          throw new Error("Failed to fetch ideas");
        }
        const data = await res.json();
        setIdeas(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchIdeas();
  }, [sectionId]);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter the ideasProp array to only include ideas that belong to the section
  const filteredIdeas = ideasProp !== null ? ideasProp.filter((idea) => idea.section_id === sectionId) : [];

  return (
    <div className="idea-container">
      {filteredIdeas.map((idea) => (
        <div className="idea-card" key={idea.id}>
          <h5>{idea.name}</h5>
          <h6>{idea.description}</h6>
          <div className="comment-link">
            <Comment ideaId={idea.id} user={user} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Idea;
