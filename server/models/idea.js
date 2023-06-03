const db = require("./index");

const getAllIdeas = async () => {
  const query = "SELECT * FROM ideas";
  const { rows } = await db.query(query);
  return rows;
};

const getIdeasByTripIdAndSectionId = async (tripId, sectionId) => {
  const query = "SELECT * FROM ideas WHERE trip_id = $1 AND section_id = $2";
  const values = [tripId, sectionId];
  const { rows } = await db.query(query, values);
  return rows;
};

const createIdea = async (idea) => {
  const { trip_id, section_id, name, description, image_data } = idea;
  const query =
    "INSERT INTO ideas (trip_id, section_id, name, description, image_data) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [trip_id, section_id, name, description, image_data];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const updateIdeaById = async (ideaId, ideaUpdates) => {
  const { name, description, image_data } = ideaUpdates;
  const query =
    "UPDATE ideas SET name = $2, description = $3, image_data = $4 WHERE id = $1 RETURNING *";
  const values = [ideaId, name, description, image_data];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const deleteIdeaById = async (ideaId) => {
  const query = "DELETE FROM ideas WHERE id = $1";
  await db.query(query, [ideaId]);
};

module.exports = {
  getAllIdeas,
  getIdeasByTripIdAndSectionId,
  createIdea,
  updateIdeaById,
  deleteIdeaById,
};
