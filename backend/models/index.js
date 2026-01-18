const sequelize = require('../config/database');
const User = require('./User');
const Item = require('./Item');

// Define associations
User.hasMany(Item, { foreignKey: 'userId', onDelete: 'CASCADE' });
Item.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Item
};
