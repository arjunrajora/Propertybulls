const { Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        package_id: DataTypes.STRING,
        user_id: DataTypes.STRING,
        amount: DataTypes.STRING,
        pkg_expiredate: DataTypes.DATE, // Change data type to DATE
        validity: DataTypes.STRING,
        discount: DataTypes.STRING,
        othertext: DataTypes.STRING,
        noofenquires: DataTypes.STRING,
        higherpositioninsearch: DataTypes.STRING,
        emailpromotions: DataTypes.STRING,
        propertyvisibility: DataTypes.STRING,
        notificationtobuyers: DataTypes.STRING,
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
        tableName: 'cms_razorpay_payments',
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


    Order.associate = function (models) {
        Order.belongsTo(models.Subscription, {
            foreignKey: 'package_id',
        });
        Order.belongsTo(models.User, {
            foreignKey: 'user_id',
        });

    }

    return Order;
};
