const db = require("./index");

const getAllUsers = async () => {
  const query = "SELECT * FROM users";
  const { rows } = await db.query(query);
  return rows;
};

const getUserByEmail = async (email) => {
  const query = "SELECT * FROM users WHERE email = $1";
  const { rows } = await db.query(query, [email]);
  return rows[0];
};

const getUserById = async (userId) => {
  const query = "SELECT * FROM users WHERE id = $1";
  const { rows } = await db.query(query, [userId]);
  return rows[0];
};

const createUser = async (user) => {
  const { user_name, first_name, last_name, email, password_hash } = user;
  const query =
    "INSERT INTO users (user_name, first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4, $5) RETURNING *";
  const values = [user_name, first_name, last_name, email, password_hash];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const updateUserById = async (userId, userUpdates) => {
  const { user_name, first_name, last_name, email, password_hash } =
    userUpdates;
  const query =
    "UPDATE users SET user_name = $2, first_name = $3, last_name = $4, email = $5, password_hash = $6 WHERE id = $1 RETURNING *";
  const values = [
    userId,
    user_name,
    first_name,
    last_name,
    email,
    password_hash,
  ];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const deleteUserById = async (userId) => {
  const query = "DELETE FROM users WHERE id = $1";
  await db.query(query, [userId]);
};

module.exports = {
  getAllUsers,
  getUserByEmail,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
};
