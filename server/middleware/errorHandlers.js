//err:err.message for example duplicate on unique values (for frontend to display email already in use)
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({err:err.message, error: "Something went wrong!" });
  };
  
  const notFoundHandler = (req, res, next) => {
    res.status(404).json({ error: "Route not found" });
  };
  
  const mongooseErrorHandler = (err, req, res, next) => {
    if (err.name === "ValidationError") {
      // Mongoose validation error
      const errors = {};
      Object.keys(err.errors).forEach((key) => {
        errors[key] = err.errors[key].message;
      });
      return res.status(400).json({ error: errors });
    }
    next(err);
  };
  
  //Verified also in auth.js Verify token Middleware, this is redundant
  const jwtErrorHandler = (err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      // JWT authentication error
      return res.status(401).json({ error: "Invalid token" });
    }
    next(err);
  };
  
  module.exports = {
    errorHandler,
    notFoundHandler,
    mongooseErrorHandler,
    jwtErrorHandler,
  };
  