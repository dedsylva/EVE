// Its a bit weird, but this function handles the rejected Promise
// handler is a function that has req,res,next as its parameters
// handler = function (req, res, nex)
// You need this return at line 7 to get access to those parameters (req, res, next)

module.exports = function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex); //calls the next middleware function (which will be the error)
    }
  };
}
