const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    lname: DataTypes.STRING,
    username: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    password: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    country: DataTypes.INTEGER,
    country_code: DataTypes.INTEGER,
    address: DataTypes.STRING,
    fax: DataTypes.STRING,
    Image:DataTypes.STRING,
    altemail:DataTypes.STRING,
    mobileno :DataTypes.INTEGER,
    loc_ids :DataTypes.STRING,
    description:DataTypes.STRING,
    otp:DataTypes.STRING, 

    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "Y",
    },
    featured_mobile: {
      type: DataTypes.BOOLEAN,
      defaultValue: "0",
    },
  }, {
    tableName: 'cms_users',
    hooks: {
      beforeCreate: (user, options) => {
        if (user.password) { user.password = bcrypt.hashSync(user.password, 10); }
      },
      beforeBulkUpdate: (user, options) => {
        if (user.attributes.password) {
          user.attributes.password = bcrypt.hashSync(user.attributes.password, 10);
        }
      },
    },
  });
  User.associate = function (models) {
    User.belongsTo(models.Role, {
      foreignKey: 'role_id',
     })
    }

  return User;
};
