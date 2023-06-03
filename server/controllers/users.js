const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUserById,
  deleteUserById,
} = require("../models/user");

router.get("/users", (req, res, next) => {
  return getAllUsers()
    .then((users) => res.json(users))
    .catch((err) => next(err));
});

router.get("/users/:userId", (req, res, next) => {
  const userId = Number(req.params.userId);
  return getUserById(userId)
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

router.get("/users/email/:email", (req, res, next) => {
  const email = req.params.email;
  getUserByEmail(email)
    .then((user) => {
      return res.status(200).json({ user });
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/users", (req, res, next) => {
  const { user_name, first_name, last_name, email, password_hash } = req.body;
  return createUser({ user_name, first_name, last_name, email, password_hash })
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

router.put("/users/:userId", (req, res, next) => {
  const userId = Number(req.params.userId);
  const { user_name, first_name, last_name, email, password_hash } = req.body;
  const userUpdates = {
    user_name,
    first_name,
    last_name,
    email,
    password_hash,
  };
  return updateUserById(userId, userUpdates)
    .then((user) => res.json(user))
    .catch((err) => next(err));
});

router.delete("/users/:userId", (req, res, next) => {
  const userId = Number(req.params.userId);
  return deleteUserById(userId)
    .then(() => res.json({ message: "User deleted successfully" }))
    .catch((err) => next(err));
});

module.exports = router;
