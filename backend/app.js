const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const passport = require("passport");
const bodyParser = require("body-parser");
// const cookieSession = require('cookie-session')
const cors = require("cors");

dotenv.config({ path: path.join(__dirname, "/.env") });

const { sequelize } = require("./models");
const app = express();

const passportConfig = require("./passport");
passportConfig(); // 패스포트 설정

// 인증 라우터
const pageRouter = require("./routes/pages");
const authRouter = require("./routes/auth");
const mypageRouter = require("./routes/mypage");
const groupRouter = require("./routes/group");
const guestRouter = require("./routes/guest");
const randomRouter = require("./routes/random");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결");
  })
  .catch((err) => {
    console.error(err);
  });

const port = 3000;

// VARIABLES
app.set("trust proxy", 1);

app.use(
  cors({
    // front 서버인 127.0.0.1:8080 의 요청을 허용하도록 cors 사용
    origin: [process.env.FRONT_URL_1, process.env.FRONT_URL_2],
    // origin: ['http://localhost:8080', 'http://localhost:8081'],
    methods: ["GET", "PUT", "POST", "PATCH", "DELETE", "OPTIONS"],
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.use(morgan("dev")); // log
app.use(express.static(path.join(__dirname, "public"))); // 요청시 기본 경로 설정

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));

const options = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Sequelize로 설정한 MySQL 연결 객체를 사용하여 MySQL 저장소 생성
const sessionStore = new MySQLStore(options, mysql.createConnection(options));

// app.use(cookieSession({
//   maxAge : 1000 * 60 * 60 * 24 * 7,
//   secret: process.env.COOKIE_SECRET, // 암호화 키
//   domain: [process.env.FRONT_URL_1, process.env.FRONT_URL_2],
//   httpOnly: true,
//   secure: true,
//   sameSite: "none",
// }));

// 쿠키 세션 미들웨어 등록
// regenerate & save 오류 현상 해결
// app.use(function(req, res, next) {
//   if (req.session && !req.session.regenerate) {
//       req.session.regenerate = (cb) => {
//           cb()
//       }
//   }
//   if (req.session && !req.session.save) {
//       req.session.save = (cb) => {
//           cb()
//       }
//   }
//   next()
// })

app.use(
  session({
    resave: false, // 세션 항상 저장할지
    saveUninitialized: true, // 세션 저장 전 Uninitialized 상태로 만들어 저장
    secret: process.env.COOKIE_SECRET, // 암호화 키
    store: sessionStore, // Sequelize로 설정한 MySQL 저장소를 사용
    cookie: {
      domain: 'smile-mbti.shop',
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  })
);

app.use(passport.initialize()); //요청 (req 객체) 에 passport 설정
app.use(passport.session()); // req.session 객체에 passport 인증 완료 정보를 저장

// 경로 지정
app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/mypage", mypageRouter);
app.use("/group", groupRouter);
app.use("/guest", guestRouter);
app.use("/random", randomRouter);

// 일부러 에러 발생시키기 TEST용
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  // 404 오류인 경우
  if (err.status === 404) {
    res.status(404).send("페이지를 찾을 수 없습니다.");
  } else {
    // 다른 오류일 경우 일반적인 오류 페이지 표시
    res.status(500).send("서버 오류가 발생했습니다.");
  }
});

// 에러 처리 미들웨어
app.use((err, req, res, next) => {
  // 템플릿 변수 설정
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; // 배포용이 아니라면 err설정 아니면 빈 객체

  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
    },
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});