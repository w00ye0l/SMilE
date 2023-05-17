const express = require('express');
const { index, read, create, update, remove } = require('../controllers/guest')

const { isLoggedIn, isNotLoggedIn } = require('../middlewares');

const router = express.Router();

// GET /group/index
router.get('/index', isLoggedIn, index);

// GET /group/read
router.get('/read/:id', isLoggedIn, read);

// POST /group/create
router.post('/create', isLoggedIn, create)

// PUT /group/update/:id
router.put('/update/:id', isLoggedIn, update)

// DELETE /group/delete/:id
router.delete('/remove/:id', isLoggedIn, remove)

module.exports = router;