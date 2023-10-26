const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const SaveOrder = sequelize.define('SaveOrder', {
        package_id: DataTypes.STRING,
        user_id: DataTypes.STRING,
        role_id: DataTypes.STRING,
        amount: DataTypes.STRING,
        pkg_expiredate: DataTypes.DATE, 
        validity: DataTypes.STRING,
        f1: DataTypes.STRING,
        f2: DataTypes.STRING,
        discount: DataTypes.STRING,
        razorpay_order_id: DataTypes.STRING,
        razorpay_signature: DataTypes.STRING,
        razorpay_payment_id: DataTypes.STRING,
        status: {
            type: DataTypes.STRING,
            defaultValue: "Y",
        },
        order_status: {
            type: DataTypes.STRING,
            defaultValue: "P",
        }
    }, {
        tableName: 'cms_orders',
        hooks: {
            beforeCreate: (order, options) => {
                if (order.validity && !isNaN(order.validity)) {
                    const validityDays = parseInt(order.validity);
                    const currentDate = new Date();
                    const expireDate = new Date(currentDate);
                    expireDate.setDate(currentDate.getDate() + validityDays);

                    order.pkg_expiredate = expireDate;
                }
            },
        },
    });
    SaveOrder.associate = function (models) {
        SaveOrder.belongsTo(models.Subscription, {
            foreignKey: 'package_id',
        });
        SaveOrder.belongsTo(models.User, {
            foreignKey: 'user_id',
        });

        SaveOrder.belongsTo(models.Role, {
            foreignKey: 'role_id',
        });
        SaveOrder.hasMany(models.Project, {
            foreignKey: 'subscription_order_id',
        });
  
    }

    return SaveOrder;
};
