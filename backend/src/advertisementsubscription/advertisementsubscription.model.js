const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Advertisementsubscription = sequelize.define('Advertisementsubscription', {
    page: DataTypes.STRING,
    duration: DataTypes.STRING,
    discount: DataTypes.STRING,
    banner: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    redirect_link: DataTypes.STRING,
    name: DataTypes.STRING, 
    advertisement_id: DataTypes.STRING, 
    actual_amount: DataTypes.STRING, 
    package_amount: DataTypes.STRING, 
    end_date: DataTypes.STRING, 
    start_date: DataTypes.STRING, 
    position: DataTypes.STRING, 
    PayerID: DataTypes.STRING,
    reference: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Y",
    },

  },
   {
    tableName: 'advertisement_subscription',


  });
  Advertisementsubscription.associate = function (models) {
    Advertisementsubscription.belongsTo(models.Advertisement, {
      foreignKey: 'advertisement_id',
    });
  };
  return Advertisementsubscription;
};
