const db = require("./index");

const getCommentsByIdeaId = async (ideaId) => {
  const query =
    "SELECT comments.*, users.user_name FROM comments INNER JOIN users ON comments.user_id = users.id WHERE idea_id = $1";
  const values = [ideaId];
  const { rows } = await db.query(query, values);
  return rows;
};

const createComment = async (comment) => {
  const { user_id, idea_id, comment_text, comment_date } = comment;
  const query = `
      INSERT INTO comments (user_id, idea_id, comment, comment_date)
      VALUES ($1, $2, $3, $4)
      RETURNING comments.*, (SELECT user_name FROM users WHERE id = $1) AS user_name;
    `;
  const values = [user_id, idea_id, comment_text, comment_date];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const updateCommentById = async (commentId, commentUpdates) => {
  const { comment_text, comment_date } = commentUpdates;
  const query =
    "UPDATE comments SET comment = $2, comment_date = $3 WHERE id = $1 RETURNING *";
  const values = [commentId, comment_text, comment_date];
  const { rows } = await db.query(query, values);
  return rows[0];
};

const deleteCommentById = async (commentId) => {
  const query = "DELETE FROM comments WHERE id = $1";
  await db.query(query, [commentId]);
};

module.exports = {
  getCommentsByIdeaId,
  createComment,
  updateCommentById,
  deleteCommentById,
};
