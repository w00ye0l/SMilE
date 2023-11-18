const Sequelize = require("sequelize");

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init(
      {
        nickname: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        email: {
          type: Sequelize.STRING(20),
          allowNull: false,
          unique: true,
        },
        password: {
          type: Sequelize.STRING(300),
          allowNull: false,
        },
        birthday: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        image: {
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        gender: {
          type: Sequelize.ENUM("M", "W"),
          allowNull: false,
        },
        mbti1: {
          type: Sequelize.ENUM("E", "I"),
          allowNull: false,
        },
        mbti2: {
          type: Sequelize.ENUM("N", "S"),
          allowNull: false,
        },
        mbti3: {
          type: Sequelize.ENUM("T", "F"),
          allowNull: false,
        },
        mbti4: {
          type: Sequelize.ENUM("J", "P"),
          allowNull: false,
        },
        answered: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize, // static init의 매개변수와 연결되는 옵션
        timestamps: false, // 자동으로 날짜 컬럼을 추가하는 옵션
        underscored: false, // 스네이크 케이스로 바꾸는 옵션
        modelName: "User", // 모델 이름
        tableName: "users", // 실제 데이터베이스의 테이블 이름
        paranoid: false, // deletedAt 컬럼을 생성하는 옵션
        charset: "utf8", // 한글 설정
        collate: "utf8_general_ci", // 한글 설정
      }
    );
  }

  static associate(db) {
    db.User.hasMany(db.Group, { foreignKey: "userID", sourceKey: "id" });
    db.User.hasMany(db.Guest, { foreignKey: "userID", sourceKey: "id" });
    db.User.hasMany(db.Answer, { foreignKey: "userID", sourceKey: "id" });
    db.User.hasMany(db.Comment, { foreignKey: "userID", sourceKey: "id" });
  }
}

module.exports = User;
