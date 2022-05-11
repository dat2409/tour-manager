const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { user } = new PrismaClient();

let loadedUser;
class LoginController {
  /**
   * [POST]
   * /login/
   */
  create(req, res, next) {
    user.findUnique({
      where: {
        email: req.body.email
      }
    })
      .then(user => {
        loadedUser = user;
        if (user) {
          bcrypt.compare(req.body.password, user.password)
            .then(async function (result) {
              if (result) {
                const token = await jwt.sign(
                  { user_id: user.id },
                  process.env.JWTSECRET,
                  { expiresIn: '2h' }
                );
                res.cookie('token', token);
                res.send(token);
              }
              else {
                res.status(403).send('Incorrect password!')
              }
            })
        }
        else {
          res.status(404).send('User not found!')
        }
      })
  }

  me(req, res, auth) {
    res.status(200).json({
      user: loadedUser
    })
  }
}

module.exports = new LoginController();
