const express = require('express');
const { index, question, mbtiIndex } = require('../controllers/random')

const { isLoggedIn } = require('../middlewares');

const router = express.Router();

// GET /random/question
// 오늘의 질문
router.get('/question', isLoggedIn, question);

// GET /random/:questionid 
// 질문 한 개당 답변 전체 조회
router.get('/index/:id', isLoggedIn, index);

// GET /random/:questionid/mbti?mbti1=I&mbti2=T
// MBTI별 질문 조회
router.get('/:id/mbti', isLoggedIn, mbtiIndex);

module.exports = router;