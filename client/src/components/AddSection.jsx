import { useState } from "react";

const AddSection = ({ tripId, onNewSection, user, handleNewTrip }) => {
  const [sectionName, setSectionName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        trip_id: tripId,
        section_name: sectionName,
      };

      const res = await fetch(`/api/trips/${tripId}/sections`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newSection = await res.json();
        onNewSection(newSection);
        setSectionName("");
      } else {
        throw new Error("Failed to create section");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="add-section-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Section Name"
            value={sectionName}
            onChange={(e) => setSectionName(e.target.value)}
          />
          <button type="submit">Add New Section</button>
        </form>
      </div>
    </>
  );
};

export default AddSection;
