const express = require('express');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('home');
});

router.get('/signup', (req, res) => {
  console.log('signup');
});

module.exports = router;