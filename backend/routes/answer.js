const express = require('express');
const { create, read, update, remove } = require('../controllers/answer')

const { isLoggedIn } = require('../middlewares');

const router = express.Router();

// POST /answer/:questionid/create
// 답변 생성 create
router.post('/:id/create', isLoggedIn, create);

// GET /answer/read/:answerid
// 답변 상세 조회
router.get('/read/:id', isLoggedIn, read);

// PUT /answer/update/:answerid
// 답변 수정
router.put('/update/:id', isLoggedIn, update);

// DELETE /answer/remove/:answerid
// 답변 삭제
router.delete('/remove/:id', isLoggedIn, remove);

module.exports = router;