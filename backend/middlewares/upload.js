const multer = require("multer");
const path = require("path");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
dotenv.config();

// upload 테스트용 코드
// const upload = multer({
//   dest: "uploads/", // 테스트를 위한 로컬 폴더 사용
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype.startsWith("image/")) {
//       cb(null, true);
//     } else {
//       cb(new Error("잘못된 파일 유형입니다."));
//     }
//   },
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// aws region 및 자격증명 설정
AWS.config.update({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: "smile-img", // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read-write",
    key: (req, file, cb) => {
      file.originalname = Buffer.from(file.originalname, "latin1").toString(
        "utf8"
      );
      cb(null, `profileimg/${Date.now()}_${path.basename(file.originalname)}`);
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
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.upload = upload;
