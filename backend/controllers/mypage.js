const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");

const User = require("../models/user");
const { use } = require("passport");

// 마이페이지
exports.myProfile = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id }, // 현재 로그인한 사용자의 ID를 조회
      attributes: { exclude: ["password"] }, // 비밀번호를 제외한 다른 속성만 선택
    });

    res.send(user);
  } catch (err) {
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
  const { nickname, birthday, gender, mbti1, mbti2, mbti3, mbti4 } = req.body;
  try {
    // 현재 로그인한 사용자의 정보 가져오기
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: "로그인한 사용자가 아닙니다!" });
    }
    // 회원 정보 업데이트
    user.nickname = nickname;
    user.birthday = birthday;
    user.gender = gender;
    user.mbti1 = mbti1;
    user.mbti2 = mbti2;
    user.mbti3 = mbti3;
    user.mbti4 = mbti4;

    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 이미지 삭제
exports.deleteImage = async (req, res, next) => {
  try {
    const s3 = new AWS.S3();
    const userId = req.user.id;

    s3.deleteObject({
      Bucket: "smile-img",
      Key: `profileimg/${userId}`,
    });

    // MySQL에서 이미지 정보 삭제
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }

    // 프로필 이미지 경로 삭제
    user.image = null; // 혹은 해당 필드를 초기화할 수 있습니다.
    await user.save();

    res.status(200).json({ message: "이미지 파일이 삭제되었습니다!" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// 이미지 재업로드
exports.updateImage = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const imageUrl = req.file.location;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
    user.image = imageUrl;
    await user.save();

    res.status(200).json({ message: "프로필 이미지가 업데이트되었습니다." });
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
      return res.status(404).json({ message: "로그인한 사용자가 아닙니다!" });
    }

    // 현재 비밀번호 확인
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
    }

    // 새로운 비밀번호 확인
    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "새 비밀번호가 일치하지 않습니다." });
    }

    // 새로운 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // 비밀번호 업데이트
    await User.update(
      { password: hashedPassword },
      { where: { id: req.user.id } }
    );

    res.end();
  } catch (error) {
    console.error(error);
    return next(error);
  }
};
