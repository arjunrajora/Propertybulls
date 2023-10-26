const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    state_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "Y",
      
    }
  }, {
    tableName: 'cms_cities',
  })
  City.associate = function (models) {
    City.belongsTo(models.State, {
      foreignKey: 'state_id',
    });
  }
   return City;
};
