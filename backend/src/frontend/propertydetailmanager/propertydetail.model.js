const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    name: DataTypes.STRING,
    room: DataTypes.STRING,
    featureimage: DataTypes.STRING,
    bath: DataTypes.STRING,
    p_floor: DataTypes.STRING,
    p_typeid: DataTypes.STRING,
    flooring: DataTypes.STRING,
    area_in_sqft: DataTypes.STRING,
    type: DataTypes.STRING,
    tot_price: DataTypes.STRING,
    address2: DataTypes.STRING,
    url: DataTypes.STRING,
    rera_registration: DataTypes.STRING,
    description: DataTypes.STRING,
    location_id: DataTypes.STRING,
    floor: DataTypes.STRING,
    address: DataTypes.STRING,
    ship: DataTypes.STRING,
    area_in_sqft: DataTypes.STRING,
    option: DataTypes.STRING,
    p_unit: DataTypes.STRING,
    latitude: DataTypes.STRING,
    build_id: DataTypes.STRING,
    area: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    pincode: DataTypes.STRING,
    cus_id: DataTypes.INTEGER,
    a_unit: DataTypes.STRING,
    faceid: DataTypes.STRING,


  }, {
    tableName: 'cms_properties',

  });

  Property.associate = function (models) {
    Property.belongsTo(models.Location, {
      foreignKey: 'location_id',
    });
    Property.belongsTo(models.User, {
      foreignKey: 'cus_id',
    });
    Property.belongsTo(models.propertyTypes, {
      foreignKey: 'p_typeid',
    })

    Property.hasMany(models.propertyImage, {
      foreignKey: 'pro_id',
    })
    Property.hasMany(models.propertydetails, {
      foreignKey: 'pro_id',
    })
    Property.hasMany(models.Propertyfeature, {
      foreignKey: 'pro_id',
    })
    Property.belongsTo(models.Facing, {
      foreignKey: 'faceid',
    });
    Property.belongsTo(models.City, {
      foreignKey: 'city_id',
    });
    Property.hasMany(models.Responses, {
      foreignKey: 'pro_id',
    });


  }
  return Property;
};
