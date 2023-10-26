const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    state_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    }

  }, {
    tableName: 'cms_locations',
    // hooks: {
    //   beforeCreate: (user, options) => {
    //     if (user.password) { user.password = bcrypt.hashSync(user.password, 10); }
    //   },
    //   beforeBulkUpdate: (user, options) => {
    //     if (user.attributes.password) {
    //       user.attributes.password = bcrypt.hashSync(user.attributes.password, 10);
    //     }
    //   },
    // },

  });
  Location.associate = function (models) {
    Location.belongsTo(models.City, {
      foreignKey: 'city_id',
    });
    Location.belongsTo(models.State, {
      foreignKey: 'state_id',
    });
    // User.hasOne(models.Student, {
    //   foreignKey: 'userId',
    // });
    // User.hasOne(models.Guardian, {
    //   foreignKey: 'userId',
    // });
    // User.hasOne(models.School, {
    //   foreignKey: 'userId',
    // });
    // User.hasOne(models.FavouriteTeacher, {
    //   foreignKey: 'userId',
    // });
    // User.hasMany(models.TeacherReview, {
    //   foreignKey: 'userId',
    // });
  };
  return Location;
};
