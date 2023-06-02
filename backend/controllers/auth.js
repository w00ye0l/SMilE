const express = require("express");
const mysql = require("mysql2");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const { promisify } = require("util");

const User = require("../models/user");

// 회원가입
exports.signup = async (req, res, next) => {
  const { nickname, email, password, birthday, gender, mbti1, mbti2, mbti3, mbti4, image } = req.body;
  try {
    // 이메일 중복 가입 방지
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
    } else {
      // 정상적인 회원가입 절차면 해시화
      const hashedPassword = await bcrypt.hash(password, 12);

      // DB에 해당 회원정보 생성
      await User.create({
        nickname: nickname,
        email: email,
        password: hashedPassword,
        gender: gender,
        birthday: birthday,
        mbti1: mbti1,
        mbti2: mbti2,
        mbti3: mbti3,
        mbti4: mbti4,
        image: image,
      });
    }
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.send(req.body);
};

// 로그인
exports.login = async (req, res, next) => {
  //? local로 실행이 되면 localstrategy.js를 찾아 실행
  passport.authenticate("local", (authError, user, info) => {
    // done(err)가 처리된 경우
    if (authError) {
      console.error(authError);
      return next(authError); // 에러처리 미들웨어로 보낸다.
    }

    if (!user) {
      return res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const userData = JSON.parse(JSON.stringify(user));
      delete userData.password;
      res.send(userData);
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

//로그아웃
exports.logout = (req, res) => {
  req.logout(() => {
    req.session.destroy(); // passport 업데이트 이후 함수 안에 넣어야 실행됨
    res.clearCookie('connect.sid'); // connect.sid 쿠키 삭제
    res.send("로그아웃");
  });
};

// 회원탈퇴
exports.remove = async (req, res, next) => {
  const logInUser = req.user.id; // 로그인한 사용자의 ID
  try {
    const user = await User.findOne({ where: { id: req.params.id } });

    if (!user) {
      return res
        .status(404)
        .json({ message: "해당 사용자를 찾을 수 없습니다." });
    }

    if (user.id !== logInUser) {
      return res.status(403).json({ message: "권한이 없습니다." });
    }
    await User.destroy({
      where: { id: req.params.id },
      truncate: false,
    });

    res.end();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
