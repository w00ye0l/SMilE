const express = require('express');
const passport = require('passport');
const path = require('path');
const { upload } = require('../middlewares/upload');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { signup, login, logout, remove } = require('../controllers/auth');

const router = express.Router();

// POST /auth/signup
router.post('/signup', upload.single('image'), signup);

// POST /auth/login
router.post('/login', isNotLoggedIn, login);

// GET /auth/logout
router.get('/logout', isLoggedIn, logout);

// DELETE /auth/delete
router.delete('/remove/:id', isLoggedIn, remove)

module.exports = router;