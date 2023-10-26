const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const propertyTypes = sequelize.define('propertyTypes', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.STRING,

    status: { type: DataTypes.STRING,
        defaultValue: "Y"},


  },
   {
    tableName: 'cms_propertytypes',
    
  });

  
  return propertyTypes;
};
