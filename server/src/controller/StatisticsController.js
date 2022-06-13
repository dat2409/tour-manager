const { PrismaClient } = require('@prisma/client');
const { order } = new PrismaClient();
const prisma = new PrismaClient();

class StatisticsController {
  guestByMonth(req, res, next) {
    // select month(tour.departureTime) as month, sold from`order`, tour where`order`.tourId = tour.id group by month(tour.departureTime)
  }
}

module.exports = new StatisticsController();
