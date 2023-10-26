

module.exports =(sequeelize,DataTypes) =>{
    const Loan = sequeelize.define('Loan',{
         name:DataTypes.STRING,
         user_type:DataTypes.STRING,
         email:DataTypes.STRING,
         mobile:DataTypes.STRING,
         location:DataTypes.STRING,
         dob:DataTypes.STRING,
         loan_type:DataTypes.STRING,
         gross_salary:DataTypes.STRING,
         monthly_salary:DataTypes.STRING,
         status:{
            type:DataTypes.STRING,
            defaultValue:"Y",
         }},
         {
             tableName:'cms_loan',
         })
         return Loan;
}