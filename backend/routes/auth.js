const express = require('express');
const authController = require('../controllers/auth.js')

const router = express.Router();

// 회원가입
router.post('/signup', authController.signup );

// 로그인
router.post('/login', authController.login );

module.exports = router;