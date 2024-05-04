const Animal = require("../models/Animal");
const User = require("../models/User");

// Get all animals
const getAnimals = async (req, res, next) => {
  try {
    const animals = await Animal.find().populate("adoptedBy");
    res.json(animals);
  } catch (error) {
    next(error);
  }
};

// Get a single animal by ID
const getAnimal = async (req, res, next) => {
  const { id } = req.params;
  try {
    const animal = await Animal.findById(id).populate("adoptedBy");
    if (!animal) {
      return res.status(404).send("Animal not found");
    }
    res.json(animal);
  } catch (error) {
    next(error);
  }
};

// Create a new animal
const createAnimal = async (req, res, next) => {
  const newAnimal = new Animal(req.body);
  try {
    const savedAnimal = await newAnimal.save();
    res.json(savedAnimal);
  } catch (error) {
    next(error);
  }
};
// Update an animal by ID and add who adopted animal
const updateAnimal = async (req, res, next) => {
  try {
    const { isAdopted } = req.body;
    const updatedAnimal = await Animal.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedAnimal) {
      return res.status(404).send("Animal not found");
    }

    if (isAdopted === true) {
      const { userEmail } = req.body;
      const userId = await User.findOne({ email: userEmail }).select("_id");
      updatedAnimal.adoptedBy = userId;

      await updatedAnimal.save();
    } else {
      updatedAnimal.adoptedBy = null;
      await updatedAnimal.save();
    }

    res.json(updatedAnimal);
  } catch (error) {
    next(error);
  }
};

// Delete an animal by ID
const deleteAnimal = async (req, res, next) => {
  try {
    const deletedAnimal = await Animal.findByIdAndDelete(req.params.id);
    if (!deletedAnimal) {
      return res.status(404).send("Animal not found");
    }
    res.send("Animal deleted");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAnimals,
  getAnimal,
  createAnimal,
  updateAnimal,
  deleteAnimal,
};
