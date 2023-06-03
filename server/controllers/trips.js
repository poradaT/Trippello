const express = require("express");
const router = express.Router();
const {
  getAllTrips,
  getTripById,
  createTrip,
  updateTripById,
  deleteTripById,
} = require("../models/trip");

router.get("/trips", (req, res, next) => {
  return getAllTrips()
    .then((trips) => res.json(trips))
    .catch((err) => next(err));
});

router.get("/trips/:tripId", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  return getTripById(tripId)
    .then((trip) => res.json(trip))
    .catch((err) => next(err));
});

router.post("/trips", (req, res, next) => {
  const { user_id, name, start_date, end_date } = req.body;
  return createTrip({ user_id, name, start_date, end_date })
    .then((trip) => res.json(trip))
    .catch((err) => next(err));
});

router.put("/trips/:tripId", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  const { name, start_date, end_date } = req.body;
  const tripUpdates = { name, start_date, end_date };
  return updateTripById(tripId, tripUpdates)
    .then((trip) => res.json(trip))
    .catch((err) => next(err));
});

router.delete("/trips/:tripId", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  return deleteTripById(tripId)
    .then(() => res.json({ message: "Trip deleted successfully" }))
    .catch((err) => next(err));
});

module.exports = router;
