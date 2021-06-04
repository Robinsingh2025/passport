const { response } = require('express');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Login
router.get('/register', (req, res) => res.render('register'));

// User Model import
const User = require('../models/Users');

// Registar Handle, This is happening users/registar

router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Check Required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }
  // Check if the password Matches
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match ' });
  }
  // Check if passwords is longer then 6
  if (password.length < 6) {
    errors.push({ msg: 'Passwords is not long enough ' });
  }
  if (errors.length > 0) {
    res.render('register', { errors, name, email, password, password2 });
  } else {
    // Validation Pass , We will be using the model to send data
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // User Exists then Render error
        errors.push({ msg: 'Email is already Registered' });
        res.render('register', { errors, name, email, password, password2 });
      } else {
        // This is only creating the instance
        const newUser = new User({
          name,
          email,
          password,
        });
        // Generate a Salt to create Hash
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set passowrd to hash
            newUser.password = hash;

            // Save User
            newUser
              .save()
              .then((user) => {
                res.redirect('/login');
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

//33:13 about to add more handling for the user input
module.exports = router;
