const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Enquiry = sequelize.define('Enquiry', {
    f_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    message: DataTypes.STRING,

    
  }, {
    tableName: 'cms_enquires',
  });
  return Enquiry;
};