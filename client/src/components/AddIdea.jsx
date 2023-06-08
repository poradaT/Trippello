import { useState } from "react";

const AddIdea = ({ sectionId, onNewIdea, user }) => {
  const [ideaName, setIdeaName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        section_id: sectionId,
        name: ideaName,
        description: ideaDescription,
      };

      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newIdea = await res.json();
        onNewIdea(sectionId, newIdea); // Pass the sectionId along with the newIdea
        setIdeaName("");
        setIdeaDescription("");
      } else {
        throw new Error("Failed to create idea");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="add-idea-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Idea"
          value={ideaName}
          onChange={(e) => setIdeaName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={ideaDescription}
          onChange={(e) => setIdeaDescription(e.target.value)}
        ></textarea>
        <button type="submit" className="add-button">
          Add New Idea
        </button>
      </form>
    </div>
  );
};

export default AddIdea;
