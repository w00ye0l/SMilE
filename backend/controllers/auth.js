const bcrypt = require("bcryptjs");
const passport = require("passport");

const User = require("../models/user");

// 회원가입
exports.signup = async (req, res, next) => {
  const {
    email,
    nickname,
    password,
    birthday,
    gender,
    mbti1,
    mbti2,
    mbti3,
    mbti4,
  } = req.body;

  let img = ""; // 기본값으로 빈 문자열 => 이미지 파일 없는 경우에도 회원가입 가능하도록

  // 이미지 파일이 존재할 경우에만 req.file.location 사용
  if (req.file && req.file.location) {
    img = req.file.location;
  }

  // 이메일 중복 가입 방지
  const exUser = await User.findOne({ where: { email } });
  if (exUser) {
    return res.status(409).json({ message: "이미 존재하는 이메일입니다." });
  }

  // 이메일 중복이 아닌 경우에 실행
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const user = await User.create({
      image: img,
      email: email,
      nickname: nickname,
      password: hashedPassword,
      birthday: birthday,
      gender: gender,
      mbti1: mbti1,
      mbti2: mbti2,
      mbti3: mbti3,
      mbti4: mbti4,
    });
    res.status(200).json({ user: user });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 로그인
exports.login = async (req, res, next) => {
  //? local로 실행이 되면 localstrategy.js를 찾아 실행
  console.log("로그인 실행");
  passport.authenticate("local", (authError, user, info) => {
    // done(err)가 처리된 경우
    if (authError) {
      console.error(authError);
      return next(authError); // 에러처리 미들웨어로 보낸다.
    }

    if (!user) {
      return res.status(400).json({ message: "가입되지 않은 회원입니다." });
    }

    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      req.session.save(() => {
        const userData = JSON.parse(JSON.stringify(user));
        delete userData.password;
        res.json({ message: "로그인 성공", user: userData });
      });
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};

//로그아웃
exports.logout = (req, res) => {
  req.logout(() => {
    req.session.destroy(); // passport 업데이트 이후 함수 안에 넣어야 실행됨
    res.clearCookie("connect.sid", { path: "/" }); // connect.sid 쿠키 삭제, 현재 path가 다르기 때문에 '/'로 지정해줘야 함
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
