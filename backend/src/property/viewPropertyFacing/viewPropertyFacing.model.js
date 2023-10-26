const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Facing = sequelize.define('Facing', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    // status: {
    //   type: DataTypes.BOOLEAN,
    //   defaultValue: "Y",
    // }
    status: {
      type: DataTypes.STRING,
      defaultValue: "N"
    },

  },
    {
      tableName: 'cms_propertyfaces',

    });

  return Facing;
};
