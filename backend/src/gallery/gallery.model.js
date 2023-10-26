const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const GALLERY = sequelize.define('GALLERY', {
    img: DataTypes.STRING,
    pro_id: DataTypes.STRING,
    type: DataTypes.STRING,




  },
   {
    tableName: 'cms_pgalleries',
    
  });
  // GALLERY.associate = function (models) {
  //   GALLERY.belongsTo(models.propertyperealtions, {
  //     foreignKey: 'pro_id',
  //   });
   
  // }
    
  return GALLERY;
};
