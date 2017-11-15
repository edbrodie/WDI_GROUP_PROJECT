function errorHandler(err, req, res, next) {
  if(err.name === 'ValidationError') {
    err.status = 400;
    err.message = 'Bad Request';
    err.errors = err.toString();
  }

  err.message = err.message || 'Internal Server Error';
  err.status = err.status || 500;

  res.status(err.status);
  return res.json({ message: err.message, errors: err.errors });
}

module.exports = errorHandler;
