const Guest = require("../models/guest");
const Group = require("../models/group");
const User = require("../models/user");

// guest 생성
exports.create = async (req, res, next) => {
  console.log("guest", req.body);
  const { name, mbti, memo } = req.body;
  try {
    const existGroup = await Group.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existGroup) {
      return res.status(404).json({ message: "해당 그룹이 없습니다" });
    }

    // 프로필 이미지
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.location;
    } 

    await Guest.create({
      userID: req.user.id,
      image: imageUrl,
      name: name,
      mbti: mbti,
      groupID: existGroup.id,
      memo: memo,
    });

    res.status(200).send(req.body);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// 전체 guest 조회
exports.index = async (req, res, next) => {
  const user = req.user;
  try {
    const existGuest = await Guest.findAll({
      where: {
        userID: user.id,
      },
    });

    res.status(200).send(existGuest);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// guest 이름 조회
exports.read = async (req, res, next) => {
  try {
    const existGuest = await Guest.findOne({
      where: {
        id: req.params.id,
        userID: req.user.id,
      },
    });
    
    if (!existGuest) {
      return res.status(404).json({ message: "게스트 정보를 찾을 수 없습니다" });
    }

    if (existGuest.userID !== req.user.id) {
      return res.status(403).json({ message: "다른 사용자의 정보입니다" });
    }
    
    res.status(200).send(existGuest);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// guest 수정
exports.update = async (req, res, next) => {
  const { name, mbti, memo, groupID } = req.body;
  try {
    const existGuest = await Guest.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existGuest) {
      return res.status(404).json({ message: "해당 guest가 없습니다" });
    }

    if (existGuest.userID !== req.user.id) {
      return res.status(403).json({ message: "다른 사용자의 정보입니다" });
    }

    const existGroup = await Group.findOne({
      where: {
        id: groupID,
      },
    });

    if (!existGroup) {
      return res.status(404).json({ message: "해당 그룹이 없습니다" });
    }
    const guest = await Guest.update(
      {
        name: name,
        mbti: mbti,
        memo: memo,
        groupID: existGroup.id,
      },
      {
        where: {
          id: req.params.id,
          userID: req.user.id,
        },
      }
    );

    res.status(200).json({ message: "guest가 수정되었습니다" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// guest 삭제
exports.remove = async (req, res, next) => {
  try {
    const existGuest = await Guest.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existGuest) {
      return res.status(404).json({ message: "해당 guest가 없습니다" });
    }

    if (existGuest.userID !== req.user.id) {
      return res.status(403).json({ message: "로그인한 사용자가 아닙니다" });
    }

    await Guest.destroy({
      where: {
        id: req.params.id,
        userID: req.user.id,
      },
      truncate: false,
    });

    res.status(200).json({ message: "guest 정보가 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};
