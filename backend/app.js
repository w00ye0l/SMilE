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
// const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const cors = require("cors");

dotenv.config({ path: path.join(__dirname, "/.env") });

const { sequelize } = require("./models");
const app = express();

const passportConfig = require("./passport");
passportConfig(); // 패스포트 설정

// // isLoggedIn, isNotLoggedIn middleware 사용
// app.use(isLoggedIn, isNotLoggedIn);

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
    origin: process.env.FRONT_URL_2,
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

app.use(
  session({
    resave: false, // 세션 항상 저장할지
    saveUninitialized: true, // 세션 저장 전 Uninitialized 상태로 만들어 저장
    secret: process.env.COOKIE_SECRET, // 암호화 키
    store: sessionStore, // Sequelize로 설정한 MySQL 저장소를 사용
    cookie: {
      domain: process.env.FRONT_URL_2,
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
  })
);

app.use(passport.initialize()); //요청 (req 객체) 에 passport 설정
app.use(passport.session()); // req.session 객체에 passport 인증 완료 정보를 저장

// 경로 지정
app.use("/api/", pageRouter);
app.use("/api/auth", authRouter);
app.use("/api/mypage", mypageRouter);
app.use("/api/group", groupRouter);
app.use("/api/guest", guestRouter);
app.use("/api/random", randomRouter);

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
