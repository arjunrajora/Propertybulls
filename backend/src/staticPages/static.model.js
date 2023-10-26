

module.exports =(sequeelize,DataTypes) =>{
    const Static = sequeelize.define('Static',{
         title:DataTypes.STRING,
         image:DataTypes.STRING,
         content:DataTypes.STRING,
         status:{
            type:DataTypes.STRING,
            defaultValue:"Y",
         }},
         {
             tableName:'cms_statics',
         })
         return Static;
}