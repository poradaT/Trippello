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

router.get("/users", async (req, res, next) => {
    try {
      const users = await getAllUsers();
      res.json(users);
    } catch (err) {
      next(err);
    }
  });

  router.get("/users/:userId", async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const user = await getUserById(userId);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

router.get("/users/email/:email", async (req, res, next) => {
    try {
      const email = req.params.email;
      const user = await getUserByEmail(email);
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  });

  const generateHash = require("../utils/passwordUtils");
  router.post("/users", async (req, res, next) => {
    try {
      const { user_name, email, password } = req.body;
      const password_hash = generateHash(password);
      const user = await createUser({ user_name, email, password_hash });
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  router.put("/users/:userId", async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const { user_name, email, password } = req.body;
      const password_hash = generateHash(password);
      const userUpdates = {
        user_name,
        email,
        password_hash,
      };
      const user = await updateUserById(userId, userUpdates);
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/users/:userId", async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      await deleteUserById(userId);
      res.json({ message: "User deleted successfully" });
    } catch (err) {
      next(err);
    }
  });

module.exports = router;
