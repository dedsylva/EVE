const config = require('config');

module.exports = function() {
  if (!config.get('dedsPrivateKey')) {
    throw new Error('FATAL ERROR: dedsPrivateKey is not defined.');
  }
}
