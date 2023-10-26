const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Similarproject = sequelize.define('Similarproject', {
    name: DataTypes.STRING,
    p_typeid: DataTypes.STRING,
    address2: DataTypes.STRING,
    tot_price: DataTypes.STRING,
    area_in_sqft: DataTypes.STRING,
    area: DataTypes.STRING,
    a_unit: DataTypes.STRING,
    featureimage: DataTypes.STRING,
    url: DataTypes.STRING,
    type: DataTypes.STRING,
  },
    {
      tableName: 'cms_properties',
    });


  Similarproject.associate = function (models) {
    Similarproject.belongsTo(models.propertyTypes, {
      foreignKey: 'p_typeid',
    });
  }





  return Similarproject;
};
