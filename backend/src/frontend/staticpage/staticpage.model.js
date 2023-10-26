const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Staticpage = sequelize.define('Staticpage', {
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    content: DataTypes.STRING,
   

  }, {
    tableName: 'cms_statics',
  });

  return Staticpage;
};
