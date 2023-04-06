const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { signup, login } = require('../controllers/auth');

const router = express.Router();

// POST /auth/signup
router.post('/signup', isNotLoggedIn, signup);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

module.exports = router;