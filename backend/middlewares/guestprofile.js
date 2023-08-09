const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
require('dotenv').config();

const s3 = new aws.S3({
  accessKeyId: process.env.S3_KEYID, // keyID 입력 
  secretAccessKey: process.env.S3_PRIVATE_KEY, // 시크릿 키 입력
  region: process.env.REGION, // 버킷 생성 리전 입력
});

const guestprofile = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME, // 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read-write',
    key: (req, file, cb) => {
      file.originalname = Buffer.from(file.originalname, 'latin1').toString('utf8')
      console.log("file", file);
      cb(null, `guestProfileImg/${Date.now()}_${file.originalname}`);
    },
  }),
  // 용량 제한
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.guestprofile = multer(guestprofile);