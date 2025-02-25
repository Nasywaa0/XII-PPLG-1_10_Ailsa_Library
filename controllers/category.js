const Category = require('../models/CategoryModel');

module.exports = {
  index: async (req, res) => {
    try {
      const category = await Category.getAll();
      res.status(200).json({
        status: true,
        data: category,
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  show: async (req, res) => {
    try {
      const category = await Category.getById(req.params.id);
      if (!category) {
        return res.status(404).json({ status: false, message: "Categori tidak ditemukan" });
      }
      res.json({
        status: true,
        data: category,
        message: "Berhasil",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  store: async (req, res) => {
    try {
      console.log("Received data:", req.body);
      const categoryid = await Category.add(req.body);
      res.status(200).json({
        status: true,
        data: { id: categoryid, ...req.body },
        message: "Sukses",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const updated = await Category.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ status: false, message: "Category not found" });
      }
      res.json({
        status: true,
        data: { id: req.params.id, ...req.body },
        message: "Data updated successfully",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const deleted = await Category.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ status: false, message: "Category tidak ditemukan" });
      }
      res.json({
        status: true,
        message: "Data deleted successfully",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};