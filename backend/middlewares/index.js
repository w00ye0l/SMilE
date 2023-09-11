exports.isLoggedIn = (req, res, next) => {
  // isAuthenticated()로 검사해 로그인이 되어있으면
  console.log("isLoggedIn req 확인");
  console.log(req.cookies);
  if (req.isAuthenticated()) {
    console.log('req.isAuthenticated', req.isAuthenticated());
    next(); // 다음 미들웨어
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    console.log('isnotloggedIn', req.isAuthenticated());
    next(); // 로그인 안되어있으면 다음 미들웨어
  } else {
    res.status(200).send("로그인 상태");
    // const message = encodeURIComponent("로그인한 상태입니다.");
  }
};
