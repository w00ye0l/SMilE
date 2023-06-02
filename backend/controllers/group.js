const Group = require('../models/group');
const User = require('../models/user');

// group 생성
exports.create = async (req, res, next) => {
  try {
    const existGroup = await Group.findOne({
      where: {
        name: req.body.name,
        userID: req.user.id,
      },
    });

    if (existGroup) {
      return res.status(400).json({ message: "이미 존재하는 그룹 이름입니다" });
    }

    const groups = await Group.create({
      name: req.body.name,
      userID: req.user.id
    });

    res.send(groups);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// 전체 group 조회
exports.index = async (req, res, next) => {
  const user = req.user;
  try {
    const existGroup = await Group.findAll({
      where : {
        userID : user.id,
      }
    });

    res.status(200).send(existGroup);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// group 이름 조회
exports.read = async (req, res, next) => {
  try {
    const existGroup = await Group.findOne({
      where: { 
        id: req.params.id,
        userID : req.user.id
      }
    });

    if (!existGroup) {
      return res.status(404).json({ message: "group 정보를 찾을 수 없습니다" });
    }

    if (existGroup.userID !== req.user.id) {
      return res.status(403).json({ message: "다른 사용자의 정보입니다" });
    }

    res.status(200).send(existGroup);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// group 수정
exports.update = async (req, res, next) => {
  try {
    const existGroup = await Group.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existGroup) {
      return res.status(404).json({ message: "해당 Group이 없습니다" });
    }

    if (existGroup.userID !== req.user.id) {
      return res.status(403).json({ message: "다른 사용자의 정보입니다" });
    }

    const confirmGroup = await Group.findOne({
      where: {
        name: req.body.name,
        userID: req.user.id,
      },
    });

    if (confirmGroup && confirmGroup.id !== existGroup.id) {
      return res.status(400).json({ message: "이미 존재하는 그룹 이름입니다" });
    }

    const group = await Group.update({
      name: req.body.name,
    },{
      where: { 
        id: req.params.id,
        userID : req.user.id
      }
    });

    res.status(200).json({ message: "그룹이 수정되었습니다" });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// group 삭제
exports.remove = async (req, res, next) => {
  try {
    const existGroup = await Group.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!existGroup) {
      return res.status(404).json({ message: "해당 group가 없습니다" });
    }

    if (existGroup.userID !== req.user.id) {
      return res.status(403).json({ message: "로그인한 사용자가 아닙니다" });
    }

    await Group.destroy({ 
      where: { 
        id: req.params.id,
        userID : req.user.id
      },
      truncate: false,
    });
    
    res.status(200).json({ message: "group 정보가 삭제되었습니다." });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};