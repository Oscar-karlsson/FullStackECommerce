// Not Found Handler
exports.notFound = (req, res, next) => {
    const err = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(err);
  };
  
  // Error Handler
  exports.errorHandler = (err, req, res, next) => {
    res.status(res.statusCode === 200 ? 500 : res.statusCode);
    res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
  };