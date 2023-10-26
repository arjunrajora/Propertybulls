const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const FCM = admin.messaging();
const notificationOptions = {
  priority: 'high',
  timeToLive: 60 * 60 * 24,
};
// subscribe user to a topic
const subscribeToTopic = async ({ registrationTokens, topic }) => {
  try {
    const response = await FCM.subscribeToTopic(registrationTokens, topic);
    return {
      error: null,
      data: response,
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};
const sendToDevice = async ({ registrationToken, message }) => {
  const data = await FCM.sendToDevice(
    registrationToken,
    message,
    notificationOptions,
  );
  return data;
};
// send notification to multiple devices
const sendToDevices = async ({ message }) => {
  const data = await FCM.sendAll(message);
  return data;
};
// send notification to a topic
const sendToTopic = async ({ topic, payload }) => {
  try {
    const message = {
      data: payload,
      tokens: topic,
    };
    const response = await FCM.send(message);
    return {
      error: null,
      data: response,
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};
// send notification to conditionl topic
const sendToCondition = async ({ condition, payload }) => {
  try {
    const message = {
      data: payload,
      condition,
    };
    const response = await FCM.send(message);
    return {
      error: null,
      data: response,
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};
// send multiple messages(array of message, can be to device, devices, topic or condiational topics)
const sendAll = async ({ messages }) => {
  try {
    const response = await FCM.sendAll(messages);
    return {
      error: null,
      data: response,
    };
  } catch (error) {
    return {
      error,
      data: null,
    };
  }
};
module.exports = {
  subscribeToTopic,
  sendToDevice,
  sendToDevices,
  sendToTopic,
  sendToCondition,
  sendAll,
};
