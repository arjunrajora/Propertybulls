const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const ServiceProvider = sequelize.define('ServiceProvider', {
    category: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    company_name: DataTypes.STRING,
    company_url: DataTypes.STRING,
    company_logo: DataTypes.STRING,
    start: DataTypes.STRING,
    per_name: DataTypes.STRING,
    person_image: DataTypes.STRING,
    landline: DataTypes.STRING,
    mobile: DataTypes.INTEGER,
    address: DataTypes.STRING,
    state_id: DataTypes.INTEGER,
    city_id: DataTypes.INTEGER,
    location_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: "Y",
    }
  }, {
    tableName: 'cms_consultant_posts',
  });
  return ServiceProvider;
};
