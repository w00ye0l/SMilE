const express = require('express');
const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { promisify } = require('util');

// // Database
// const db = mysql.createConnection({ // 모듈과 관련된 객체를 넣음
//   host: process.env.DB_HOST, // db서버가 어떤 곳에 있느냐
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT,
// });

// db.connect( (error) => {
//   if(error) {
//     console.log(error);
//   } else {
//     console.log("MySQL Connected, controllers");
//   }
// });

const User = require('../models/user');

const router = express.Router();

// 회원가입
exports.signup = async (req, res, next) => {
  const { nickname, email, password, birthday, gender, mbti1, mbti2, mbti3, mbti4, image } = req.body;
  try {
    // 이메일 중복 가입 방지
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      console.log('signuppp')
      return next();
    }
    // 정상적인 회원가입 절차면 해시화
    const hashedPassword = await bcrypt.hash(password, 12);

    // DB에 해당 회원정보 생성
    await User.create({ 
      nickname: nickname, 
      email: email, 
      password: hashedPassword, 
      gender: gender, 
      birthday: birthday, 
      mbti1: mbti1, mbti2: mbti2, mbti3: mbti3, mbti4: mbti4, 
      image: image,
    });
    console.log('11');
    res.end()
    // return res.redirect('/login');
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
