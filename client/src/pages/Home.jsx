// import React, { useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthProvider";
// import { Link } from "react-router-dom";

// import AddTrip from "../components/AddTrip";
// import App from "../App";

// const Home = () => {
//   const { user } = useAuth();
//   const [trips, setTrips] = useState([]);

//   useEffect(() => {
//     const fetchTrips = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/trips");
//         const data = await res.json();
//         setTrips(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTrips();
//   }, []);

//   const handleNewTrip = (newTrip) => {
//     const { user_id, name, start_date, end_date, is_public, is_active } = newTrip;

//   // Fetch the user name for the new trip
//   fetch(`http://localhost:3000/api/users/${user_id}`)
//     .then((res) => res.json())
//     .then((userData) => {
//       const tripWithUserName = {
//         ...newTrip,
//         user_name: userData.user_name
//       };
//       setTrips((prevTrips) => [...prevTrips, tripWithUserName]);
//     })
//     .catch((error) => console.error(error));
// };

//   return (
//     <>
//       <h1>Hi {user.user_name}, Let's plan your next trip!</h1>

//       <div className="trip-container">
//         {Array.isArray(trips) ? (
//           trips.map((trip) => (
//             <Link
//               to={`/trips/${trip.id}/sections`}
//               key={trip.id}
//               className="trip-card"
//             >
//               <h3>{trip.name}</h3>
//             <h5>Created by: {trip.user_name}</h5>

//             </Link>
//           ))
//         ) : (
//           <p>Loading trips...</p>
//         )}
//       </div>

//       <App handleNewTrip={handleNewTrip} />
//       <AddTrip onNewTrip={handleNewTrip} user={user} />

//     </>
//   );
// };

// export default Home;
