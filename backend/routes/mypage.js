const express = require('express');

const { isLoggedIn } = require('../middlewares');
const { myprofile, changePW } = require('../controllers/mypage');

const router = express.Router();

// GET /mypage
router.get('/', isLoggedIn, myprofile);

// PUT /mypage/edit
router.put('/edit', isLoggedIn, changePW);

module.exports = router;