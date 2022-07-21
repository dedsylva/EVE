const winston = require('winston');
require('express-async-errors');

module.exports = function () {
// Subscribing an Uncaught Exception 
// Outside Express winston doesn't log errors, so we need to log it one level above
process.on('uncaughtException', (ex) => {
  console.log('Error: Uncaught Exception.');
  console.log(ex);
  winston.error(ex.message, ex);
  process.exit(1);
});


// Subscribing an Uncaught Promisses 
process.on('unhandledRejection', (ex) => {
  console.log('Error: Uncaught Rejection.');
  winston.error(ex.message, ex);
  process.exit(1);
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
}
