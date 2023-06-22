const Sequelize = require('sequelize');

// 클래스 불러오기
const User = require('./user')
const Group = require('./group');
const Guest = require('./guest');
const Question = require('./question');
const Answer = require('./answer');
const Comment = require('./comment');

const env = process.env.NODE_ENV || 'development';

const config = require(__dirname + '/../config/config.js')[env]

const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;

// 모델 클래스를 넣음.
db.User = User;
db.Group = Group;
db.Guest = Guest;
db.Question = Question;
db.Answer = Answer;
db.Comment = Comment;


// 모델과 테이블 종합적인 연결이 설정
User.initiate(sequelize); 
Group.initiate(sequelize);
Guest.initiate(sequelize);
Question.initiate(sequelize);
Answer.initiate(sequelize);
Comment.initiate(sequelize);

// db객체 안에 있는 모델들 간의 관계가 설정된다.
User.associate(db);
Group.associate(db);
Guest.associate(db);
Question.associate(db);
Answer.associate(db);
Comment.associate(db);

// 모듈로 꺼낸다.
module.exports = db;
