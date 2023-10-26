const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Contactdetail = sequelize.define('Contactdetail', {
    category:DataTypes.STRING,
    p_typeid:DataTypes.STRING,
    min_budget:DataTypes.STRING,
    max_budget:DataTypes.STRING,
    location_id:DataTypes.STRING,
    fname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING, 
  }, {
    tableName: 'cms_alertrequirements',
  });
  return Contactdetail;
};