const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = async (mails) => {
  await sgMail.sendMultiple(mails);
  return {
    numberSent: mails.to.length,
  };
};
module.exports = { sendMail };
