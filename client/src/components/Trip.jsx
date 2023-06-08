// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import Nav from "./Nav";
// import SectionContainer from "./SectionContainer";

// const Trip = ({ user, handleNewTrip }) => {
//   console.log(handleNewTrip)
//   const { tripId } = useParams();
//   const [trip, setTrip] = useState(null);
//   const [sections, setSections] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchTrip = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/api/trips/${tripId}`);
//         if (!res.ok) {
//           throw new Error("Failed to fetch trip");
//         }
//         const data = await res.json();
//         setTrip(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     const fetchSections = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/api/trips/${tripId}/sections`);
//         if (!res.ok) {
//           throw new Error("Failed to fetch sections");
//         }
//         const data = await res.json();
//         setSections(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchTrip();
//     fetchSections();
//   }, [tripId]);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <Nav user={user} tripId={tripId} onNewTrip={handleNewTrip} />
//       <SectionContainer user={user} tripId={tripId} onNewTrip={handleNewTrip}/>

//     </>
//   );
// };

// export default Trip;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Nav from "./Nav";
import SectionContainer from "./SectionContainer";

const Trip = ({ user, handleNewTrip }) => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [sections, setSections] = useState([]);
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

    const fetchSections = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/trips/${tripId}/sections`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch sections");
        }
        const data = await res.json();
        setSections(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTrip();
    fetchSections();
  }, [tripId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <Nav user={user} tripId={tripId} onNewTrip={handleNewTrip} />
      <SectionContainer user={user} tripId={tripId} onNewTrip={handleNewTrip} />
    </>
  );
};

export default Trip;

