const express = require('express');
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { signup } = require('../controllers/auth');

const router = express.Router();

// POST /auth/signup
router.post('/signup', isNotLoggedIn, signup);

module.exports = router;