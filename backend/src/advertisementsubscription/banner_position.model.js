const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const BannerPosition = sequelize.define('BannerPosition', {
    page: DataTypes.STRING,
    banner_location: DataTypes.STRING,
    position: DataTypes.STRING,
    banner_size: DataTypes.STRING,
    after_records: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    },
       
  }, {
    tableName: 'banner_position',

  });
  return BannerPosition;
};
