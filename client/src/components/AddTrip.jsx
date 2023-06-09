import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTrip = ({ user, onNewTrip }) => {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    user_id: user.id,
    name: "",
    start_date: "",
    end_date: "",
    is_public: true,
    is_active: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trip),
      });

      if (!res.ok) {
        throw new Error("Failed to add trip");
      }

      const newTrip = await res.json();
      const tripWithUserName = {
        ...newTrip,
        user_name: user.user_name,
        trip_id: newTrip.id,
      };

      setTrip({
        user_id: user.id,
        name: "",
        start_date: "",
        end_date: "",
        is_public: false,
        is_active: false,
      });

      navigate("/");
      onNewTrip(tripWithUserName);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setTrip((prevTrip) => ({
      ...prevTrip,
      [name]: newValue,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="add-trip-form">
        <h2>Add a New Trip</h2>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={trip.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            name="start_date"
            value={trip.start_date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            name="end_date"
            value={trip.end_date}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Trip</button>
      </form>
    </>
  );
};

export default AddTrip;
