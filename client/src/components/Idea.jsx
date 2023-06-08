// import { useState, useEffect } from "react";
// import Comment from "./Comment";

// const Idea = ({ sectionId, user, ideasProp, handleDeleteIdea }) => {
//   const [comments, setComments] = useState([]);

//   const handleNewComment = (newComment) => {
//     setComments((prevComments) => [...prevComments, newComment]);
//   };

//   const handleDeleteIdeaClick = (ideaId) => {
//     handleDeleteIdea(sectionId, ideaId);
//   };

//   // Filter the ideasProp array to only include ideas that belong to the section
//   const filteredIdeas = ideasProp !== null ? ideasProp.filter((idea) => idea.section_id === sectionId) : [];

//   return (
//     <div className="idea-container">
//       {filteredIdeas.map((idea) => (
//         <div className="idea-card" key={idea.id}>
//           <h5>{idea.name}</h5>
//           <h6>{idea.description}</h6>
//           <div className="comment-link">
//             <Comment ideaId={idea.id} user={user} />
//           </div>
//           <div className="delete-button-container">
//           <button 
//           className="delete-idea-button"
//           onClick={() => handleDeleteIdeaClick(idea.id)}>X</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Idea;

import { useState, useEffect } from "react";
import Comment from "./Comment";

const Idea = ({ sectionId, user, ideasProp, handleDeleteIdea }) => {
  const [comments, setComments] = useState([]);

  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  const handleDeleteIdeaClick = (ideaId) => {
    handleDeleteIdea(sectionId, ideaId);
  };

  // Filter the ideasProp array to only include ideas that belong to the section
  const filteredIdeas = ideasProp !== null ? ideasProp.filter((idea) => idea.section_id === sectionId) : [];

  return (
    <div className="idea-container">
      {filteredIdeas.map((idea) => (
        <div className="idea-card" key={idea.id}>
          <h5>{idea.name}</h5>
          <h6>{idea.description}</h6>
          {idea.photo_url && 
          <img 
          src={`http://localhost:3000/${idea.photo_url}`} 
          alt="Idea Photo"
          style={{ width: "300px", height: "auto"}}
          
          />}

          <div className="comment-link">
            <Comment ideaId={idea.id} user={user} />
          </div>
          <div className="delete-button-container">
            <button 
              className="delete-idea-button"
              onClick={() => handleDeleteIdeaClick(idea.id)}>X</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Idea;