const Sequelize = require('sequelize');

class Question extends Sequelize.Model {
  static initiate(sequelize) {
    Question.init({
      question: {
        type: Sequelize.STRING(200),
        allowNull: false,
        unique: true
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Question',
      tableName: 'questions',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
      logging: false, // 로깅 비활성화
    });
  }

  static associate(db) {
    db.Question.hasMany(db.Answer, { foreignKey: 'questionID', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
  }
};

module.exports = Question;