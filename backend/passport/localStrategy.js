const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
          usernameField: 'email', // req.body.email
          passwordField: 'password', // req.body.password
        /*
        session: true, // 세션에 저장 여부
        passReqToCallback: false, 
        express의 req 객체에 접근 가능 여부. true일 때, 뒤의 callback 함수에서 req 인자가 더 붙음. 
        async (req, email, password, done) => { } 가 됨
        */
      },
      async (email, password, done) => {
        try {
          // 가입한 회원인지 아닌지 확인
          const exUser = await User.findOne({ where: { email } });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
                done(null, exUser); 
            } else {
                done(null, false, { message: '비밀번호가 일치하지 않습니다.' }); 
            }
          }
          else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
            console.error(error);
            done(error); 
        }
      },
    ),
  );
};