const router = require("express").Router();
let auth = require("../middlewares/auth");
let content_type = require("../middlewares/content_type");
let tripController = require("../controllers/trip");

const { catchErrors } = require("../handlers/errorHandler");

router.post("/create_trip", auth, content_type, tripController.createTrip);
router.get("/trips", auth, tripController.getTrips);

router.get("/get_single_trip/:id", auth, catchErrors(tripController.get_single_trip) );

module.exports = router;