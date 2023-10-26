const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Seo = sequelize.define('Seo', {
    page: DataTypes.STRING,
    location: DataTypes.STRING, 
    title: DataTypes.STRING, 
    keyword: DataTypes.STRING,
    description: DataTypes.STRING, 


    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "Y",
    }

  },
   {
    tableName: 'cms_seos',
    
  });
  
  return Seo;
};
