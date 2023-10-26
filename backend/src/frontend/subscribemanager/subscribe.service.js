
const { Subscribe, sequelize, Email, Subscription, Order, User, SaveOrder ,Project} = require("../../db");

const { generateJWT, verifyJWT } = require("../../utils/jwt");
const { subscribeTemplate } = require("../../utils/email-templates");
const emailTransporter = require('../../utils/email');
const Razorpay = require('razorpay');
const { NotFoundError, BadRequestError } = require("../../utils/api-errors");
const subscribe = require(".");

// Subscribe Add
// const doSubscribe = async ({ username }) => {
//   const subscribe = await Subscribe.create({ username });
//   return { subscribeId: subscribe.id };
// };
const doSubscribe = async ({
  username,
}) => {
  const subscribe = await Subscribe.create({
    username,
  });
  const emailtempleate = await Email.findOne({
    where: {
      id: 60
    },
  });

  let email = username;
  let template;
  template = subscribeTemplate({
    fromUser: "Property bull",
    fromEmail: "contact@propertybull.com",
    toEmail: email,
    username: username,
    html: emailtempleate.dataValues.description,
    subject: emailtempleate.dataValues.subject
  });
  console.log(" username:", username)
  const result = await emailTransporter.send(template);
  return {
    subscribeId: subscribe.id,
  };
};
const doCheckUserExist = async ({ username }) => {
  username = username.toLowerCase();
  const subscribe = await Subscribe.findOne({
    where: {
      username: username,
    },
  });

  if (!subscribe) throw new NotFoundError("Subscribe not found!");
  return subscribe;
};



// Subscription View 
const doGetSubscription = async ({ BadRequestError }) => {
  const subscription = await Subscription.findAll();
  if (subscription == '') throw new BadRequestError("please try again");
  return subscription;
};


// Subscription confirmation 
const doGetSubscriptionconfirmation = async ({ Subscription, user_id }) => {
  const data = await Order.findOne({
    where: { user_id, },
    include: [{ model: Subscription },
    { model: User }],
    order: [["createdAt", "DESC"]],

  });
  return data;
};


const razorpay = new Razorpay({
  key_id: 'rzp_test_ZL1wkQfxNIacl5',
  key_secret: 'WcApSUvwtcDKO6dFiCtLCshu',
});
// subscription pkg buy 
const doOrder = async ({
  package_id,
  user_id,
  amount,
  pkg_expiredate,
  validity,
  discount,
  othertext,
  noofenquires,
  higherpositioninsearch,
  emailpromotions,
  propertyvisibility,
  notificationtobuyers,

}) => {

  const options = {
    amount: amount * 100, // Amount in paise (100 paise = 1 INR)
    currency: 'INR',
  };
  const order = await razorpay.orders.create(options);

  const razorpay_order_id = order.id;

  const orderres = await Order.create({
    package_id,
    user_id,
    amount,
    pkg_expiredate,
    validity,
    discount,
    othertext,
    noofenquires,
    higherpositioninsearch,
    emailpromotions,
    propertyvisibility,
    notificationtobuyers,
    razorpay_order_id,

  });

  // });
  return order;



};


// Update Order
// const doUpdateOrder = async ({ id, Order, BadRequestError, OrderUpdateData }) => {
//   const data = await Order.update(OrderUpdateData, {
//     where: {
//       id: id,
//     },
//   });
//   console.log("Order_Data", OrderUpdateData)
//   if (data[0] == 0) throw new BadRequestError("id not match");
//   return data;
// };

const doUpdateOrder = async ({ id, Order, BadRequestError, OrderUpdateData }) => {
  const modifiedOrderUpdateData = {
    ...OrderUpdateData,
    order_status: "A", // Set the order_status to "A"
  };
  console.log("OrderUpdateData", OrderUpdateData)
  console.log("modifiedOrderUpdateData.razorpay_order_id", modifiedOrderUpdateData.razorpay_order_id)
  const data = await Order.update(modifiedOrderUpdateData, {
    where: {
      razorpay_order_id: modifiedOrderUpdateData.razorpay_order_id,

    },
  });
  if (data[0] === 0) {
    throw new BadRequestError("id not match");
  }

  return data;
};

const doGetRazorpayid = async ({ Subscription, razorpay_order_id }) => {
  const data = await Order.findOne({
    where: { razorpay_order_id, },


  });
  console.log("Data", data)

  const orderres = await SaveOrder.create({
    package_id: data.dataValues.package_id,
    user_id: data.dataValues.user_id,
    amount: data.dataValues.amount,
    pkg_expiredate: data.dataValues.pkg_expiredate,
    validity: data.dataValues.validity,
    discount: data.dataValues.discount,
    othertext: data.dataValues.othertext,
    noofenquires: data.dataValues.noofenquires,
    higherpositioninsearch: data.dataValues.higherpositioninsearch,
    emailpromotions: data.dataValues.emailpromotions,
    propertyvisibility: data.dataValues.propertyvisibility,
    notificationtobuyers: data.dataValues.notificationtobuyers,
    razorpay_order_id: data.dataValues.razorpay_order_id,
    razorpay_signature: data.dataValues.razorpay_signature,
    razorpay_payment_id: data.dataValues.razorpay_payment_id,

  });
  return data;
};



// my subscription package view
const doGetSubscriptionPackage = async ({ Subscription, user_id }) => {
  const data = await SaveOrder.findAll({
    where: { user_id, },
    include: [{ model: Subscription },
    { model: User },
    { model: Project }],
    order: [["createdAt", "DESC"]],

  });
  return data;
};



module.exports = {
  doSubscribe,
  doCheckUserExist,
  doGetSubscription,
  doOrder,
  doGetSubscriptionconfirmation,
  doUpdateOrder,
  doGetRazorpayid,
  doGetSubscriptionPackage
};
