const express = require('express');

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const { myprofile } = require('../controllers/mypage');

const router = express.Router();

// GET /mypage
router.get('/', isLoggedIn, myprofile);

module.exports = router;