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
        const res = await fetch(
          `http://localhost:3000/api/trips/${tripId}/sections`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch sections");
        }
        const data = await res.json();

        // Fetch ideas for each section
        const sectionPromises = data.map(async (section) => {
          const res = await fetch(
            `http://localhost:3000/api/sections/${section.id}/ideas`
          );
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

  const handleDeleteSection = async (sectionId) => {
    try {
      await fetch(`http://localhost:3000/api/trips/sections/${sectionId}`, {
        method: "DELETE",
      });

      // Remove the section from the client-side state
      setSections((prevSections) =>
        prevSections.filter((section) => section.id !== sectionId)
      );
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteIdea = async (sectionId, ideaId) => {
    try {
      await fetch(`http://localhost:3000/api/ideas/${ideaId}`, {
        method: "DELETE",
      });

      // Remove the deleted idea from the current section
      setSections((prevSections) =>
        prevSections.map((section) => {
          if (section.id === sectionId) {
            return {
              ...section,
              ideas: section.ideas.filter((idea) => idea.id !== ideaId),
            };
          }
          return section;
        })
      );
    } catch (error) {
      setError(error.message);
    }
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

  const handleUpdateIdea = (sectionId, updatedIdea) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.id === sectionId) {
          const updatedIdeas = section.ideas.map((idea) => {
            if (idea.id === updatedIdea.id) {
              return updatedIdea;
            }
            return idea;
          });
          return {
            ...section,
            ideas: updatedIdeas,
          };
        }
        return section;
      })
    );
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!trip || !sections) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <AddSection
        tripId={tripId}
        onNewSection={handleNewSection}
        user={user}
        onNewTrip={handleNewTrip}
      />

      <div className="section-container">
        {trip &&
          Array.isArray(sections) &&
          sections.map((section) => (
            <div className="card" key={section.id}>
              <h4>{section.name}</h4>
              <div className="delete-button-container">
                <button
                  className="delete-section-button"
                  onClick={() => handleDeleteSection(section.id)}
                >
                  𝗫
                </button>
              </div>
              <AddIdea
                user={user}
                sectionId={section.id}
                onNewIdea={handleNewIdea}
              />
              <Idea
                sectionId={section.id}
                user={user}
                ideasProp={section.ideas}
                handleDeleteIdea={handleDeleteIdea}
                handleUpdateIdea={handleUpdateIdea}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default SectionContainer;
