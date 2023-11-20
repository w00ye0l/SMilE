const express = require("express");

const { upload } = require("../middlewares/upload");
const { isLoggedIn } = require("../middlewares");
const {
  myProfile,
  deleteImage,
  updateProfile,
  editPW,
} = require("../controllers/mypage");

const router = express.Router();

// GET /mypage
router.get("/", isLoggedIn, myProfile);

// POST /mypage/image
router.post("/image", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({
    url: req.file.location,
  });
});

// DELETE /mypage/image/:userId
router.delete("/image/:id", deleteImage);

// PUT /mypage/update
router.put("/update", isLoggedIn, upload.single("image"), updateProfile);

// PUT /mypage/editpw
router.put("/editpw", isLoggedIn, editPW);

module.exports = router;
