import { useState } from "react";

const AddIdea = ({ sectionId, onNewIdea, user }) => {
  const [ideaName, setIdeaName] = useState("");
  const [ideaDescription, setIdeaDescription] = useState("");
  const [ideaPhoto, setIdeaPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const formData = new FormData();
      formData.append("section_id", sectionId);
      formData.append("name", ideaName);
      formData.append("description", ideaDescription);
      formData.append("photo", ideaPhoto);

    const res = await fetch("/api/ideas", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const newIdea = await res.json();
        onNewIdea(sectionId, newIdea); // Pass the sectionId along with the newIdea
        setIdeaName("");
        setIdeaDescription("");
        setIdeaPhoto(null);
      } else {
        throw new Error("Failed to create idea");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhotoChange = (e) => {
    setIdeaPhoto(e.target.files[0]);
  };

  return (
    <div className="add-idea-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
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
        <input type="file" name="photo" onChange={handlePhotoChange} />
        <button type="submit" className="add-button">
          Add New Idea
        </button>
      </form>
    </div>
  );
};

export default AddIdea;
