const db = require("./index");


const getAllIdeas = async () => {
  const query = "SELECT * FROM ideas";
  const { rows } = await db.query(query);
  return rows;
};

const getIdeasBySectionId = async (sectionId) => {
  const query = "SELECT * FROM ideas WHERE section_id = $1";
  const values = [sectionId];
  const { rows } = await db.query(query, values);
  return rows;
};

const createIdea = async (idea) => {
    const { section_id, name, description, photo } = idea;
    const photoUrl = photo ? photo.path : null;
    const query =
      "INSERT INTO ideas (section_id, name, description, photo_url) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [section_id, name, description, photoUrl];
    const { rows } = await db.query(query, values);
    return rows[0];
  };

const updateIdeaById = async (ideaId, ideaUpdates) => {
  const { name, description } = ideaUpdates;
  const query =
    "UPDATE ideas SET name = $2, description = $3 WHERE id = $1 RETURNING *";
  const values = [ideaId, name, description];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const deleteIdeaById = async (ideaId) => {
    const query = "DELETE FROM ideas WHERE id = $1";
    await db.query(query, [ideaId]);
  };

module.exports = {
  getAllIdeas,
  getIdeasBySectionId,
  createIdea,
  updateIdeaById,
  deleteIdeaById,
};
