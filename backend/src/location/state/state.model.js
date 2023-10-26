const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    }
  },
   {
    tableName: 'cms_states',
  });
  return State;
};
