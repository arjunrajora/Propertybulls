const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Email = sequelize.define('Email', {
    title: DataTypes.STRING,
    subject: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    }

  }, {
    tableName: 'cms_templates',
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
  // User.associate = function (models) {
  //   User.hasOne(models.Teacher, {
  //     foreignKey: 'userId',
  //   });
    // User.hasOne(models.Student, {
    //   foreignKey: 'userId',
    // });
  //   User.hasOne(models.Guardian, {
  //     foreignKey: 'userId',
  //   });
  //   User.hasOne(models.School, {
  //     foreignKey: 'userId',
  //   });
  //   User.hasOne(models.FavouriteTeacher, {
  //     foreignKey: 'userId',
  //   });
  //   User.hasMany(models.TeacherReview, {
  //     foreignKey: 'userId',
  //   });
  // };
  return Email;
};
