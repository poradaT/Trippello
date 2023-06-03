const db = require("./index");

const getAllTripSections = async () => {
  const query = "SELECT * FROM trip_sections";
  const { rows } = await db.query(query);
  return rows;
};

const getTripSectionsByTripId = async (tripId) => {
  const query = "SELECT * FROM trip_sections WHERE trip_id = $1";
  const { rows } = await db.query(query, [tripId]);
  return rows;
};

const createTripSection = async (tripSection) => {
  const { trip_id, section_name } = tripSection;
  const query =
    "INSERT INTO trip_sections (trip_id, section_name) VALUES ($1, $2) RETURNING *";
  const values = [trip_id, section_name];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const updateTripSectionById = async (sectionId, sectionUpdates) => {
  const { section_name } = sectionUpdates;
  const query =
    "UPDATE trip_sections SET section_name = $2 WHERE id = $1 RETURNING *";
  const values = [sectionId, section_name];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const deleteTripSectionById = async (sectionId) => {
  const query = "DELETE FROM trip_sections WHERE id = $1";
  await db.query(query, [sectionId]);
};

module.exports = {
  getAllTripSections,
  getTripSectionsByTripId,
  createTripSection,
  updateTripSectionById,
  deleteTripSectionById,
};
