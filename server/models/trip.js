const db = require("./index");

const getAllTrips = async () => {
  const query =
    "SELECT trips.*, users.user_name FROM trips INNER JOIN users ON trips.user_id = users.id";
  const { rows } = await db.query(query);
  return rows;
};

const getTripById = async (tripId) => {
  const query = "SELECT * FROM trips WHERE id = $1";
  const { rows } = await db.query(query, [tripId]);
  return rows[0];
};

const createTrip = async (trip) => {
  const { user_id, name, start_date, end_date, is_public, is_active } = trip;
  const insertQuery = `
      INSERT INTO trips (user_id, name, start_date, end_date, is_public, is_active)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;
  const selectQuery = `
      SELECT trips.*, users.user_name
      FROM trips
      JOIN users ON trips.user_id = users.id
      WHERE trips.id = $1;
    `;
  const insertValues = [
    user_id,
    name,
    start_date,
    end_date,
    is_public,
    is_active,
  ];

  try {
    const { rows } = await db.query(insertQuery, insertValues);
    const tripId = rows[0].id;
    const { rows: selectedRows } = await db.query(selectQuery, [tripId]);
    return selectedRows[0];
  } catch (error) {
    throw new Error("Failed to create trip");
  }
};

const updateTripById = async (tripId, tripUpdates) => {
  const { name, start_date, end_date, is_public, is_active } = tripUpdates;
  const query =
    "UPDATE trips SET name = $2, start_date = $3, end_date = $4, is_public = $5, is_active = $6 WHERE id = $1 RETURNING *";
  const values = [tripId, name, start_date, end_date, is_public, is_active];
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
