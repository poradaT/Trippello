const db = require("./index");

const getAllTrips = async () => {
  const query = "SELECT * FROM trips";
  const { rows } = await db.query(query);
  return rows;
};

const getTripById = async (tripId) => {
  const query = "SELECT * FROM trips WHERE id = $1";
  const { rows } = await db.query(query, [tripId]);
  return rows[0];
};

const createTrip = async (trip) => {
  const { user_id, name, start_date, end_date } = trip;
  const query =
    "INSERT INTO trips (user_id, name, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [user_id, name, start_date, end_date];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const updateTripById = async (tripId, tripUpdates) => {
  const { name, start_date, end_date } = tripUpdates;
  const query =
    "UPDATE trips SET name = $2, start_date = $3, end_date = $4 WHERE id = $1 RETURNING *";
  const values = [tripId, name, start_date, end_date];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const deleteTripById = async (tripId) => {
  const query = "DELETE FROM trips WHERE id = $1";
  await db.query(query, [tripId]);
};

module.exports = {
  getAllTrips,
  getTripById,
  createTrip,
  updateTripById,
  deleteTripById,
};
