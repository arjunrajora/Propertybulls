const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Advertisement = sequelize.define('Advertisement', {
    page: DataTypes.STRING,
    banner_position_id: DataTypes.STRING,
    duration: DataTypes.STRING,
    discount_price: DataTypes.STRING,
    amount: DataTypes.STRING,
    banner_size: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    },

  },
   {
    tableName: 'advertisement',


  });
  Advertisement.associate = function (models) {
    Advertisement.belongsTo(models.BannerPosition, {
      foreignKey: 'banner_position_id',
    });
    // Builder.belongsTo(models.State, {
    //   foreignKey: 'state_id',
    // });
    // Builder.hasMany(models.property, {
    //   foreignKey: 'cus_id',
    // })
  };
  return Advertisement;
};
