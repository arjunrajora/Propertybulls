const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Contactus = sequelize.define('Contactus', {
    username: DataTypes.STRING,
    role_id: DataTypes.STRING,
    tw_url: DataTypes.STRING,
    fb_url: DataTypes.STRING,
    you_url: DataTypes.STRING,

  }, {
    tableName: 'cms_users',
  });

  return Contactus;
};
