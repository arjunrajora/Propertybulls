const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Features = sequelize.define('Features', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    type: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: "N"
    },


  },
    {
      tableName: 'cms_propertyfeatures',

    });
  Features.associate = function (models) {
    Features.belongsTo(models.Type, {
      foreignKey: 'type',
    });

  }
  return Features;
};  
