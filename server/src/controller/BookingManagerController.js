const { PrismaClient } = require("@prisma/client");
const { invoice, tour, order } = new PrismaClient();
const nodemailer = require("nodemailer");
const Queue = require("bull");
const { REDIS_URL, USER_EMAIL, PASSWORD_EMAIL } = process.env;

class BookingManagerController {
  /**
   * [POST]
   * /booking-manager/invoices/:orderId
   */
  async createInvoice(req, res, next) {
    const thisOrder = await order.findUnique({
      where: {
        id: parseInt(req.params.orderId),
      },
      include: {
        tour: true,
      },
    });

    const sold = thisOrder.tour.sold + thisOrder.quantity;

    const newInvoice = invoice.create({
      data: {
        orderId: parseInt(req.params.orderId),
      },
    });

    const updatedTour = tour.update({
      where: {
        id: thisOrder.tourId,
      },
      data: {
        sold,
      },
    });

    const updatedOrder = order.update({
      where: {
        id: parseInt(req.params.orderId),
      },
      data: {
        isDeposited: true,
      },
    });

    await Promise.all([newInvoice, updatedTour, updatedOrder]);

    const sendEmailQueue = new Queue("emailPayment", REDIS_URL);

    const queueOptions = {
      attempts: 2,
    };

    const data = {
      email: thisOrder.email,
    };

    sendEmailQueue.add(data, queueOptions);

    sendEmailQueue.process(async (job) => {
      return await sendMail(job.data.email);
    });

    function sendMail(email) {
      return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: USER_EMAIL,
            pass: PASSWORD_EMAIL,
          },
          tls: {
            rejectUnauthorized: false,
          },
        });

        var content = `
        <div style="padding: 10px; background-color: #003375">
          <div style="padding: 10px; background-color: white;">
            <h1 style="color: blue">SetSail Tour Travel Announcement</h1>
            <h2 style="color: green">You've already deposited successfully tour <span style="color: purple">${
              thisOrder.tour.name
            }</span> with following information:</h2>
            <ul>
              <li>Full Name: ${thisOrder.fullName}</li>
              <li>Phone Number: ${thisOrder.phoneNumber}</li>
              <li>Quantity: ${thisOrder.quantity}</li>
              <li>Address: ${thisOrder.address}</li>
              <li>Note: ${thisOrder.note}</li>
              <li>Total: ${thisOrder.totalPrice} ($)</li>
              <li>Deposited: ${thisOrder.totalPrice} ($)</li>
            </ul>
          </div>
        </div>
        `;

        var mainOptions = {
          from: "SetSail Tour Travel",
          to: email,
          subject: "Confirm deposit successfully",
          html: content,
        };

        transporter.sendMail(mainOptions, function (err, info) {
          if (err) {
            reject(err);
          } else {
            console.log("Message sent: " + info.response);
            res.send("ok");
          }
        });
      });
    }
  }

  /**
   * [GET]
   * /booking-manager/invoices/:invoiceId
   */
  showInvoice(req, res, next) {
    invoice
      .findFirst({
        where: {
          id: parseInt(req.params.invoiceId),
        },
        include: {
          order: {
            include: {
              tour: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      })
      .then((invoice) => res.send(invoice));
  }

  /**
   * [GET]
   * /booking-manager/orders/:orderId
   */
  showOrder(req, res, next) {
    order
      .findFirst({
        where: {
          id: parseInt(req.params.orderId),
        },
        include: {
          tour: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      })
      .then((order) => res.send(order));
  }

  /**
   * [GET]
   * /booking-manager/invoices
   */
  allInvoices(req, res, next) {
    invoice
      .findMany({
        include: {
          order: {
            include: {
              tour: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      })
      .then((invoices) => res.send(invoices));
  }

  /**
   * [GET]
   * /booking-manager/orders
   */
  allOrders(req, res, next) {
    order
      .findMany({
        include: {
          tour: true,
        },
      })
      .then((orders) => res.send(orders));
  }

  /**
   * [GET]
   * /booking-manager/invoices/edit/:invoiceId
   */
  editInvoice(req, res, next) {
    invoice
      .findFirst({
        where: {
          id: parseInt(req.params.invoiceId),
        },
        include: {
          order: {
            include: {
              tour: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      })
      .then((invoice) => res.send(invoice));
  }

  /**
   * [PATCH]
   * /booking-manager/invoices/:invoiceId
   */
  async updateInvoice(req, res, next) {
    const thisInvoice = await invoice.findFirst({
      where: {
        id: parseInt(req.params.invoiceId),
      },
    });

    const isPaid = thisInvoice.isPaid;

    invoice
      .update({
        where: {
          id: parseInt(req.params.invoiceId),
        },
        data: {
          isPaid: !isPaid,
        },
      })
      .then((invoice) => res.send(invoice));
  }

  /**
   * [GET]
   * /booking-manager/orders/:orderId
   */
  async deleteOrder(req, res, next) {
    const thisOrder = await order.findFirst({
      where: {
        id: parseInt(req.params.orderId),
      },
    });

    if (thisOrder.isDeposited) {
      res.send(`This customer is deposited, you can't delete this order`);
    } else {
      order
        .delete({
          where: {
            id: parseInt(req.params.orderId),
          },
        })
        .then((order) => res.send(order));
    }
  }

  sendEmail(req, res, next) {
    var transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "thaidat2409@gmail.com",
        pass: "dattrong1@",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    var content = "";
    content += `
    <div style="padding: 10px; background-color: #003375">
      <div style="padding: 10px; background-color: white;">
        <h4 style="color: #0085ff">Gửi mail với nodemailer và express</h4>
        <span style="color: black">Đây là mail test</span>
      </div>
    </div>
    `;

    var mainOptions = {
      from: "SetSail Tour Travel",
      to: "thaidoandat1@gmail.com",
      subject: "Confirm deposit successfully",
      text: "abcd",
      html: content,
    };

    transporter.sendMail(mainOptions, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("Message sent: " + info.response);
        res.send("ok");
      }
    });
  }
}

module.exports = new BookingManagerController();
