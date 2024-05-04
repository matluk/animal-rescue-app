const Donation = require("../models/Donation");
const User = require("../models/User");

// Get all donations
const getDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find().populate("user");
    res.json(donations);
  } catch (error) {
    next(error);
  }
};

// Get a single donation by ID
const getDonation = async (req, res, next) => {
  const { id } = req.params;
  try {
    const donation = await Donation.findById(id).populate("user");
    if (!donation) {
      return res.status(404).send("Donation not found");
    }
    res.json(donation);
  } catch (error) {
    next(error);
  }
};

// Create a new donation with reference to the user
const createDonation = async (req, res, next) => {
  const { type, description, value, category, userEmail } = req.body;
  try {
    const user = await User.findOne({ email: userEmail }).select("_id");

    const newDonation = new Donation({
      type,
      description,
      value,
      category,
      user: user._id,
    });

    const savedDonation = await newDonation.save();
    res.json(savedDonation);
  } catch (error) {
    next(error);
  }
};

// Update a donation by ID
const updateDonation = async (req, res, next) => {
  try {
    const updatedDonation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedDonation) {
      return res.status(404).send("Donation not found");
    }
    res.json(updatedDonation);
  } catch (error) {
    next(error);
  }
};

// Delete a donation by ID
const deleteDonation = async (req, res, next) => {
  try {
    const deletedDonation = await Donation.findByIdAndDelete(req.params.id);
    if (!deletedDonation) {
      return res.status(404).send("Donation not found");
    }
    res.send("Donation deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDonations,
  getDonation,
  createDonation,
  updateDonation,
  deleteDonation,
};
