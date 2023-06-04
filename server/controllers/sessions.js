const express = require("express");
const bcrypt = require("bcrypt");
const { getUserByEmail } = require("../models/user");

const router = express.Router();

router.post("/session", async (req, res, next) => {
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

    // Store the authenticated user in the session
    req.session.user = user;
    
    // Return the user data
    return res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

router.get("/session", (req, res) => {
  const { user } = req.session;
  return res.status(200).json({ user });
});

router.delete("/session", async (req, res) => {
  req.session.destroy(() => {
    return res.status(200).json({
      message: "Logged out",
    });
  });
});

module.exports = router;
