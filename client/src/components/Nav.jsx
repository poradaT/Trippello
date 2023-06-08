import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider.jsx";
import { useParams } from "react-router-dom";

const Nav = ({ user, handleNewTrip }) => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/trips/${tripId}`);
        if (!res.ok) {
          throw new Error("Failed to fetch trip");
        }
        const data = await res.json();
        setTrip(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTrip();
  }, [tripId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <nav className="navbar">
      {trip && (
        <div className="trip-details">
          <h1 className="trip-name">{trip.name}</h1>
          <div className="date-range">
            <span className="date-label">From:</span>{" "}
            <span className="date-value">
              {new Date(trip.start_date).toLocaleDateString()}
            </span>
            <span className="date-label">To:</span>{" "}
            <span className="date-value">
              {new Date(trip.end_date).toLocaleDateString()}
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
