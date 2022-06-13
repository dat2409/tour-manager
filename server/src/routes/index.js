const userRouter = require('./user');
const loginRouter = require('./login');
const destinationRouter = require('./destination');
const serviceRouter = require('./service');
const planRouter = require('./plan');
const tourRouter = require('./tour');
const bookingRouter = require('./booking');
const bookingManagerRouter = require('./bookingManager');
const reviewRouter = require('./review');
const auth = require('../middleware/auth');

// function route(app) {
//   app.use('/user', userRouter);
//   app.use('/login', loginRouter);
//   app.use('/destinations', destinationRouter);
//   app.use('/services', [auth.requireAuth, auth.isManager], serviceRouter);
//   app.use('/plans', [auth.requireAuth, auth.isManager], planRouter);
//   app.use('/tours', [auth.requireAuth, auth.isManager], tourRouter);
//   app.use('/booking-manager', [auth.requireAuth, auth.isStaff], bookingManagerRouter);
//   app.use('/booking', bookingRouter);

// }

function route(app) {
  app.use('/users', userRouter);
  app.use('/login', loginRouter);
  app.use('/destinations', destinationRouter);
  app.use('/services', serviceRouter);
  app.use('/plans', planRouter);
  app.use('/tours', tourRouter);
  app.use('/booking-manager', bookingManagerRouter);
  app.use('/booking', bookingRouter);
  app.use('/reviews', reviewRouter);

}

module.exports = route;
