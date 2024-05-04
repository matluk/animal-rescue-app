const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/authRoutes");
const animals = require("./routes/animalsRoutes");
const donations = require("./routes/donationsRoutes");
const notifications = require("./routes/notificationsRoutes");
const loggerMethodUrl = require("./middleware/logger");
const {
  errorHandler,
  notFoundHandler,
  mongooseErrorHandler,
  jwtErrorHandler,
} = require("./middleware/errorHandlers");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(loggerMethodUrl);

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

app.use("", routes);

app.use("", animals);

app.use("", donations);

app.use("", notifications);

db.on("error", (error) => {
  console.error("Database connection error:", error);
});

db.once("open", function () {
  console.log("Connected to MongoDB database.");
});

// Error handling middleware
app.use(mongooseErrorHandler);
app.use(jwtErrorHandler);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
