const Sequelize = require('sequelize');

class Guest extends Sequelize.Model {
  static initiate(sequelize) {
    Guest.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      mbti: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      memo: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Guest',
      tableName: 'guests',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Guest.belongsTo(db.User, { foreignKey: { name : 'userID', allowNull : false }, targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.Guest.belongsTo(db.Group, { foreignKey: { name : 'groupID', allowNull : false }, targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade'});
  }
}; 

module.exports = Guest;