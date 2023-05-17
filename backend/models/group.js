const Sequelize = require('sequelize');

class Group extends Sequelize.Model {
  static initiate(sequelize) {
    Group.init({
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
    }, {
      sequelize, 
      timestamps: false, 
      underscored: false,
      modelName: 'Group', 
      tableName: 'groups', 
      paranoid: false, 
      charset: 'utf8', 
      collate: 'utf8_general_ci', 
    });
  }

  static associate(db) {
    db.Group.belongsTo(db.User, { foreignKey: 'userID', targetKey: 'id', onDelete: 'cascade', onUpdate: 'cascade' });
    db.Group.hasMany(db.Guest, { foreignKey: { name : 'groupID', allowNull : false, primaryKey : true }, targetKey: 'id' });
  } 
};

module.exports = Group;