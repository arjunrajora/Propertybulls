module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    role_id: DataTypes.STRING,
    mobile: DataTypes.STRING,
    username: DataTypes.STRING,
    lname: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    altemail: DataTypes.STRING,
    address: DataTypes.STRING,
    created: DataTypes.STRING,

    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    }

  }, {
    tableName: 'cms_users',
  });


  Customer.associate = function (models) {
    Customer.belongsTo(models.Role, {
      foreignKey: 'role_id',
    });

    Customer.hasMany(models.Property, {
      foreignKey: 'cus_id',
    });
    Customer.hasMany(models.Requirement, {
      foreignKey: 'cus_id',
    });
    Customer.hasMany(models.Responses, {
      foreignKey: 'pro_id',
    });

    Customer.belongsTo(models.Role, {
      foreignKey: 'role_id',
    })

  }

  return Customer;
}