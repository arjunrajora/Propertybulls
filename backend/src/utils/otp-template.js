const sendOtpTemplate = ({ toNumber, channel }) => ({ to: toNumber, channel, locale: 'en' });

const verifyOtpTemplate = ({ toNumber, code }) => ({ to: toNumber, code, locale: 'en' });

module.exports = { sendOtpTemplate, verifyOtpTemplate };
