const {
  API_KEY,
  WEB_URL,
  EMAIL,
} = require('config');

const mailer = require('./email');

mailer.setApiKey(
  API_KEY,
);

const sendBulkMail = ({ list, token }) => {
  const msg = {
    to: list,
    from: EMAIL,
    text: 'Welcome to Glu Online Learning Platform!',
    html: `<h4> Welcome to Glu!</h4>Please click on the below link to join!<br><a href=${WEB_URL}/verification?ref=${token}> Join </a> `,
    subject: 'Invitation',
  };

  mailer.send(msg, (err, json) => {
    if (err) {
      console.log(err);
    } else {
      console.log('success');
    }
  });
};
module.exports = {
  sendBulkMail,
};
