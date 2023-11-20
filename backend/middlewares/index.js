exports.isLoggedIn = (req, res, next) => {
  // isAuthenticated()로 검사해 로그인이 되어있으면
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    next(); // 다음 미들웨어
  } else {
    res.locals.user = null;
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); // 로그인 안되어있으면 다음 미들웨어
  } else {
    res.status(200).send("로그인 상태");
  }
};
