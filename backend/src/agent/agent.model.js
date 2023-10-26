const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('Agent', {
    companyname: DataTypes.STRING,
    name: DataTypes.STRING,
    lname: DataTypes.STRING,
    username: DataTypes.STRING,
    mobile: DataTypes.STRING,
    loc_ids: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,

    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    }

  }, {
    tableName: 'cms_users',
  
  });

  Agent.associate = function (models) {
    Agent.belongsTo(models.Location, {
      foreignKey: 'loc_ids',
      targetKey: 'id',
    });
  
    Agent.hasMany(models.property, {
      foreignKey: 'cus_id',
    })
    Agent.hasMany(models.Requirement, {
      foreignKey: 'cus_id',
    });
   
  }
  return Agent;
};
