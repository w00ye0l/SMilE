const bcrypt = require('bcryptjs');

const User = require('../models/user');

// 마이페이지
exports.myProfile = async (req, res, next) => { 
  try{  
    const user = await User.findOne({
      where: { id: req.user.id }, // 현재 로그인한 사용자의 ID를 조회
      attributes: { exclude: ['password'] } // 비밀번호를 제외한 다른 속성만 선택
    });

    res.send(user);
    } catch(err){
      console.error(err);
      console.log("데이터 조회 실패");
      next(err);
    }
  res.end();    
};

  //모든 사용자 조회
//   try {
//     const users = await User.findOne();
//     console.log(req.user);
//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     next(err);
//   }
//   console.log('mypage2')
//   res.end();
// };

// 회원정보 수정
exports.updateProfile = async (req, res, next) => {
  const { nickname, email, birthday, gender, mbti1, mbti2, mbti3, mbti4, image } = req.body;
  try {
    // 현재 로그인한 사용자의 정보 가져오기
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: '로그인한 사용자가 아닙니다!' });
    }

    // 회원 정보 업데이트
    user.nickname = nickname;
    user.birthday = birthday;
    user.gender = gender;
    user.mbti1 = mbti1;
    user.mbti2 = mbti2;
    user.mbti3 = mbti3;
    user.mbti4 = mbti4;
    user.image = image;

    await user.save();

    res.send(user);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 비밀번호 변경
exports.editPW = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    // 현재 로그인한 사용자의 정보 가져오기
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: '로그인한 사용자가 아닙니다!' });
    }

    // 현재 비밀번호 확인
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    // 새로운 비밀번호 확인
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: '새 비밀번호가 일치하지 않습니다.' });
    }

    // 새로운 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // 비밀번호 업데이트
    await User.update({ password: hashedPassword }, { where: { id: req.user.id } });

    res.end();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};