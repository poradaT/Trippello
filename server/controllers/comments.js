const express = require("express");
const router = express.Router();
const {
  getCommentsByIdeaId,
  createComment,
  updateCommentById,
  deleteCommentById,
} = require("../models/comment");

router.get("/ideas/:ideaId/comments", async (req, res, next) => {
  try {
    const ideaId = Number(req.params.ideaId);
    const comments = await getCommentsByIdeaId(ideaId);
    res.json(comments);
  } catch (err) {
    next(err);
  }
});

router.post("/comments", async (req, res, next) => {
  try {
    const { user_id, idea_id, comment, comment_date } = req.body;
    const newComment = await createComment({
      user_id,
      idea_id,
      comment_text: comment,
      comment_date,
    });
    res.json(newComment);
  } catch (err) {
    next(err);
  }
});

router.put("/comments/:commentId", async (req, res, next) => {
  try {
    const commentId = Number(req.params.commentId);
    const { comment, comment_date } = req.body;
    const commentUpdates = { comment_text: comment, comment_date };
    const updatedComment = await updateCommentById(commentId, commentUpdates);
    res.json(updatedComment);
  } catch (err) {
    next(err);
  }
});

router.delete("/comments/:commentId", async (req, res, next) => {
  try {
    const commentId = Number(req.params.commentId);
    await deleteCommentById(commentId);
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
