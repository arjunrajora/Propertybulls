const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const property = sequelize.define('property', {
    name: DataTypes.STRING,
    ship: DataTypes.STRING,
    // address: DataTypes.STRING,
    address2: DataTypes.STRING,
    room: DataTypes.STRING,
    option: DataTypes.STRING,
    pincode: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    state_id: DataTypes.INTEGER,
    area: DataTypes.STRING,
    flooring: DataTypes.STRING,
    p_floor: DataTypes.STRING,
    bath: DataTypes.STRING,
    featureimage: DataTypes.STRING,
    floor: DataTypes.STRING,
    age: DataTypes.STRING,
    p_unit: DataTypes.STRING,
    description: DataTypes.STRING,
    tot_price: DataTypes.DOUBLE,
    faceid: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    p_typeid: DataTypes.INTEGER,
    p_unit: DataTypes.INTEGER,
    a_unit: DataTypes.STRING,
    url: DataTypes.STRING,
    area_in_sqft: DataTypes.STRING,
    build_id: DataTypes.STRING,
    cus_id: DataTypes.STRING,
    address: DataTypes.STRING,
    remark: DataTypes.STRING,
    deposit: DataTypes.INTEGER,
    age: DataTypes.STRING,
    security_deposit: DataTypes.STRING,
    rent: DataTypes.STRING,
    t_type: DataTypes.STRING,
    subscription_order_id: DataTypes.STRING,
    featured: {
      type: DataTypes.STRING,
      defaultValue: 0
    },
    featured_post: {
      type: DataTypes.STRING,
      defaultValue: "N"
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "N"
    },
  },
    {
      tableName: 'cms_properties',

    });

  property.associate = function (models) {
    property.belongsTo(models.Location, {
      foreignKey: 'location_id',
    });

    property.belongsTo(models.User, {
      foreignKey: 'build_id',
    });
    property.belongsTo(models.propertyTypes, {
      foreignKey: 'p_typeid',
    })
    property.belongsTo(models.Facing, {
      foreignKey: 'faceid',
    });

    property.belongsTo(models.City, {
      foreignKey: 'city_id',
    });
    property.belongsTo(models.State, {
      foreignKey: 'state_id',
    });
    property.hasMany(models.Responses, {
      foreignKey: 'pro_id',
    });
    property.belongsTo(models.User, {
      foreignKey: 'cus_id',
    });

    property.belongsTo(models.User, {
      foreignKey: 'cus_id',
    });

    property.hasMany(models.Propertyfeature, {
      foreignKey: 'pro_id',
    });
    property.hasMany(models.propertyImage, {
      foreignKey: 'pro_id',
    });

    property.belongsTo(models.SaveOrder, {
      foreignKey: 'subscription_order_id',
    });

  }

  return property;
};
