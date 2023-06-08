// const jwt = require('jsonwebtoken');
// const express = require('express');
// const bcrypt = require('bcrypt');
// const { getUserByEmail } = require('../models/user');

// const router = express.Router();

// router.post('/session', async (req, res, next) => {
//   console.log('Reached /session route');
//   try {
//     const { email, password } = req.body;

//     // Check if the user exists in the database
//     const user = await getUserByEmail(email);
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Compare the provided password with the stored hash
//     const passwordMatch = await bcrypt.compare(password, user.password_hash);
//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     // Create a payload for the JWT token
//     // const payload = {
//     //   id: user.id,
//     //   user_name: user.user_name,
//     //   email: user.email,
//       // Add any additional data you want to include in the token
//     //};

//     // Generate and sign the token
//     //const token = jwt.sign(payload, 'YOUR_SECRET_KEY', { expiresIn: '1h' });

//     // Remove sensitive data from the user object
//     delete user.password_hash;

//     // Return the token in the response
//     //res.json({ token });
//     res.json( { user })
//   } catch (err) {
//     console.log('Error in /session route:', err);
//     next(err);
//   }
// });

// router.get('/session', (req, res, next) => {
//   console.log('Request Headers:', req.headers);
//   const { user } = req.session;
//   if (!user) {
//     return res.status(401).json({ message: 'Not logged in' });
//   }
//   res.json(user);
// });

// router.delete('/session', (req, res, next) => {
//   req.session.destroy();
//   res.json({ message: 'Logged out successfully' });
// });

// module.exports = router;

const express = require('express');
const bcrypt = require('bcrypt');
const { getUserByEmail } = require('../models/user');

const router = express.Router();

router.post('/session', async (req, res, next) => {
  console.log('Reached /session route');
  try {
    const { email, password } = req.body;

    // Check if the user exists in the database
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare the provided password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Remove sensitive data from the user object
    delete user.password_hash;

    // Store the user object in the session
    req.session.user = user;

    // Return the user object in the response
    res.json({ user });
  } catch (err) {
    console.log('Error in /session route:', err);
    next(err);
  }
});

router.get('/session', (req, res, next) => {
  console.log('Request Headers:', req.headers);
  const { user } = req.session;
  if (!user) {
    return res.status(401).json({ message: 'Not logged in' });
  }
  res.json(user);
});

router.delete('/session', (req, res, next) => {
  req.session.destroy();
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
