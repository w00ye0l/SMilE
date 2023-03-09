const mysql = require('mysql2');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');

// Database
const db = mysql.createConnection({ // 모듈과 관련된 객체를 넣음
  host: process.env.DB_HOST, // db서버가 어떤 곳에 있느냐
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect( (error) => {
  if(error) {
    console.log(error);
  } else {
    console.log("MySQL Connected, controllers");
  }
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
      
  
      let hashedPassword = await bcrypt.hash(password, 8);
      // console.log(hashedPassword);
  
      db.query('INSERT INTO user SET ?', { nickname: nickname, email: email, password: hashedPassword, gender: gender, birthday: birthday, mbti1: mbti1, mbti2: mbti2, mbti3: mbti3, mbti4: mbti4, image: image}, (error, results) => {
        if (error) {
          console.log(error);
        } else {
          console.log(results);
        };
      });
    });
  res.send("form submitted");
};

// 로그인
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if ( !email || !password ){
      console.log('nothing')
    }

    db.query('SELECT * FROM user WHERE email = ?', [email], async (error, results) => {
      console.log(results);
      if( !results || !(await bcrypt.compare(password, results[0].password )) ) {
        res.status(401)
        console.log('not match')
      } else {
        const id = results[0].id; 
        const token = jwt.sign({ id }, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN
        });

        console.log("the token is:" + token);

        const cookieOptions = {
          expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
          ),
          httpOnly: true,
          // sameSite: 'none',
          secure: true,
          doamin: 'localhost',
          credentials: true
        }

        res.cookie('jwt', token, cookieOptions );
        // res.send('cookie')
        // res.send(jwt)
        // res.status(200).redirect("/mypage");
        res.status(200)
        console.log('login success');
        res.send("login!!!!!")
      }
    })
  } catch (error) {
    console.log(error);
  }
};
