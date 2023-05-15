const User = require('../models/user');

// 마이페이지
exports.myprofile = async (req, res, next) => { 
  try{  
    const user = await User.findOne({
      // where: { id: req.params.id }
    });
    res.send(req.user)
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