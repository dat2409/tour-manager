const { PrismaClient } = require("@prisma/client");
const { order } = new PrismaClient();
const sendMail = require("../helpers/send-mail");

class BookingController {
  /**
   * [POST]
   * /booking/:tourId
   */
  async create(req, res, next) {
    const tourId = parseInt(req.params.tourId);

    const newOrder = await order.create({
      data: {
        tourId,
        ...req.body,
      },
    });

    var content = `
      <div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white;">
          <h1 style="color: blue">SetSail Tour Travel Announcement</h1>
          <h2 style="color: green">You've already deposited successfully tour <span style="color: purple">${
            req.query.tourName
          }</span> with following information:</h2>
          <ul>
            <h3>
              <li>Team Lead's Name: ${newOrder.teamLeadName}</li>
              <li>Team Lead's Phone Number: ${newOrder.teamLeadPhoneNumber}</li>
              <li>Quantity: ${newOrder.quantity}</li>
              <li>Note: ${newOrder.note}</li>
              <li>Total: ${newOrder.totalPrice} ($)</li>
              <li>Amount of deposit: ${newOrder.totalPrice} ($)</li>
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

    sendMail({
      from: "<setsail@travel.vn>",
      to: [newOrder.teamLeadEmail],
      subject: "Confirm homestay booking information",
      html: content,
      textContent: ""
    }).then(() => res.sendStatus(200));
  }
}

module.exports = new BookingController();
