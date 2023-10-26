const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Projectenquiry = sequelize.define('Projectenquiry', {
    fname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    country_code: DataTypes.STRING,
    pro_id: DataTypes.STRING,
    otp:DataTypes.STRING,

    message: {
      type: DataTypes.STRING,
      defaultValue: "I am interested, Please get in touch with me",
    }

  }, {
    tableName: 'cms_responses',
  });
  return Projectenquiry;
};