import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthProvider.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/trips");
        const data = await res.json();
        setTrips(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTrips();
  }, []);

  return (
    <div>
      <h1>Welcome {user?.user_name}</h1>
      {trips.map((trip) => (
        <Link to={`/trips/${trip.id}/sections`} key={trip.id}>
          <h3>{trip.name}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Home;
