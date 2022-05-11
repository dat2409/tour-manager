const Queue = require('bull');
const { PrismaClient } = require('@prisma/client');
const { order } = new PrismaClient();
const nodemailer = require('nodemailer');
const { REDIS_URL, USER_EMAIL, PASSWORD_EMAIL } = process.env;

class BookingController {
  /**
   * [POST]
   * /booking/:tourId
   */
  async create(req, res, next) {
    const newOrder = req.body;
    newOrder.tourId = parseInt(req.params.tourId);
    newOrder.quantity = parseInt(newOrder.quantity);
    newOrder.totalPrice = parseInt(newOrder.totalPrice);

    order.create({
      data: newOrder
    })
      .then(() => {
        const sendEmailQueue = new Queue('emailPayment', REDIS_URL);

        const queueOptions = {
          attempts: 2,
        }

        const data = {
          email: newOrder.email
        };

        sendEmailQueue.add(data, queueOptions);

        sendEmailQueue.process(async job => {
          return await sendMail(job.data.email);
        });

        function sendMail(email) {
          return new Promise((resolve, reject) => {
            var transporter = nodemailer.createTransport({
              service: 'Gmail',
              auth: {
                user: USER_EMAIL,
                pass: PASSWORD_EMAIL
              },
              tls: {
                rejectUnauthorized: false
              }
            });

            var content = `
            <div style="padding: 10px; background-color: #003375">
              <div style="padding: 10px; background-color: white;">
                <h1 style="color: blue">SetSail Tour Travel Announcement</h1>
                <h2 style="color: green">You've already deposited successfully tour <span style="color: purple">${req.query.tourName}</span> with following information:</h2>
                <ul>
                  <h3>
                    <li>Full Name: ${newOrder.fullName}</li>
                    <li>Phone Number: ${newOrder.phoneNumber}</li>
                    <li>Quantity: ${newOrder.quantity}</li>
                    <li>Address: ${newOrder.address}</li>
                    <li>Note: ${newOrder.note}</li>
                    <li>Total: ${newOrder.totalPrice} ($)</li>
                    <li>Amount of deposit: ${newOrder.totalPrice * 0.5} ($)</li>
                  </h3>
                </ul>
                <h2>Please pay the deposit according to the following information:</h2>
                <ul>
                  <h3>
                    <li>Account holder : THAI DOAN DAT</li>
                    <li>Account number: 12910000144428</li>
                    <li>Bank: BIDV</li>
                  </h3>
                </ul>
                <h3 style="color: red">Note: If payment is not completed, your booking will be cancelled. </h3>
              </div>
            </div>
            `;

            var mailOptions = {
              from: 'SetSail Tour Travel',
              to: email,
              subject: 'Confirm homestay booking information',
              html: content
            }

            transporter.sendMail(mailOptions, function (err, info) {
              if (err) {
                reject(err);
              } else {
                console.log('Message sent: ' + info.response);
                res.send('ok');
              }
            })
          });
        }
      })
  }
}

module.exports = new BookingController()
