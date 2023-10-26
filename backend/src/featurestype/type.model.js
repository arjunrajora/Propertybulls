const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    type: DataTypes.STRING,


  },
   {
    tableName: 'cms_types`',
    
  });
  
  return Type;
};
