const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
dotenv.config();

// aws region 및 자격증명 설정
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const guestUpload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "smile-img",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read-write",
    key: (req, file, cb) => {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      console.log("file", file);
      cb(null, `guestimg/${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  // 오류 처리
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("잘못된 파일 유형입니다."));
    }
  },
  // 용량 제한
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.guestUpload = guestUpload;
