const bcrypt = require('bcryptjs');

const User = require('../models/user');

// 마이페이지
exports.myprofile = async (req, res, next) => { 
  try{  
    const user = await User.findOne({
      // where: { id: req.params.id }
    });

    res.send(req.user);
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

// 비밀번호 변경
exports.changePW = async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  try {
    // 현재 로그인한 사용자의 정보 가져오기
    const user = await User.findOne({ where: { id: req.user.id } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // 현재 비밀번호 확인
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid current password' });
    }

    // 새로운 비밀번호 확인
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'New passwords do not match' });
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