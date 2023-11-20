const express = require("express");
const { upload } = require("../middlewares/upload");

const { isLoggedIn, isNotLoggedIn } = require("../middlewares");
const { signup, login, logout, remove } = require("../controllers/auth");

const router = express.Router();

// 이미지 업로드 테스트용 라우터
// POST /auth/image
router.post("/image", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.json({
    url: req.file.location,
  });
});

// POST /auth/signup
router.post("/signup", isNotLoggedIn, upload.single("image"), signup);

// POST /auth/login
router.post("/login", isNotLoggedIn, login);

// GET /auth/logout
router.get("/logout", isLoggedIn, logout);

// DELETE /auth/delete
router.delete("/remove/:id", isLoggedIn, remove);

module.exports = router;
