const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Subscribe = sequelize.define('Subscribe', {
    username: DataTypes.STRING,
    
  }, {
    tableName: 'cms_subscribers',
  });
  return Subscribe;
};
