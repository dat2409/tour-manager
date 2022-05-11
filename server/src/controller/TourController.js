const { PrismaClient, Prisma } = require('@prisma/client');
const { tourService, tour, plan, destination } = new PrismaClient();
const prisma = new PrismaClient();
class TourController {
  /**
   * [POST]
   * /tours/
   */
  create(req, res, next) {
    const { name, departure, departureDay, departureTimeReq, price, desc, maxPeople,
      flight, planId, services } = req.body;

    const departureTime = new Date(`${departureDay} ${departureTimeReq}`)

    const listServices = [];
    for (var i = 0; i < services.length; i++) {
      listServices[i] = {
        service: {
          connect: {
            name: services[i],
          }
        }
      }
    }

    tour.create({
      data: {
        name,
        departure,
        departureTime,
        price,
        desc,
        maxPeople,
        flight,
        planId,
        services: {
          create: listServices
        }
      }
    })
      .then(tour => res.send(tour))
  }

  /**
   * [GET]
   * /tours/:id
   */
  show(req, res, next) {
    tour.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        plan: {
          include: {
            dayplans: true,
            destination: true
          }
        },
        services: {
          select: {
            service: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
      .then(tour => {
        tour.star = Math.round(tour.star * 10) / 10
        res.send(tour)
      })
  }

  /**
   * [GET]
   * /tours/
   */
  index(req, res, next) {
    tour.findMany({
      include: {
        plan: {
          include: {
            destination: {
              include: {
                images: true
              }
            },
            dayplans: true
          }
        },
        services: {
          select: {
            service: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
      .then(tour => res.send(tour))
  }

  /**
   * [GET]
   * /tours/date-desc
   */
  allToursByDateDesc(req, res, next) {
    tour.findMany({
      include: {
        plan: {
          include: {
            destination: {
              include: {
                images: true
              }
            },
            dayplans: true
          }
        },
      },
      orderBy: {
        departureTime: 'desc'
      }
    })
      .then(tour => res.send(tour))
  }

  /**
   * [GET]
   * /tours/price-desc
   */
  allToursByPriceDesc(req, res, next) {
    tour.findMany({
      include: {
        plan: {
          include: {
            destination: {
              include: {
                images: true
              }
            },
            dayplans: true
          }
        },
      },
      orderBy: {
        price: 'desc'
      }
    })
      .then(tour => res.send(tour))
  }

  /**
   * [GET]
   * /tours/price-asc
   */
  allToursByPriceAsc(req, res, next) {
    tour.findMany({
      include: {
        plan: {
          include: {
            destination: {
              include: {
                images: true
              }
            },
            dayplans: true
          }
        },
      },
      orderBy: {
        price: 'asc'
      }
    })
      .then(tour => res.send(tour))
  }

  /**
   * [GET]
   * /tours/edit/:id
   */
  edit(req, res, next) {
    tour.findUnique({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        plan: {
          select: {
            name: true
          }
        },
        services: {
          select: {
            service: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })
      .then(tour => res.send(tour))
  }

  /**
   * [PATCH]
   * /tours/:id
   * Xem xét updateMany cho plan where tourId = param id
   */
  update(req, res, next) {
    const { name, departure, departureDay, departureTimeReq, price, desc, maxPeople,
      flight, planId, services } = req.body;

    const departureTime = new Date(`${departureDay} ${departureTimeReq}`)

    const listServices = [];
    for (var i = 0; i < services.length; i++) {
      listServices[i] = {
        service: {
          connect: {
            name: services[i],
          }
        }
      }
    }

    tourService.deleteMany({
      where: {
        tourId: parseInt(req.params.id)
      }
    })
      .then(() => {
        tour.update({
          where: {
            id: parseInt(req.params.id)
          },
          data: {
            name,
            departure,
            departureTime,
            price,
            desc,
            maxPeople,
            flight,
            planId,
            services: {
              create: listServices
            }
          }
        })
          .then(tour => res.send(tour))
      })
  }

  /**
   * [DELETE]
   * /tours/:id
   */
  delete(req, res, next) {
    tourService.deleteMany({
      where: {
        tourId: parseInt(req.params.id)
      }
    })
      .then(() => {
        tour.delete({
          where: {
            id: parseInt(req.params.id)
          }
        })
          .then(tour => res.send(tour))
      })
  }

  search(req, res, next) {
    const destinationName = req.query.destinationName;
    const tourName = req.query.tourName || '';
    if (req.query.from) {
      var from = new Date(req.query.from)
    }
    else {
      var from = new Date('1000-01-01')
    };

    if (req.query.to) {
      var to = new Date(req.query.to)
    }
    else {
      var to = new Date('3000-01-01')
    };

    tour.findMany({
      where: {
        plan: {
          destination: {
            name: {
              contains: destinationName
            }
          }
        },
        departureTime: {
          gte: from,
          lte: to
        },
        name: {
          contains: tourName
        }
      },
      include: {
        plan: {
          include: {
            destination: {
              include: {
                images: true
              }
            },
            dayplans: true
          }
        },
      }
    })
      .then(tours => {
        res.send(tours);
      });
  }
}

module.exports = new TourController();
