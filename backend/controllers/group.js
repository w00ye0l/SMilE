const Group = require('../models/group');
const User = require('../models/user');

// group 생성
exports.create = (req, res, next) => {
  console.log('group',req.body);
  try {
    Group.create({
      name: req.body.name,
      userID: req.user.id
    });
    res.send(req.body);
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
    const groups = await Group.findAll({
      where : {
        userID : user.id,
      }
    });
    console.log(groups);
    res.send(groups);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// group 이름 조회
exports.read = async (req, res, next) => {
  try {
    const groups = await Group.findOne({
      where: { 
        id: req.params.id,
        userID : req.user.id
      }
    });
    console.log(groups);
    res.send(groups);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// group 수정
exports.update = async (req, res, next) => {
  try {
    await Group.update({
      name: req.body.name,
    },{
      where: { 
        id: req.params.id,
        userID : req.user.id
      }
      // where: { id: req.params.id }, // url에 포함된 정보를 가져올 때는 params에서 가져옴
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};


// group 삭제
exports.remove = async (req, res, next) => {
  try {
    await Group.destroy({ 
      where: { 
        id: req.params.id,
        userID : req.user.id
      },
      truncate: false,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};