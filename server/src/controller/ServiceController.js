const { PrismaClient } = require('@prisma/client');
const { service } = new PrismaClient();

class ServiceController {
  /**
   * [POST]
   * /services/
   */
  create(req, res, next) {
    const newService = req.body;
    service.create({
      data: newService
    })
      .then((service) => res.json(service))
  }

  /**
   * [GET]
   * /services/:id
   */
  show(req, res, next) {
    service.findFirst({
      where: {
        id: parseInt(req.params.id)
      }
    })
      .then(service => res.send(service))
  }

  /**
   * [GET]
   * /services/
   */
  index(req, res, next) {
    service.findMany()
      .then(services => res.send(services))
  }

  /**
   * [GET]
   * /services/edit/:id
   */
  edit(req, res, next) {
    service.findFirst({
      where: {
        id: parseInt(req.params.id)
      }
    })
      .then(service => res.send(service))
  }

  /**
   * [PATCH]
   * /services/:id
   */
  update(req, res, next) {
    const newService = req.body;

    service.update({
      where: {
        id: parseInt(req.params.id)
      },
      data: newService
    })
      .then(service => res.send(service))
  }

  /**
   * [DELETE]
   * /services/:id
   */
  delete(req, res, next) {
    service.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
      .then(result => res.send(result))
  }
}

module.exports = new ServiceController()
