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
    description: DataTypes.STRING,
    creater: DataTypes.STRING,
    min_room :DataTypes.STRING,
    max_room :DataTypes.STRING,
    unit:DataTypes.STRING,

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "Y",
    }

  }, {
    tableName: 'cms_requirements',
   
  });

  Requirement.associate = function (models) {
    Requirement.hasOne(models.propertyTypes, {
      foreignKey: 'p_typeid',
    });
   
  }
  return Requirement;
};
