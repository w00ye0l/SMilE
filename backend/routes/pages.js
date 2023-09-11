const express = require('express');

const router = express.Router();

// 메인페이지
router.get('/', (req, res) => {
  res.send('hello home')
  console.log('home');
});

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

module.exports = router;