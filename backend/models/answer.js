const Sequelize = require('sequelize');

class Answer extends Sequelize.Model {
  static initiate(sequelize) {
    Answer.init(
      {
        answer: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: 'Answer',
        tableName: 'answers',
        paranoid: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate(db) {
    db.Answer.belongsTo(db.User, { foreignKey: 'userID', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.Answer.belongsTo(db.Question, { foreignKey: 'questionID', sourceKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
  }
}

module.exports = Answer;