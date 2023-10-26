const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Saveserch = sequelize.define('Saveserch', {
    title: DataTypes.STRING,
    property_name: DataTypes.STRING,
    category: DataTypes.STRING,
    p_typeid: DataTypes.STRING,
    state_id: DataTypes.STRING,
    min_price: DataTypes.STRING,
    max_price: DataTypes.STRING,
    city_id: DataTypes.STRING,
    min_area: DataTypes.STRING,
    max_area: DataTypes.STRING,
    unit: DataTypes.STRING,
    room: DataTypes.STRING,
    min_room: DataTypes.STRING,
    max_room: DataTypes.STRING,
    min_floor: DataTypes.STRING,
    max_floor: DataTypes.STRING,
    description: DataTypes.STRING,
    cus_id: DataTypes.STRING,
    location_id: DataTypes.STRING,
    age: DataTypes.STRING,

       
  }, {
    tableName: 'cms_advances',
  });
  return Saveserch;
};
