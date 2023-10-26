const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const propertydetails = sequelize.define('propertydetails', {
    carparking:DataTypes.STRING,
    room:DataTypes.STRING,
    bathroom:DataTypes.STRING,
    tot_price:DataTypes.STRING,
    per_unit:DataTypes.STRING,
    area:DataTypes.STRING,
    area_unit:DataTypes.STRING,
    pro_id:DataTypes.STRING,
    // status: {
    //   type: DataTypes.STRING,
    //   defaultValue: "Y",
    // }

  }, {
    tableName: 'cms_property_details',
   
  });
  propertydetails.associate = function (models) {
    propertydetails.hasOne(models.propertyImage, {
      foreignKey: 'p_deatil_id',
    });
  }
  return propertydetails;
};
