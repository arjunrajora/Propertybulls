const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    // state_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "Y",
    }

  }, {
    tableName: 'cms_locations',
  });
  Location.associate = function (models) {
    Location.belongsTo(models.City, {
      foreignKey: 'City_id',
    });

  }
  return Location;
};
