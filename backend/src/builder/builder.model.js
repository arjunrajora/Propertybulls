const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Builder = sequelize.define('Builder', {
    name: DataTypes.STRING,
    lname: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    state_id: DataTypes.STRING,
    mobile: DataTypes.STRING,
    occu: DataTypes.STRING,
    description: DataTypes.STRING,
    loc_ids: DataTypes.INTEGER,
    image: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    altemail: DataTypes.INTEGER,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    },
    featured:{
      type: DataTypes.STRING,
      defaultValue: "1",
    } 
       
  }, {
    tableName: 'cms_users',
    hooks: {
      beforeCreate: (user, options) => {
        console.log(user,"user");
        if (user.password) { user.password = bcrypt.hashSync(user.password, 10); }
      },
      beforeBulkUpdate: (user, options) => {
        if (user.attributes.password) {
          user.attributes.password = bcrypt.hashSync(user.attributes.password, 10);
        }
      },
    },


  });
  Builder.associate = function (models) {
    Builder.belongsTo(models.Location, {
      foreignKey: 'loc_ids',
    });
    Builder.belongsTo(models.State, {
      foreignKey: 'state_id',
    });
    Builder.hasMany(models.property, {
      foreignKey: 'cus_id',
    })
  };
  return Builder;
};
