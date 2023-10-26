module.exports = (sequelize, DataTypes) => {
  const Shortlist = sequelize.define('Shortlist', {
    pro_id: DataTypes.INTEGER,
    ip_add: DataTypes.STRING,
    usr_id: DataTypes.INTEGER,
  },
   {
    tableName: 'cms_shortlists',
  });
  Shortlist.associate = function (models) {
    Shortlist.belongsTo(models.Property, {
      foreignKey: 'pro_id',
     })
    }
  return Shortlist;
};
