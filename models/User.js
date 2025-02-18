const pool = require("../config/db");

class User {
  static getAll = async () => {
    const [rows] = await pool.query("SELECT * FROM users");
    return rows;
  };

  static getById = async (id) => {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  };

  static add = async (user) => {
    const { username, password, name, email, phone } = user;
    const [result] = await pool.query(
      "INSERT INTO users (username, password, name, email, phone) VALUES (?, ?, ?, ?, ?)",
      [username, password, name, email, phone]
    );

    return result.insertId;
  };

  static update = async (id, user) => {
    const { username, password, name, email, phone } = user;
    const [result] = await pool.query(
      "UPDATE users SET username = ?, password = ?, name = ?, email = ?, phone = ? WHERE id = ?",
      [username, password, name, email, phone, id]
    );

    return result.affectedRows;
  };

  static delete = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

    return result.affectedRows;
  };
}

module.exports = User;
