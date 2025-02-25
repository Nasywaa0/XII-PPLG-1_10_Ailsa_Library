const pool = require("../config/db");

class Review {
  static getAll = async () => {
    const [rows] = await pool.query("SELECT * FROM reviews");
    return rows;
  };

  static getById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM reviews WHERE id = ?", [id]);
    return rows[0];
  };

  static add = async (review) => {
    const { book_id, user_id, rating, comment } = review;
    const [result] = await pool.query(
      "INSERT INTO reviews (book_id, user_id, rating, comment, created_at) VALUES (?, ?, ?, ?, NOW())",
      [book_id, user_id, rating, comment]
    );

    return result.insertId;
  };

  static update = async (id, review) => {
    const { book_id, user_id, rating, comment } = review;
    const [result] = await pool.query(
      "UPDATE reviews SET book_id = ?, user_id = ?, rating = ?, comment = ? WHERE id = ?",
      [book_id, user_id, rating, comment, id]
    );

    return result.affectedRows;
  };

  static delete = async (id) => {
    const [result] = await pool.query("DELETE FROM reviews WHERE id = ?", [id]);
    return result.affectedRows;
  };
}

module.exports = Review;
