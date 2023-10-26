const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const VisibilityMatrix = sequelize.define('VisibilityMatrix', {
    ordernumber: DataTypes.STRING,
    role_id: DataTypes.STRING,
    profilepack_id: DataTypes.STRING,
       
  }, {
    tableName: 'visibility_matrix',

  });

  return VisibilityMatrix;
};
