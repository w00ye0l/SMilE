const express = require('express');
const passport = require('passport');
const path = require('path');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { myprofile } = require('../controllers/mypage');

const router = express.Router();

// GET /mypage
router.get('/:id', isLoggedIn, myprofile);

module.exports = router;