const express = require("express");
const { index, read, create, update, remove } = require("../controllers/guest");

const { guestUpload } = require("../middlewares/guestprofile");
const { isLoggedIn } = require("../middlewares");

const router = express.Router();

// GET /guest/index
router.get("/index", isLoggedIn, index);

// GET /guest/read/:guestid
router.get("/read/:id", isLoggedIn, read);

// POST /guest/:groupid/create
router.post("/:id/create", guestUpload.single("image"), isLoggedIn, create);

// PUT /guest/update/:guestid
router.put("/update/:id", isLoggedIn, update);

// DELETE /guest/delete/:guestid
router.delete("/remove/:id", isLoggedIn, remove);

module.exports = router;
