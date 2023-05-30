const express = require('express');
const { index, read, question, answer, update, remove } = require('../controllers/random')

const { isLoggedIn } = require('../middlewares');

const router = express.Router();

// GET /random/:questionid
router.get('/index/:id', isLoggedIn, index);

// GET /random/read/:id
router.get('/read/:id', isLoggedIn, read);

// GET /random/question
router.get('/question', isLoggedIn, question);

// POST /random/answer
router.post('/answer/:id', isLoggedIn, answer)

// PUT /random/update/:id
router.put('/update/:id', isLoggedIn, update)

// DELETE /random/remove/:id
router.delete('/remove/:id', isLoggedIn, remove)

module.exports = router;