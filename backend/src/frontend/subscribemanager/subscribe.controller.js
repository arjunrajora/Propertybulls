// subscribe Nwwsletter
const subscribeAdd = ({
  BadRequestError,
  doCheckUserExist,
  doSubscribe,
  validateAddSubscribeData
}) => async (httpRequest) => {
  const { username } = httpRequest.body;
  const { error } = validateAddSubscribeData(httpRequest.body);
  if (error) throw new BadRequestError(error.message);
  try {
    await doCheckUserExist({
      username,
    });
  } catch (err) {
    // user doesn't exist
    const data = await doSubscribe({
      username,
    });
    return {
      statusCode: 200,
      body: {
        success: true,
        message: 'Thankyou for Send message!',
        data,
      },
    };
  };
  throw new BadRequestError('Email Already Exist!');
};



// Subscription view 
const getSubscription = ({
  BadRequestError,
  doGetSubscription,
  Subscription
}) => async (httpRequest) => {

  const data = await doGetSubscription({
    BadRequestError,
    Subscription
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


// Subscription confirmation view  
const getSubscriptionconfirmation =
  ({ doGetSubscriptionconfirmation, Order, Subscription, User }) =>
    async (httpRequest) => {
      const { user_id } = httpRequest.body;
      const data = await doGetSubscriptionconfirmation({
        user_id,
        Order,
        Subscription,
        User
      });
      console.log("data==>>", data);
      return {
        statusCode: 200,
        body: {
          success: true,
          message: " Subscription package confirmation!",
          data,
        },
      };
    };



//subscription by for pkg
const orderNow = ({
  BadRequestError,
  doOrder,
}) => async (httpRequest) => {
  const {
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
    razorpay_signature,
    razorpay_payment_id,

  } = httpRequest.body;
  const data = await doOrder({
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
    razorpay_signature,
    razorpay_payment_id,
  });

  console.log("Data", data)
  return {
    statusCode: 200,
    body: {
      success: true,
      message: 'Thank you for subscribing to our package!',
      data,
    },
  };
};


// Update order
const updateOrder =
  ({ doUpdateOrder, Order, BadRequestError, }) =>
    async (httpRequest) => {
      const OrderUpdateData = httpRequest.body;
      console.log("OrderUpdateData", OrderUpdateData)

      const data = await doUpdateOrder({

        Order,
        BadRequestError,
        OrderUpdateData,
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: "Order Create  successfully!",
          data,
        },
      };
    };



const getRazorpayid =
  ({ doGetRazorpayid, Order }) =>
    async (httpRequest) => {
      const { razorpay_order_id } = httpRequest.body;
      const data = await doGetRazorpayid({
        razorpay_order_id,
        Order,

      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: " Subscription package confirmation!",
          data,
        },
      };
    };




// my subscriptions package view  

const getSubscriptionconPackage =
  ({ doGetSubscriptionPackage, SaveOrder, Subscription, User,Project }) =>
    async (httpRequest) => {
      const { user_id } = httpRequest.body;
      const data = await doGetSubscriptionPackage({
        user_id,
        SaveOrder,
        Subscription,
        User,
        Project
      });
      return {
        statusCode: 200,
        body: {
          success: true,
          message: " Subscription package confirmation!",
          data,
        },
      };
    };




    
module.exports = {
  subscribeAdd,
  getSubscription,
  orderNow,
  getSubscriptionconfirmation,
  updateOrder,
  getRazorpayid,
  getSubscriptionconPackage


}