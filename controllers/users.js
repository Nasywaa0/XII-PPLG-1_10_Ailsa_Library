const User = require("../models/User");

module.exports = {
  //get all users
  index: async (req, res) => {
    try {
      const users = await User.getAll();

      res.status(200).json({
        status: true,
        data: users,
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ sucess: false });
    }
  },
  show: async (req, res) => {
    try {
      const user = await User.getById(req.params.id);

      if (!user) {
        return res.status(404).json({
            status: false,
            message: "User tidak ditemukan"
        })
      }

      res.json({
        status: true,
        data: user,
        message: "Data berhasil didapat",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
  store: async (req, res) => {
    try {
      const userId = await User.add(req.body);

      res.status(200).json({
        status: true,
        data: {id: userId, ...req.body},
        message: "Data berhasil ditambahkan",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
  update: async (req, res) => {
    try {
      const updated = await User.update(req.params.id, req.body);

      if (!updated) {
        return res.status(404).json({
            status: false,
            message: "User tidak ditemukan"
        })
      }

      res.json({
        status: true,
        data: {id: req.params.id, ...req.body},
        message: "Data berhasil diubah",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
  delete: async (req, res) => {
    try {
      const deleted = await User.delete(req.params.id);

      if (!deleted) {
        return res.status(404).json({
            status: false,
            message: "User tidak ditemukan"
        })
      }

      res.json({
        status: true,
        message: "Data berhasil dihapus",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false });
    }
  },
};
