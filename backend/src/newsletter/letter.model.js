const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Letter = sequelize.define('Letter', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
  }, {
    tableName: 'cms_letters',
  });
  return Letter;
};
