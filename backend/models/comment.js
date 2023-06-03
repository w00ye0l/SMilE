const Sequelize = require('sequelize');

class Comment extends Sequelize.Model {
  static initiate(sequelize) {
    Comment.init({
      comment: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    }, {
      sequelize, 
      timestamps: false, 
      underscored: false,
      modelName: 'Comment', 
      tableName: 'comments', 
      paranoid: false, 
      charset: 'utf8', 
      collate: 'utf8_general_ci', 
    });
  }

  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'userID', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.Comment.belongsTo(db.Answer, { foreignKey: 'answerID', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
  } 
};

module.exports = Comment;