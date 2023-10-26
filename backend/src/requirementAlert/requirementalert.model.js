module.exports =(sequeelize,DataTypes) =>{
    const Requirementalert = sequeelize.define('Requirementalert',{
         fname:DataTypes.STRING,
         email:DataTypes.STRING,
         phone:DataTypes.STRING,
         p_typeid:DataTypes.STRING,
         category:DataTypes.STRING,
         state_id:DataTypes.STRING,
         city_id:DataTypes.STRING,
         location_id:DataTypes.STRING,
         min_budget:DataTypes.STRING,
         max_budget:DataTypes.STRING,

         status:{
            type:DataTypes.STRING,
            defaultValue:"Y",
         }},
         {
             tableName:'cms_alertrequirements',
         })
              
        Requirementalert.associate = function (models) {
  //   // associations can be defined here
    Requirementalert.belongsTo(models.propertyTypes, {
      foreignKey: 'p_typeid',
    });

    Requirementalert.belongsTo(models.Location, {
      foreignKey: 'location_id',
    });

    Requirementalert.belongsTo(models.City, {
      foreignKey: 'city_id',
    });
    Requirementalert.belongsTo(models.State, {
      foreignKey: 'state_id',
    });




  };


 return Requirementalert;
}