const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access token not found.");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).send("Invalid token.");
    }
    //console.log(decoded)
    req.user = decoded;
    next();
  });
};

const checkRole = (role) => {
  return (req, res, next) => {
    //console.log(req.user, req.user.role)
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).send("Unauthorized access.");
    }
  };
};

module.exports = { verifyToken, checkRole };
