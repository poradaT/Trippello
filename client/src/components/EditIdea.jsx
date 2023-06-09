import { useState } from "react";

const EditIdea = ({ sectionId, idea, handleCancelEdit, handleIdeaUpdate }) => {
  const [name, setName] = useState(idea.name);
  const [description, setDescription] = useState(idea.description);
  const [photo, setPhoto] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("section_id", sectionId);
      formData.append("name", name);
      formData.append("description", description);
      if (photo) {
        formData.append("photo", photo);
      }

      const res = await fetch(`/api/ideas/${idea.id}`, {
        method: "PUT",
        body: formData,
      });

      if (res.ok) {
        const updatedIdea = await res.json();
        handleIdeaUpdate(sectionId, updatedIdea);
      } else {
        throw new Error("Failed to update idea");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit-idea-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Idea Name"
          required
        />
        <textarea
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Idea Description"
          required
        ></textarea>
        <input type="file" name="photo" onChange={handlePhotoChange} />
        <div className="button-container">
          <button type="submit" className="update-btn">Update</button>
          <button onClick={handleCancelEdit} className="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditIdea;
