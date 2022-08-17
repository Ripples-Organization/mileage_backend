const Car = require("../models/Car");

function CarService() {}

CarService.prototype.createCar = async function ({ car_name }) {
  const car = new Car({
    car_name,
  });
  const savedCar = await car.save();
  return savedCar;
};

CarService.prototype.updateCar = async function (_id, carData) {
  let options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    omitUndefined: true,
  };
  update = { ...carData };
  let savedCar = await Car.findOneAndUpdate({ _id: _id }, update, options);
  let carObj = new Object();
  carObj.car_name = savedCar.car_name;

  return carObj;
};

CarService.prototype.getCars = async function (skip, limit) {
  let cars = await Car.find()
    .skip(skip) // Always apply 'skip' before 'limit'
    .limit(limit);
  return cars;
};

CarService.prototype.getSingleCar = async function (carId) {
  let singleCar = await Car.findOne({ _id: carId });

  if (singleCar != null) {
    return {
      car: singleCar,
    };
  } else {
    throw "car not found";
  }
};

module.exports = CarService;
