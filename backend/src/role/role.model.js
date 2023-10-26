const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    title: DataTypes.STRING,
    alias: DataTypes.STRING, 
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "Y",
    }

  },
   {
    tableName: 'cms_roles',
    
  });
  
  return Role;
};
