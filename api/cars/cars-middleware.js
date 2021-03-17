const db = require("../../data/db-config");
const { getById } = require("./cars-model");

const vinValidator = require("vin-validator");

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const getCar = await getById(req.params.id);

  if (getCar) {
    req.car = getCar;
    next();
  } else {
    res.status(404).json({ message: `car with id ${req.params.id} is not found` });
  }
}

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  
  if (!req.body.vin) {
    res.status(400).json({ message: "vin is missing" });
  } else if (!req.body.make) {
    res.status(400).json({ message: "make is missing" });
  } else if (!req.body.model) {
    res.status(400).json({ message: "model is missing" });
  } else if (!req.body.mileage) {
    res.status(400).json({ message: "mileage is missing" });
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  const validVin = vinValidator.validate(req.body.vin);

  if (validVin === false) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  const checked = await db("cars").where("vin", req.body.vin.trim());

  if (checked.length != 0) {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` })
  } else {
    next();
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
};