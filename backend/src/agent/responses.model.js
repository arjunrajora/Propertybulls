const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Responses = sequelize.define('Responses', {
    message: DataTypes.STRING,
    cus_id: DataTypes.STRING,
  }, {
    tableName: 'cms_responses',
  });
  return Responses;
};
