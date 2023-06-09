const db = require("./index");

const getTripSectionsByTripId = async (tripId) => {
  const query = "SELECT * FROM sections WHERE trip_id = $1";
  const { rows } = await db.query(query, [tripId]);
  return rows;
};

const createTripSection = async (section) => {
  const { trip_id, section_name } = section;
  const query =
    "INSERT INTO sections (trip_id, name) VALUES ($1, $2) RETURNING *";
  const values = [trip_id, section_name];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const updateTripSectionById = async (sectionId, sectionUpdates) => {
  const { section_name } = sectionUpdates;
  const query = "UPDATE sections SET name = $2 WHERE id = $1 RETURNING *";
  const values = [sectionId, section_name];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const deleteTripSectionById = async (sectionId) => {
  const query = "DELETE FROM sections WHERE id = $1";
  await db.query(query, [sectionId]);
};

module.exports = {
  getTripSectionsByTripId,
  createTripSection,
  updateTripSectionById,
  deleteTripSectionById,
};
