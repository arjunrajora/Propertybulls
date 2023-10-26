const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Slider = sequelize.define('Slider', {
    title: DataTypes.STRING,
    name: DataTypes.STRING, 
    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    }
  },
   {
    tableName: 'cms_sliders',  
  });
  return Slider;
};
    