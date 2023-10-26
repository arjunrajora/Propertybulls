const { Subscription, Order, User, SaveOrder, Role } = require("../db");

// const { generateJWT, verifyJWT } = require("../../utils/jwt");

// const { NotFoundError, BadRequestError } = require("../../utils/api-errors");


// // subscription Add 
const doSubscription = async ({
  role_id,
  package_name,
  package_price,
  package_discount,
  package_validity,
  f1,
  f2,
  f3,
  f4,
  f5,
  f6,
  f7,
  f8,
  f9,
  f10,
}) => {
  const subscription = await Subscription.create({
    role_id,
    package_name,
    package_price,
    package_discount,
    package_validity,
    f1,
    f2,
    f3,
    f4,
    f5,
    f6,
    f7,
    f8,
    f9,
    f10,
  });
  return { subscriptionId: subscription.id };
};



// View Subscription
const doGetSubscription = async ({ BadRequestError, Subscription, Role }) => {
  const subscription = await Subscription.findAll({
    order: [["createdAt", "DESC"]],
    include: { model: Role }
  });
  if (subscription[0] == 0) throw new BadRequestError("Please try again later");
  return subscription;
};





// delete subscriptions
const doDeleteSubscription = async ({
  id
}) => {
  const subscription = await Subscription.destroy({
    where: {
      id: id,
    },
  })
  if (subscription == 0) throw new BadRequestError('id not match ');
  return subscription[0];
};

// Update Subscription
const doUpdateSubscription = async ({ id, Subscription, BadRequestError, SubscriptionUpdateData }) => {
  const data = await Subscription.update(SubscriptionUpdateData, {
    where: {
      id: id,
    },
  });
  if (data[0] == 0) throw new BadRequestError("id not match");
  return data;
};

// City Subscription By Id
const doGetSubscriptionById = async ({ id }) => {
  const data = await Subscription.findOne({
    where: {
      id,
    },
  });
  return data;
};

// View Subscriptionpkg
const doGetSubscriptionPackage = async ({ BadRequestError, SaveOrder, User, Subscription, Role }) => {
  const orderpkg = await SaveOrder.findAll({
    include: [{ model: Subscription },
    { model: User }, { model: Role }],
    order: [["createdAt", "DESC"]],
  });
  if (orderpkg[0] == 0) throw new BadRequestError("Please try again later");
  return orderpkg;
};





// Search subscriptions 
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const doSearchSubscription = async ({
  package_id,
  name,
  mobile,
  user_id,
  role_id,
  username,
  package_name,
  pkg_startdate,
  pkg_expiredate,
  SaveOrder,
  BadRequestError,
  Subscription,
  User,
  Role
}) => {

  let newobject = {};
  if (role_id) {
    newobject.role_id = { [Op.like]: `%${role_id}%` }
  }
  if (user_id) {
    newobject.user_id = { [Op.like]: `%${user_id}%` }
  } if (package_id) {
    newobject.package_id = { [Op.like]: `%${package_id}%` }
  }
  if (name) {
    // Search for the name in the Users table
    newobject['$User.name$'] = { [Sequelize.Op.like]: `%${name}%` };
  }
  if (mobile) {
    // Search for the name in the Users table
    newobject['$User.mobile$'] = { [Sequelize.Op.like]: `%${mobile}%` };
  }
  if (username) {
    // Search for the username in the Users table
    newobject['$User.username$'] = { [Sequelize.Op.like]: `%${username}%` };
  }
  if (package_name) {
    // Search for the package_name in the Users table
    newobject['$Subscription.package_name$'] = { [Sequelize.Op.like]: `%${package_name}%` };
  }

  const moment = require('moment');
  const startOfTheDay = moment(pkg_startdate, 'YYYY-MM-DD').startOf('day').format('YYYY-MM-DD');
  const endOfTheDay = moment(pkg_expiredate, 'YYYY-MM-DD').endOf('day').format('YYYY-MM-DD');
  if (pkg_startdate) {
    newobject.createdAt = {
      [Op.between]: [
        moment(startOfTheDay).startOf('day'),
        moment(endOfTheDay).endOf('day'),
      ],
    }
  }

  // const moment = require('moment');
  // const now = moment();
  // if (pkg_startdate) {
  //   newobject.createdAt = {
  //     [Op.between]: [
  //       moment(pkg_startdate).startOf('day'),
  //       moment(pkg_expiredate).endOf('day'),
  //     ],
  //   }
  // }

  // return false;
  const data = await SaveOrder.findAll({
    where: newobject,
    // order: [['name', 'ASC']],
    include: [{ model: Role }, { model: User }, { model: Subscription }],
  });

  // if (data[0] == 0) throw new BadRequestError("Data Not Match");
  return data;
};










// view roles
const doGetRole = async ({ BadRequestError, Role }) => {
  const role = await Role.findAll({
    order: [["createdAt", "ASC"]],
    limit: 3
  });
  if (role[0] == 0) throw new BadRequestError("Please try again later");
  return role;
};








module.exports = {
  doSubscription,
  doGetSubscription,
  doGetSubscriptionById,
  doDeleteSubscription,
  doUpdateSubscription,
  doGetSubscriptionPackage,
  doGetRole,
  doSearchSubscription
  // doUpdateCityStatus,

  // doGetState
};
