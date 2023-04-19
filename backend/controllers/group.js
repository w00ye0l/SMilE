const Group = require('../models/group');
const User = require('../models/user');

// group 생성
exports.create = (req, res, next) => {
  const { name, userID } = req.body; 
  try {
    Group.create({
      name: name,
      userID: userID 
    });
    console.log('groupin');
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// 전체 group 조회
exports.index = async (req, res, next) => {
  try {
    const groups = await Group.findAll({
      include: [{
        model: User
      }]
    });
    console.log(groups);
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
      include: [{
        model: User
      }],
      where: { id: req.params.id }
    })
    console.log(groups.id, groups.name, groups.userID);
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// group 수정
exports.update =  (req, res, next) => {
  const { name } = req.body;
  try {
    Group.update({
      name: name,
    },{
      where: { id: req.params.id }, // url에 포함된 정보를 가져올 때는 params에서 가져옴
    })
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};

// group 삭제
exports.remove = (req, res, next) => {
  try {
    Group.destroy({ 
      where: { id: req.params.id },
      truncate: false,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
  res.end();
};