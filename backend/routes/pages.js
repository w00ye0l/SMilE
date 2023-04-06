const express = require('express');
const authController = require('../controllers/auth.js');

const router = express.Router();

// 메인페이지
router.get('/', (req, res) => {
  console.log('home');
});

router.use((req, res, next) => {
  res.locals.user = req.user;
  // res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  // res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  // res.locals.followerIdList = req.user
  //   ? req.user.Followings.map((f) => f.id)
  //   : [];
  next();
});

module.exports = router;