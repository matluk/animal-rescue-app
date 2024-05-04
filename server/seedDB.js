const mongoose = require("mongoose");
const jsonData = require("./podaci.json");
const Animal = require("./models/Animal");
const Donation = require("./models/Donation");
const Notification = require("./models/Notification");

mongoose.connect("mongodb://127.0.0.1:27017/asylum", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("Greška pri spajanju:", error);
});
db.once("open", function () {
  console.log("Spojeni smo na MongoDB bazu");

  Promise.all([
    Animal.insertMany(jsonData.animals),
    Notification.insertMany(jsonData.notifications),
    Donation.insertMany(jsonData.donations)
  ])
    .then(() => {
      console.log("Data seeded successfully");
    })
    .catch((error) => {
      console.error("Error seeding data:", error);
    });
});
