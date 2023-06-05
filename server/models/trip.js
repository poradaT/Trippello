const db = require("./index");

// const getAllTrips = async () => {
//   const query = "SELECT * FROM trips";
//   const { rows } = await db.query(query);
//   return rows;
// };

const getAllTrips = async (userId) => {
    const query = `
      SELECT trips.* 
      FROM trips 
      INNER JOIN trip_members ON trip_members.trip_id = trips.id 
      WHERE trip_members.user_id = $1
    `;
    const values = [userId];
    const { rows } = await db.query(query, values);
    return rows;
  };
  
// const getTripById = async (tripId) => {
//   const query = "SELECT * FROM trips WHERE id = $1";
//   const { rows } = await db.query(query, [tripId]);
//   return rows[0];
// };

const getTripById = async (tripId, userId) => {
    const query = `
      SELECT trips.* 
      FROM trips 
      INNER JOIN trip_members ON trip_members.trip_id = trips.id 
      WHERE trip_members.user_id = $1 AND trips.id = $2
    `;
    const values = [userId, tripId];
    const { rows } = await db.query(query, values);
    return rows[0];
  };

const createTrip = async (trip) => {
    const { user_id, name, start_date, end_date, is_public, is_active } = trip;
    const query =
      "INSERT INTO trips (user_id, name, start_date, end_date, is_public, is_active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [user_id, name, start_date, end_date, is_public, is_active];
    const { rows } = await db.query(query, values);
    return rows[0];
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
