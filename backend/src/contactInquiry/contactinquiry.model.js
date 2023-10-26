module.exports = (sequeelize, DataTypes) => {
    const Contactinquiry = sequeelize.define('Contactinquiry', {
        fname: DataTypes.STRING,
        phone: DataTypes.STRING,
        pro_id: DataTypes.STRING,
        message: DataTypes.STRING,
        email: DataTypes.STRING,
        cus_id: DataTypes.STRING,
    },
        {
            tableName: 'cms_responses',
        })

    Contactinquiry.associate = function (models) {
        Contactinquiry.belongsTo(models.Property, {
            foreignKey: 'pro_id',
        });

        Contactinquiry.belongsTo(models.Customer, {
            foreignKey: 'cus_id',
        });
    }







    return Contactinquiry;
}