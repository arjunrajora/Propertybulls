const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Articledetail = sequelize.define('Articledetail', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.STRING,
    url:DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    }

  }, {
    tableName: 'cms_articles',
  });
  return Articledetail;
};
