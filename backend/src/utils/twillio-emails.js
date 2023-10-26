const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const sendEventMail = (emailList, eventName) => {
    const msg = {
        to: emailList, // replace these with your email addresses
        from: 'Glu Learning <glu@learning.com>',
        subject: `You are invited for ${eventName}`,
        text: 'Fresh donuts are out of the oven. Get them while they’re hot!',
        html:
            '<p>Fresh donuts are out of the oven. Get them while they’re <em>hot!</em></p>',
    };

    sgMail
        .sendMultiple(msg)
        .then(() => {
            console.log('emails sent successfully!');
        })
        .catch((error) => {
            console.log(error);
        });
};
sendEventMail(['arpittrivedi2425@gmail.com'], 'Demo');
