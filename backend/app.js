const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');

const cors = require('cors');

dotenv.config({ path: './.env'});

const { sequelize } = require('./models');
const passportConfig = require('./passport');

// 인증 라우터
const authRouter = require('./routes/auth');

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결됨.');
  }).catch((err) => {
    console.error(err);
  });

const app = express();
passportConfig(); // 패스포트 설정

const port = 3000;

app.use(cors({  // front 서버인 127.0.0.1:8080 의 요청을 허용하도록 cors 사용
    origin: 'http://localhost:8080',
    credentials:true,
}));

// 이미지
// const publicDirectory = path.join(__dirname, './public');
// // console.log(__dirname)
// app.use(express.static(publicDirectory));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));

// parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cookieParser());

app.use(morgan('dev')); // log
app.use(express.static(path.join(__dirname, 'public'))); // 요청시 기본 경로 설정
app.use(express.json()); // json 파싱
app.use(express.urlencoded({ extended: false })); // url 파싱

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize()); //요청 (req 객체) 에 passport 설정
app.use(passport.session()); // req.session 객체에 passport 인증 완료 정보를 저장

// 경로 지정
app.use('/', require('./routes/pages'));
app.use('/auth', authRouter);

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
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; // 배포용이 아니라면 err설정 아니면 빈 객체

  res.status(err.status || 500);
  res.render('error'); // 템플릿 엔진을 렌더링 하여 응답
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});

