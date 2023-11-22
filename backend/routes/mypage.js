const express = require("express");

const { upload } = require("../middlewares/upload");
const { isLoggedIn } = require("../middlewares");
const {
  myProfile,
  deleteImage,
  updateImage,
  updateProfile,
  editPW,
} = require("../controllers/mypage");

const router = express.Router();

// GET /mypage
router.get("/", isLoggedIn, myProfile);

// POST /mypage/image/:userId
router.post("/image/:id", upload.single("image"), updateImage);

// DELETE /mypage/image/:userId/delete
router.delete("/image/:id/delete", deleteImage);

// PUT /mypage/update
router.put("/update", isLoggedIn, upload.single("image"), updateProfile);

// PUT /mypage/editpw
router.put("/editpw", isLoggedIn, editPW);

module.exports = router;
