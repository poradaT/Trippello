const express = require("express");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../models/user");

const router = express.Router();

router.post("/session", async (req, res, next) => {
  console.log("Reached /session route");
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Remove sensitive data from the user object
    delete user.password_hash;

    // Store the user object in the session
    req.session.user = user;

    // Return the user object in the response
    res.json({ user });
  } catch (err) {
    console.log("Error in /session route:", err);
    next(err);
  }
});

router.get("/session", (req, res, next) => {
  console.log("Request Headers:", req.headers);
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json(user);
});

router.delete("/session", (req, res, next) => {
  req.session.destroy();
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
