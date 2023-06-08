import React, { useState, useEffect } from "react";
import { useAuth } from "./contexts/AuthProvider";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import AddTrip from "./components/AddTrip";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoutes from "./components/PrivateRoutes";
import Trip from "./components/Trip";

import "./App.css";

function App() {
  const { user, logout } = useAuth();
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
        try {
          await logout();
          navigate("/login");
        } catch (err) {
          console.error(err);
        }
      };

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

  const handleNewTrip = (newTrip) => {
    const { user_id, name, start_date, end_date, is_public, is_active } = newTrip;
  
    // Fetch the user name for the new trip
    fetch(`http://localhost:3000/api/users/${user_id}`)
      .then((res) => res.json())
      .then((userData) => {
        const { id } = newTrip;
        const tripWithUserName = {
          ...newTrip,
          user_name: userData.user_name,
          trip_id: id // Include trip ID in the object
        };
        setTrips((prevTrips) => [...prevTrips, tripWithUserName]);
      })
      .catch((error) => console.error(error));
  };


  return (
    <>
      <nav>
        <ul>
          <li style={{ position: "absolute", top: 25, left: 50 }}>
            <h1>Trippello</h1>
          </li>
          {user ? (
            <>
              <li>
                <Link to="/">My Trips</Link>
              </li>
              <br />
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <br />
              <li>
                <Link to="/register">Register</Link>
              </li>
              <br />
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoutes redirectTo="/login" />}>
          <Route
            path="*"
            element={
              <>
                {user ? (
                <h1>Hi {user?.user_name || user?.user_name}, Let's plan your next trip!</h1>
              ) : (
                <h1>Hi {user?.user_name}, Let's plan your next trip!</h1>
              )}

                <div className="trip-container">
                  {Array.isArray(trips) ? (
                    trips.map((trip) => (
                      <Link
                        to={`/trips/${trip.id}/sections`}
                        key={trip.id}
                        className="trip-card"
                      >
                        <h3>{trip.name}</h3>
                        <h5>Created by: {trip.user_name}</h5>
                      </Link>
                    ))
                  ) : (
                    <p>Loading trips...</p>
                  )}
                </div>

                <AddTrip onNewTrip={handleNewTrip} user={user} />
              </>
            }
          />
          <Route
            path="/trips/:tripId/sections"
            element={<Trip user={user} handleNewTrip={handleNewTrip} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;


