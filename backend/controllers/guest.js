const Guest = require("../models/guest");
const Group = require("../models/group");
const User = require("../models/user");

// guest 생성
exports.create = async (req, res, next) => {
  console.log("guest", req.body);
  const { name, mbti, group, memo } = req.body;
  try {
    const existGroup = await Group.findOne({
      where: {
        name: group,
      },
    });

    if (!existGroup) {
      return res.status(404).json({ message: "Group not found" });
    }

    const groups = await Group.findAll({});
    await Guest.create({
      userID: req.user.id,
      groupID: existGroup.id,
      name: name,
      mbti: mbti,
      group: group,
      memo: memo,
    });

    console.log("guestin");
    res.send(req.body);
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
    const guests = await Guest.findAll({
      where: {
        userID: user.id,
      },
    });
    console.log(guests);
    res.send(guests);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// guest 이름 조회
exports.read = async (req, res, next) => {
  try {
    const guests = await Guest.findOne({
      where: {
        id: req.params.id,
        userID: req.user.id,
      },
    });
    console.log(guests);
    res.send(guests);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// guest 수정
exports.update = async (req, res, next) => {
  const { name, mbti, group, memo } = req.body;
  try {
    const existGuest = await Guest.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existGuest) {
      return res.status(404).json({ message: "Guest not found" });
    }

    if (existGuest.userID !== req.user.id) {
      return res.status(403).json({ message: "ID of another user" });
    }

    const existGroup = await Group.findOne({
      where: {
        name: group,
      },
    });

    if (!existGroup) {
      return res.status(404).json({ message: "Group not found" });
    }
    await Guest.update(
      {
        name: name,
        mbti: mbti,
        group: group,
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
      return res.status(404).json({ message: "Guest not found" });
    }

    if (existGuest.userID !== req.user.id) {
      return res.status(403).json({ message: "ID of another user" });
    }

    await Guest.destroy({
      where: {
        id: req.params.id,
        userID: req.user.id,
      },
      truncate: false,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};
