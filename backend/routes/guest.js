const express = require("express");
const {
  index,
  read,
  create,
  update,
  deleteImage,
  updateImage,
  remove,
} = require("../controllers/guest");

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

// DELETE /guest/image/:guestId/delete
router.delete("/image/:id/delete", isLoggedIn, deleteImage);

// POST /guest/image/:guestId
router.post("/image/:id", isLoggedIn, guestUpload.single("image"), updateImage);

// DELETE /guest/delete/:guestid
router.delete("/remove/:id", isLoggedIn, remove);

module.exports = router;
