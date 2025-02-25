const pool = require("../config/db");

class Category {
  static getAll = async () => {
    const [rows] = await pool.query("SELECT * FROM Category");
    return rows;
  };

  static getById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM Category WHERE id = ?", [id]);
    return rows[0];
  };

  static add = async (category) => {
    const { id, nama } = category;
    const [result] = await pool.query(
      "INSERT INTO Category (id, nama) VALUES (?, ?)",
      [id, nama]
    );
    return result.insertId;
  };

  static update = async (id, nama) => {
    const [result] = await pool.query(
      "UPDATE Category SET nama = ? WHERE id = ?",
      [nama, id]
    );
    return result.affectedRows;
  };

  static delete = async (id) => {
    const [result] = await pool.query("DELETE FROM Category WHERE id = ?", [id]);
    return result.affectedRows;
  };
}

module.exports = Category;
