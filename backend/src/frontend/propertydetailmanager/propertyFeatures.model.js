const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Propertyfeature = sequelize.define('Propertyfeature', {
    check_list: DataTypes.STRING,
    pro_id: DataTypes.STRING,

  }, {
    tableName: 'cms_propertyperealtions',
  });


  Propertyfeature.associate = function (models) {
    Propertyfeature.belongsTo(models.Features, {
      foreignKey: 'check_list',
     })
    }

  



  return Propertyfeature;
};
