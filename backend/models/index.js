const Sequelize = require('sequelize');

// 클래스 불러오기
const User = require('./user')
const Group = require('./group');
const Guest = require('./guest');
const Question = require('./question');
const Answer = require('./answer');

const env = process.env.NODE_ENV || 'development';

// const fs = require('fs');
// const path = require('path');
// const basename = path.basename(__filename);

const config = require(__dirname + '/../config/config.json')[env];

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config)
// sequelize.options.logging = false;

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

db.sequelize = sequelize;

// 모델 클래스를 넣음.
db.User = User;
db.Group = Group;
db.Guest = Guest;
db.Question = Question;
db.Answer = Answer;

// 모델과 테이블 종합적인 연결이 설정
User.initiate(sequelize); 
Group.initiate(sequelize);
Guest.initiate(sequelize);
Question.initiate(sequelize);
Answer.initiate(sequelize);

// db객체 안에 있는 모델들 간의 관계가 설정된다.
User.associate(db);
Group.associate(db);
Guest.associate(db);
Question.associate(db);
Answer.associate(db);

// 모듈로 꺼낸다.
module.exports = db;
