const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_AUTH_USER,
    pass: process.env.MAILTRAP_AUTH_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});
const sendMail = async (mailInfo) => {
  await transporter.sendMail(mailInfo);
  transporter.close();
  return {
    numberSent: mailInfo.to.length,
  };
};
module.exports = { sendMail };
