const express = require("express");

const { upload } = require("../middlewares/upload");
const { isLoggedIn } = require("../middlewares");
const {
  myProfile,
  updateProfile,
  deleteImage,
  updateImage,
  editPW,
} = require("../controllers/mypage");

const router = express.Router();

// GET /mypage
router.get("/", isLoggedIn, myProfile);

// DELETE /mypage/image/:userId/delete
router.delete("/image/:id/delete", isLoggedIn, deleteImage);

// POST /mypage/image/:userId
router.post("/image/:id", isLoggedIn, upload.single("image"), updateImage);

// PUT /mypage/update
router.put("/update", isLoggedIn, upload.single("image"), updateProfile);

// PUT /mypage/editpw
router.put("/editpw", isLoggedIn, editPW);

module.exports = router;
