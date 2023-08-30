require('dotenv').config();
const env = process.env;

const development = {
  username: env.DB_USERNAME,
  //env.DB_USERNAME은 불러오고자 하는 데이터의 키값이므로 자유롭게 이름설정이 가능하다.
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  dialect: "mysql",
  //port: env.DB_PORT
};

const production = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  host: env.DB_HOST,
  dialect: "mysql",
  //port: env.DB_PORT
};

const test = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE_TEST,
  host: env.DB_HOST,
  dialect: "mysql",
  //port: env.DB_PORT
};

module.exports = { development, production, test };