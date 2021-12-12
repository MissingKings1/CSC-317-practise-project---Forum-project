var db = require('../config/database');
const CommentModel = {};

CommentModel.create = (userId, postId, comment) => {
    let baseSQL = `INSERT INTO comments (comment, fk_post_id, fk_author_id,created) VALUES (?,?,?,now());`;
    console.log(comment, postId, userId);
    return db.query(baseSQL, [comment, postId, userId])
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                return Promise.resolve(results.insertId);
            } else {
                return Promise.resolve(-1);
            }
        })
        .catch((err) => Promise.reject(err));
};

CommentModel.getCommentsForPost = (postId) => {
    let baseSQL = `SELECT u.username, c.comment, c.created, c.id
    FROM comments c
    JOIN users u
    on u.id = fk_author_id
    WHERE c.fk_post_id = ?
    ORDER BY c.created ASC`;
    return db.query(baseSQL, [postId])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch(err => Promise.reject(err));
};

module.exports = CommentModel;