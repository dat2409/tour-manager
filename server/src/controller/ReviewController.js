const { PrismaClient } = require('@prisma/client');
const { order, review, tour } = new PrismaClient();
const moment = require('moment');

class ReviewController {
  async create(req, res, next) {
    const data = req.body;
    // 1 người đi tour nào mới được review tour đấy
    // 1 lần đi => chỉ đc review 1 lần (search trên email đăng ký tour)
    // 1 người đã đi xong có nghĩa là is_paid trong invoice = true
    // cập nhật order.isreviewed = true + create review

    const orders = await order.findMany({
      where: {
        email: data.email,
        tourId: data.tourId,
        is_reviewed: false,
        invoice: {
          isPaid: true
        }
      },
      select: {
        id: true
      }
    })

    if (orders.length > 0) {
      try {
        await review.create({
          data
        })

        await order.updateMany({
          where: {
            email: data.email,
            tourId: data.tourId,
            invoice: {
              isPaid: true
            }
          },
          data: {
            is_reviewed: true
          }
        })

        const selectedTour = await tour.findUnique({
          where: {
            id: data.tourId
          }
        })

        selectedTour.star = (selectedTour.star * selectedTour.numberOfReviews + data.star) / (selectedTour.numberOfReviews + 1);
        selectedTour.numberOfReviews += 1;

        await tour.update({
          where: {
            id: data.tourId
          },
          data: selectedTour
        })

        res.send('Review has been recorded.')
      } catch (error) {
        console.log(error);
      }
    }
    else {
      res.status(202).send('You must finish this tour or you only can review once.')
    }
  }

  showReviewsByTour(req, res, next) {
    review.findMany({
      where: {
        tourId: parseInt(req.params.tourId)
      }
    })
      .then(reviews => {
        for (var i = 0; i < reviews.length; i++) {
          reviews[i].createdAt = moment(reviews[i].createdAt).format("MMMM Do YYYY, h:mm:ss")
        }
        res.send(reviews);
      })
  }
}

module.exports = new ReviewController();
