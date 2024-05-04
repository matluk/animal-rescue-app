const loggerMethodUrl = (req, res, next) => {

  const offset = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
  const gmtPlus2Time = new Date(Date.now() + offset).toISOString();

  if (process.env.NODE_ENV === "development") {
    console.log(`[${gmtPlus2Time}] ${req.method} ${req.url}`);
    // console.log(`Authorization:${req.headers.authorization}`);
    console.log(req.body);
  }
  next();
};

module.exports = loggerMethodUrl;
