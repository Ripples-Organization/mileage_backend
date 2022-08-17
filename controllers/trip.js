const TripService = require("../services/tripServices");

exports.createTrip = async (req, res) => {
  let { start,end, purpose, } = req.body;
  let tripServices = new TripService();
  try {
    let data = await tripServices.createTrip({
        start,end,purpose,
    });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error, "the error");
    res.statusText = error;
    res.status(401).json({ success: false, error });
  }
};

exports.getTrips = async (req, res) => {
  let tripServices = new TripService();
  try {
    let data = await tripServices.getTrips();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log(error, "the error");
    res.statusText = error;
    res.status(404).json({ success: false, error });
  }
};

exports.get_single_trip = async (req, res) => {
    let trip_id = req.params.id;
    let tripService = new TripService();
    try {
        let trip = await tripService.getSingleTrip(trip_id);
        res.status(200).json({ success: true, trip });
    } catch (error) {
        res.status(400).json({ success: false, error });
    }
};
