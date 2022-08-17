const Trip = require("../models/Trip");

function TripService() {}

TripService.prototype.createTrip = async function ({ start,end,purpose }) {
  const trip = new Trip({
    start,
    end,
    purpose,
  });
  const savedTrip = await trip.save();
  return savedTrip;
};

TripService.prototype.updateTrip = async function (_id, tripData) {
  let options = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
    omitUndefined: true,
  };
  update = { ...tripData };
  let savedTrip = await Trip.findOneAndUpdate({ _id: _id }, update, options);
  let tripObj = new Object();
  start,
  end,
  purpose,
  tripObj.start = savedTrip. start;
  tripObj.end = savedTrip.end;
  tripObj.purpose = savedTrip.purpose;

  return tripObj;
};

TripService.prototype.getTrips = async function (skip, limit) {
  let trips = await Trip.find()
    .skip(skip) // Always apply 'skip' before 'limit'
    .limit(limit);
  return trips;
};

TripService.prototype.getSingleTrip = async function (tripId) {
  let singleTrip = await Trip.findOne({ _id: tripId });

  if (singleTrip != null) {
    return {
      trip: singleTrip,
    };
  } else {
    throw "trip not found";
  }
};

module.exports = TripService;
