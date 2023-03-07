const express = require('express');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('home');
});

router.get('/signup', (req, res) => {
  console.log('signup');
});

router.get('/login', (req, res) => {
  console.log('login');
});

module.exports = router;