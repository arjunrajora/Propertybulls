const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Alert = sequelize.define('Alert', {
    fname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    category: DataTypes.STRING,
    p_typeid: DataTypes.STRING,
    max_budget: DataTypes.STRING,
    min_budget: DataTypes.STRING,
    country_code: DataTypes.STRING,
    // security_code: DataTypes.STRING,
    location_id: DataTypes.STRING,




  }, {
    tableName: 'cms_alertrequirements',
  });
  return Alert;
};
