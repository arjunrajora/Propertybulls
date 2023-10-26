const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    role_id: DataTypes.INTEGER,
    package_name: DataTypes.STRING,
    package_price: DataTypes.STRING,
    package_discount: DataTypes.STRING,
    package_validity: DataTypes.STRING,
    f1: DataTypes.STRING,
    f2: DataTypes.STRING,
    f3: DataTypes.STRING,
    f4: DataTypes.STRING,
    f5: DataTypes.STRING,
    f6: DataTypes.STRING,
    f7: DataTypes.STRING,
    f8: DataTypes.STRING,
    f9: DataTypes.STRING,
    f10: DataTypes.STRING,
    short: DataTypes.STRING,
    package_status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    }
  }, {
    tableName: 'cms_packages',
  });

  Subscription.associate = function (model) {

    Subscription.belongsTo(model.Role, {
      foreignKey: 'role_id',
    });
  
  Subscription.hasOne(model.VisibilityMatrix, {
    foreignKey: 'profilepack_id',
  });
  }
  return Subscription;
};
