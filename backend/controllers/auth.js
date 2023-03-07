const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({ // 모듈과 관련된 객체를 넣음
  host: process.env.DB_HOST, // db서버가 어떤 곳에 있느냐
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB__NAME,
  port: process.env.DB_PORT,
});

// 회원가입
exports.signup = (req, res) => {
  
  const { nickname, email, password, passwordConfirm, birthday, gender, mbti1, mbti2, mbti3, 
    mbti4, image } = req.body;   
  console.log(req.body);

    db.query('SELECT email FROM user WHERE email = ?', [email], async (error, results) => {
      if (error) {
        console.log(error);
      };
      if (results.length > 0) {
        return res.render('signup', {
          message: 'that email is already in use'
        });
      } else if (password !== passwordConfirm) {
        return res.render('signup', {
          message: 'password do not match'
        });
      };
  
      let hashedPassword = await bcrypt.hash(password, 8);
      console.log(hashedPassword);
  
      db.query('INSERT INTO user SET ?', { nickname: nickname, email: email, password: hashedPassword, gender: gender, birthday: birthday, mbti1: mbti1, mbti2: mbti2, mbti3: mbti3, mbti4: mbti4, image: image}, (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
          return res.render('signup', {
            message: 'user signup'
          });
        };
      });
    });
  res.send("form submitted");
};

