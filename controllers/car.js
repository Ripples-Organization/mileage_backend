const CarService = require("../services/carServices");

exports.createCar = async (req, res) => {
  let { car_name } = req.body;
  let carServices = new CarService();
  try {
    let data = await carServices.createCar({
      car_name,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error, "the error");
    res.statusText = error;
    res.status(401).json({ success: false, error });
  }
};

exports.getCars = async (req, res) => {
  let carServices = new CarService();
  try {
    let data = await carServices.getCars();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error, "the error");
    res.statusText = error;
    res.status(404).json({ success: false, error });
  }
};

exports.get_single_car = async (req, res) => {

  let car_id = req.params.id;
  let carService = new CarService();
  try {
    let car = await carService.getSingleCar(car_id);
    res.status(200).json({ success: true, car });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};
