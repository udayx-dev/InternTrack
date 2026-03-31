/**
 * Wraps async route handlers so we never need try/catch in controllers.
 * Any rejected promise is forwarded to Express's next(err) error pipeline.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;