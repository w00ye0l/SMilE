const AWS = require("aws-sdk");

const Guest = require("../models/guest");
const Group = require("../models/group");

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
    let imageUrl = null;
    if (req.file) {
      imageUrl = req.file.location;
    }
    await Guest.create({
      image: imageUrl,
      userID: req.user.id,
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
      return res
        .status(404)
        .json({ message: "게스트 정보를 찾을 수 없습니다" });
    }

    if (existGuest.userID !== req.user.id) {
      return res.status(403).json({ message: "다른 사용자의 정보입니다" });
    }

    res.status(200).send(existGuest);
  } catch (error) {
    console.error(error);
    return next(error);
  }
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
};

// guest 이미지 삭제
exports.deleteImage = async (req, res, next) => {
  try {
    const s3 = new AWS.S3();
    const guestId = req.params.id;

    s3.deleteObject({
      Bucket: "smile-img",
      Key: `guestimg/${guestId}`,
    });

    // MySQL에서 이미지 정보 삭제
    const guest = await Guest.findByPk(guestId);
    if (!guest) {
      return res.status(404).json({ message: "guest를 찾을 수 없습니다." });
    }

    // guest 이미지 경로 삭제
    guest.image = null; // 혹은 해당 필드를 초기화할 수 있습니다.
    await guest.save();

    res.status(200).json({ message: "이미지 파일이 삭제되었습니다!" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

// guest 이미지 재업로드
exports.updateImage = async (req, res, next) => {
  try {
    const guestId = req.params.id;
    const imageUrl = req.file.location;

    const guest = await Guest.findByPk(guestId);
    if (!guest) {
      return res.status(404).json({ message: "guest를 찾을 수 없습니다." });
    }
    guest.image = imageUrl;
    await guest.save();

    res
      .status(200)
      .json({ message: "guest 프로필 이미지가 업데이트되었습니다." });
  } catch (error) {
    console.error(error);
    return next(error);
  }
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
};
