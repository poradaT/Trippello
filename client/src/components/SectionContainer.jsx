// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import Idea from "./Idea";
// import AddSection from "./AddSection";
// import AddIdea from "./AddIdea";

// const SectionContainer = ({ user, handleNewTrip }) => {
//   const { tripId } = useParams();
//   const [trip, setTrip] = useState(null);
//   const [sections, setSections] = useState([]);
//   const [error, setError] = useState(null);
//   const [sectionIdCounter, setSectionIdCounter] = useState(1);

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

//         // Fetch ideas for each section
//         const sectionPromises = data.map(async (section) => {
//           const res = await fetch(`http://localhost:3000/api/sections/${section.id}/ideas`);
//           if (!res.ok) {
//             throw new Error("Failed to fetch ideas for section");
//           }
//           const ideas = await res.json();
//           return { ...section, ideas };
//         });

//         const sectionsWithIdeas = await Promise.all(sectionPromises);
//         setSections(sectionsWithIdeas);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchTrip();
//     fetchSections();
//   }, [tripId]);

//   const handleNewSection = (newSection) => {
//     setSections((prevSections) => [
//       ...prevSections,
//       { ...newSection, ideas: [] },
//     ]);
//     setSectionIdCounter((prevCounter) => prevCounter + 1);
//   };

//   const handleNewIdea = (sectionId, newIdea) => {
//     setSections((prevSections) => {
//       return prevSections.map((section) => {
//         if (section.id === sectionId) {
//           return {
//             ...section,
//             ideas: [newIdea, ...section.ideas],
//           };
//         }
//         return section;
//       });
//     });
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <AddSection tripId={tripId} onNewSection={handleNewSection} user={user} onNewTrip={handleNewTrip} />

//       <div className="section-container">
//         {trip &&
//           Array.isArray(sections) &&
//           sections.map((section) => (
//             <div className="card" key={section.id}>
//               <h4>{section.name}</h4>
//               <AddIdea user={user} sectionId={section.id} onNewIdea={handleNewIdea} />
//               <Idea sectionId={section.id} user={user} ideasProp={section.ideas} />
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default SectionContainer;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Idea from "./Idea";
import AddSection from "./AddSection";
import AddIdea from "./AddIdea";

const SectionContainer = ({ user, handleNewTrip }) => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [sections, setSections] = useState([]);
  const [error, setError] = useState(null);
  const [sectionIdCounter, setSectionIdCounter] = useState(1);

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
        const res = await fetch(`http://localhost:3000/api/trips/${tripId}/sections`);
        if (!res.ok) {
          throw new Error("Failed to fetch sections");
        }
        const data = await res.json();

        // Fetch ideas for each section
        const sectionPromises = data.map(async (section) => {
          const res = await fetch(`http://localhost:3000/api/sections/${section.id}/ideas`);
          if (!res.ok) {
            throw new Error("Failed to fetch ideas for section");
          }
          const ideas = await res.json();
          return { ...section, ideas };
        });

        const sectionsWithIdeas = await Promise.all(sectionPromises);
        setSections(sectionsWithIdeas);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchTrip();
    fetchSections();
  }, [tripId]);

  const handleNewSection = (newSection) => {
    setSections((prevSections) => [
      ...prevSections,
      { ...newSection, ideas: [] },
    ]);
    setSectionIdCounter((prevCounter) => prevCounter + 1);
  };

  const handleNewIdea = (sectionId, newIdea) => {
    setSections((prevSections) => {
      return prevSections.map((section) => {
        if (section.id === sectionId) {
          return {
            ...section,
            ideas: [...section.ideas, newIdea],
          };
        }
        return section;
      });
    });
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <AddSection tripId={tripId} onNewSection={handleNewSection} user={user} onNewTrip={handleNewTrip} />

      <div className="section-container">
        {trip &&
          Array.isArray(sections) &&
          sections.map((section) => (
            <div className="card" key={section.id}>
              <h4>{section.name}</h4>
              <AddIdea user={user} sectionId={section.id} onNewIdea={handleNewIdea} />
              <Idea sectionId={section.id} user={user} ideasProp={section.ideas} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SectionContainer;
