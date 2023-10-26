const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Requirement = sequelize.define('Requirement', {
    category: DataTypes.STRING,
    p_typeid: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    cus_id: DataTypes.INTEGER,
    min_budget: DataTypes.INTEGER,
    max_budget: DataTypes.INTEGER,
    min_area: DataTypes.INTEGER,
    max_area: DataTypes.INTEGER,
    min_room: DataTypes.INTEGER,
    max_room: DataTypes.INTEGER,
    description: DataTypes.STRING,
    creater: DataTypes.STRING,
    unit: DataTypes.STRING,

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "Y",
    }

  }, {
    tableName: 'cms_requirements',


  });


  Requirement.associate = function (models) {
    Requirement.belongsTo(models.Location, {
      foreignKey: 'location_id',
    });

    Requirement.belongsTo(models.City, {
      foreignKey: 'city_id',
    });
    Requirement.belongsTo(models.State, {
      foreignKey: 'state_id',
    });
    Requirement.belongsTo(models.propertyTypes, {
      foreignKey: 'p_typeid',
    })
    Requirement.belongsTo(models.User, {
      foreignKey: 'cus_id',
    })
  }













  return Requirement;
};
