const { PrismaClient } = require('@prisma/client');
const { guess } = new PrismaClient();

class GuestsController {
  async create(req, res) {
    const guestsInfo = req.body
    const orderId = guestsInfo.pop().bookingId
    guestsInfo.map(guestInfo => guestInfo.orderId = orderId)
    await guess.createMany({
      data: guestsInfo,
      skipDuplicates: true
    })
    return res.sendStatus(201)
  }
}
module.exports = new GuestsController()
