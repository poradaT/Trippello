const express = require("express");
const router = express.Router();
const {
  getAllIdeas,
  getIdeasBySectionId,
  createIdea,
  updateIdeaById,
  deleteIdeaById,
} = require("../models/idea");

const upload = require("../models/upload");

router.get("/ideas", (req, res, next) => {
  return getAllIdeas()
    .then((ideas) => res.json(ideas))
    .catch((err) => next(err));
});

router.get("/sections/:sectionId/ideas", (req, res, next) => {
  const sectionId = Number(req.params.sectionId);
  return getIdeasBySectionId(sectionId)
    .then((ideas) => res.json(ideas))
    .catch((err) => next(err));
});

router.post("/ideas", upload.single("photo"), (req, res, next) => {
  const { section_id, name, description } = req.body;
  return createIdea({ section_id, name, description, photo: req.file })
    .then((idea) => res.json(idea))
    .catch((err) => next(err));
});

router.put("/ideas/:ideaId", upload.single("photo"), (req, res, next) => {
  const ideaId = Number(req.params.ideaId);
  const { section_id, name, description } = req.body;
  const ideaUpdates = { section_id, name, description, photo: req.file };
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
