const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const FaqCatgory = sequelize.define('FaqCatgory', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,

    status: { type: DataTypes.STRING,
        defaultValue: "Y"},


  },
   {
    tableName: 'cms_faq_categories',
    
  });
  FaqCatgory.associate = function (models) {
    FaqCatgory.hasMany(models.Faq, {
      foreignKey: 'faq_category',
    });
  };
  return FaqCatgory;
};
