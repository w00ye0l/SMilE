const express = require('express');
const { index, question, mbtiIndex } = require('../controllers/random');
const { answerCreate, answerRead, answerUpdate, answerRemove } = require('../controllers/answer');

const { isLoggedIn } = require('../middlewares');

const router = express.Router();

// 질문

// GET /random/question
// 오늘의 질문 조회
router.get('/question', isLoggedIn, question);

// GET /random/:questionid 
// 질문 한 개당 답변 전체 조회
router.get('/index/:id', isLoggedIn, index);

// GET /random/:questionid/mbti?mbti1=I&mbti2=T
// MBTI별 질문 조회
router.get('/:id/mbti', isLoggedIn, mbtiIndex);

// 답변

// POST /answer/:questionid/create
// 답변 생성 create
router.post('/answer/:id/create', isLoggedIn, answerCreate);

// GET /answer/read/:answerid
// 답변 상세 조회
router.get('/answer/read/:id', isLoggedIn, answerRead);

// PUT /answer/update/:answerid
// 답변 수정
router.put('/answer/update/:id', isLoggedIn, answerUpdate);

// DELETE /answer/remove/:answerid
// 답변 삭제
router.delete('/answer/remove/:id', isLoggedIn, answerRemove);

module.exports = router;