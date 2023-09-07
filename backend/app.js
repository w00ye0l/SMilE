const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const morgan = require("morgan");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

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

app.use(
  cors({
    // front 서버인 127.0.0.1:8080 의 요청을 허용하도록 cors 사용
    origin: [process.env.FRONT_URL_1, process.env.FRONT_URL_2],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

app.use(morgan("dev")); // log
app.use(express.static(path.join(__dirname, "public"))); // 요청시 기본 경로 설정

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false, // 세션 항상 저장할지
    saveUninitialized: false, // 세션 저장 전 Uninitialized 상태로 만들어 저장
    secret: process.env.COOKIE_SECRET, // 암호화 키
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
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
