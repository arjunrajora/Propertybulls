const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Faq = sequelize.define('Faq', {
    question: DataTypes.STRING,
    description: DataTypes.STRING,
    faq_category: DataTypes.INTEGER,
    page_saluge: DataTypes.STRING,
    answer: DataTypes.STRING,
    status: { type: DataTypes.STRING,
        defaultValue: "Y"},
        featured: { type: DataTypes.STRING,
        defaultValue: 1},
  },
   {
    tableName: 'cms_faqposts',
    
  });
  Faq.associate = function (models) {
    Faq.belongsTo(models.FaqCatgory, {
      foreignKey: 'faq_category',
    });
  };
  return Faq;
};
