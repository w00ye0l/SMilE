const express = require('express');
const { index, question, mbtiIndex } = require('../controllers/random');
const { answerCreate, answerRead, answerUpdate, answerRemove } = require('../controllers/answer');
const { commentIndex, commentCreate, commentRead, commentUpdate, commentRemove } = require('../controllers/comment');

const { isLoggedIn } = require('../middlewares');

const router = express.Router();

// 질문

// GET /random/question
// 오늘의 질문 조회
router.get('/question', isLoggedIn, question);

// GET /random/:questionid 
// 질문 한 개당 답변 전체 조회
router.get('/index/:id', isLoggedIn, index);

// GET /random/:questionid/i___
// MBTI별 질문 조회
router.get('/:id/:mbti1:mbti2:mbti3:mbti4', isLoggedIn, mbtiIndex);

// 답변

// POST /random/answer/:questionid/create
// 답변 생성 create
router.post('/answer/:id/create', isLoggedIn, answerCreate);

// GET /random/answer/:questionid/create
// 답변 상세 조회
router.get('/answer/read/:id', isLoggedIn, answerRead);

// PUT /random/answer/update/:answerid
// 답변 수정
router.put('/answer/update/:id', isLoggedIn, answerUpdate);

// DELETE /random/answer/remove/:answerid
// 답변 삭제
router.delete('/answer/remove/:id', isLoggedIn, answerRemove);

// 댓글

// POST /random/comment/:answerid/create
// 댓글 생성
router.post('/comment/:id/create', isLoggedIn, commentCreate);

// GET /random/comment/read/:answerid
// 댓글 답변별 조회
router.get('/comment/read/:id', isLoggedIn, commentRead);

// GET /random/comment/index
// 댓글 전체 조회
router.get('/comment', isLoggedIn, commentIndex);

// PUT /random/comment/read/update/:commentid
// 댓글 수정
router.put('/comment/update/:id', isLoggedIn, commentUpdate);

// DELETE /random/comment/read/remove/:commentid
// 댓글 삭제
router.delete('/comment/remove/:id', isLoggedIn, commentRemove);

module.exports = router;