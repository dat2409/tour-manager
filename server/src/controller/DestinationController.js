const { PrismaClient } = require('@prisma/client');
const { destination, image } = new PrismaClient();
const { v4: uuidv4 } = require('uuid');
let multer = require('multer');

class DestinationController {

  /**
   * [GET]
   * /destinations/:id
   */
  show(req, res, next) {
    destination.findFirst({
      where: {
        id: parseInt(req.params.id)
      },
      include: {
        images: {
          select: {
            url: true
          }
        }
      }
    })
      .then(destination => res.send(destination))
  }

  /**
   * [GET]
   * /destinations/
   */
  index(req, res, next) {
    destination.findMany({
      include: {
        images: {
          select: {
            url: true
          }
        },
        plans: {
          include: {
            dayplans: true
          }
        }
      }
    })
      .then(destinations => res.json(destinations))
  }

  display(req, res, next) {
    destination.findMany({
      include: {
        images: true
      },
      take: 3
    })
      .then(destinations => res.send(destinations));
  }

  /**
   * [GET]
   * /destinations/edit/:id
   */
  edit(req, res, next) {
    destination.findFirst({
      where: {
        id: parseInt(req.params.id)
      },
      select: {
        images: {
          select: {
            url: true
          }
        }
      }
    })
      .then(destination => res.send(destination))
  }

  /**
 * [PATCH]
 * /destinations/:id
 */
  // update(req, res, next) {
  //   const updatedDestination = req.body;

  //   destination.update({
  //     where: {
  //       id: parseInt(req.params.id)
  //     },
  //     data: updatedDestination
  //   })
  //     .then(destination => res.send(destination))
  // }

  /**
   * [DELETE]
   * /destinations/:id
   */
  delete(req, res, next) {
    destination.delete({
      where: {
        id: parseInt(req.params.id)
      }
    })
      .then(result => res.send(result))
  }
}
module.exports = new DestinationController()
