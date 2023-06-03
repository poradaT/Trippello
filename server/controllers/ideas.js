const express = require("express");
const router = express.Router();
const {
  getAllIdeas,
  getIdeasByTripIdAndSectionId,
  createIdea,
  updateIdeaById,
  deleteIdeaById,
} = require("../models/idea");

router.get("/ideas", (req, res, next) => {
  return getAllIdeas()
    .then((ideas) => res.json(ideas))
    .catch((err) => next(err));
});

router.get("/trips/:tripId/sections/:sectionId/ideas", (req, res, next) => {
  const tripId = Number(req.params.tripId);
  const sectionId = Number(req.params.sectionId);
  return getIdeasByTripIdAndSectionId(tripId, sectionId)
    .then((ideas) => res.json(ideas))
    .catch((err) => next(err));
});

router.post("/ideas", (req, res, next) => {
  const { trip_id, section_id, name, description, image_data } = req.body;
  return createIdea({ trip_id, section_id, name, description, image_data })
    .then((idea) => res.json(idea))
    .catch((err) => next(err));
});

router.put("/ideas/:ideaId", (req, res, next) => {
  const ideaId = Number(req.params.ideaId);
  const { name, description, image_data } = req.body;
  const ideaUpdates = { name, description, image_data };
  return updateIdeaById(ideaId, ideaUpdates)
    .then((idea) => res.json(idea))
    .catch((err) => next(err));
});

router.delete("/ideas/:ideaId", (req, res, next) => {
  const ideaId = Number(req.params.ideaId);
  return deleteIdeaById(ideaId)
    .then(() => res.json({ message: "Idea deleted successfully" }))
    .catch((err) => next(err));
});

module.exports = router;
