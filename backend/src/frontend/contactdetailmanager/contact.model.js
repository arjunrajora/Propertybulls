const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const contactnow = sequelize.define('contactnow', {
    fname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    message: DataTypes.STRING,
    pro_id: DataTypes.INTEGER,
   cus_id: DataTypes.INTEGER,

  }, {
    tableName: 'cms_responses',
  });
  contactnow.associate = function (models) {
    contactnow.belongsTo(models.Property, {
      foreignKey: 'pro_id',
     })
    }
  return contactnow;
};
