const { validateUpdateStatus } = require("./subscription.validator");


// Subscription  Controller
const subscriptionAdd =
  ({ BadRequestError, doSubscription, }) =>
    async (httpRequest) => {
      const { role_id,
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
      } = httpRequest.body;
      const subscriptionResult = await doSubscription({
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
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Subscription added successfully!",
          data: subscriptionResult,
        },
      };
    };



// View Subscription
const getSubscription = ({
  BadRequestError,
  doGetSubscription,
  Subscription,
  Role
}) => async (httpRequest) => {

  const data = await doGetSubscription({
    BadRequestError,
    Subscription,
    Role
  });

  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Subscription Fetch successfully!',
      data,
    },
  };
};

// Delete Subscription
const deleteSubscription = ({ BadRequestError, Subscription, doDeleteSubscription,
}) => async (httpRequest) => {
  const { id } = httpRequest.params;
  const data = await doDeleteSubscription({
    id,
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Subscription package deleted successfully!',
      data,
    },
  };
};

// Update Subscription
const updateSubscription =
  ({ doUpdateSubscription, Subscription, BadRequestError }) =>
    async (httpRequest) => {
      const { id } = httpRequest.params;
      const SubscriptionUpdateData = httpRequest.body;
      const data = await doUpdateSubscription({
        id,
        Subscription,
        BadRequestError,
        SubscriptionUpdateData,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Subscription updated successfully!",
          data,
        },
      };
    };

// View By Id Subscription
const getSubscriptionById =
  ({ doGetSubscriptionById, Subscription }) =>
    async (httpRequest) => {
      const { id } = httpRequest.params;
      const data = await doGetSubscriptionById({
        id,
        Subscription,
      });
      console.log("data==>>", data);
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "fetched Subscription successfully!!!!!!!",
          data,
        },
      };
    };


// View Subscriptionpkgs
const getSubscriptionPackage =
  ({ BadRequestError, doGetSubscriptionPackage, SaveOrder, User, Subscription, Role }) =>
    async (httpRequest) => {
      const data = await doGetSubscriptionPackage({
        SaveOrder,
        BadRequestError,
        Subscription,
        User,
        Role
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Fetched SubscriptionPackage  successfully!",
          data,
        },
      };
    };

// search Subscriptions 

const searchSubscription = ({
  doSearchSubscription,
  SaveOrder,
  BadRequestError,
  Subscription,
  User,
  Role
}) => async (httpRequest) => {
  const { package_id, user_id, role_id, pkg_expiredate, name, mobile, username, package_name, pkg_startdate } = httpRequest.body;
  console.log("BODY DATA=>>>", httpRequest.body);
  // return false
  const data = await doSearchSubscription({
    package_id,
    user_id,
    role_id,
    name,
    username,
    pkg_startdate,
    pkg_expiredate,
    SaveOrder,
    BadRequestError,
    Subscription,
    User,
    Role,
    mobile,
    package_name
  });
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Subscription packages Search successfully!',
      data,
    },
  };
};





// View roles
const getRole = ({
  BadRequestError,
  doGetRole,
  Role
}) => async (httpRequest) => {

  const data = await doGetRole({
    BadRequestError,
    Role
  });

  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Role Fetch successfully!',
      data,
    },
  };
};









module.exports = {
  subscriptionAdd,
  getSubscription,
  getSubscriptionById,
  updateSubscription,
  getSubscriptionPackage,
  getRole,
  deleteSubscription,
  searchSubscription
};
