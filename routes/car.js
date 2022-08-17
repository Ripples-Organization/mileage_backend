const router = require("express").Router();
let auth = require("../middlewares/auth");
let content_type = require("../middlewares/content_type");
let carController = require("../controllers/car");

const { catchErrors } = require("../handlers/errorHandler");

router.post("/create_car", auth, content_type, carController.createCar);
router.get("/cars", auth, carController.getCars);

router.get("/get_single_car/:id", auth, catchErrors(carController.get_single_car) );

module.exports = router;
