const express = require("express");
const router = express.Router();
const {
  getTripSectionsByTripId,
  createTripSection,
  updateTripSectionById,
  deleteTripSectionById,
} = require("../models/tripSection");

router.get("/trips/:tripId/sections", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  return getTripSectionsByTripId(tripId)
    .then((sections) => res.json(sections))
    .catch((err) => next(err));
});

router.post("/trips/:tripId/sections", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  const { section_name } = req.body;
  return createTripSection({ trip_id: tripId, section_name })
    .then((section) => res.json(section))
    .catch((err) => next(err));
});

router.put("/trips/sections/:sectionId", (req, res, next) => {
  const sectionId = Number(req.params.sectionId);
  const { section_name } = req.body;
  const sectionUpdates = { section_name };
  return updateTripSectionById(sectionId, sectionUpdates)
    .then((section) => res.json(section))
    .catch((err) => next(err));
});

router.delete("/trips/sections/:sectionId", (req, res, next) => {
  const sectionId = Number(req.params.sectionId);
  return deleteTripSectionById(sectionId)
    .then(() => res.json({ message: "Trip section deleted successfully" }))
    .catch((err) => next(err));
});

module.exports = router;
