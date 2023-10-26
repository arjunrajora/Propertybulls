const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const propertyImage = sequelize.define('propertyImage', {
    img:DataTypes.STRING,
    pro_id:DataTypes.STRING,
    type:DataTypes.STRING,
    proj_img:DataTypes.STRING,

  }, {
    tableName: 'cms_pgalleries',
   
  });

  return propertyImage;
};
