const Loans = require('../models/LoansModel');

module.exports = {
  index: async (req, res) => {
    try {
      const loans = await Loans.getAll();
      res.status(200).json({
        status: true,
        data: loans,
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  show: async (req, res) => {
    try {
      const loans = await Loans.getById(req.params.id);
      if (!loans) {
        return res.status(404).json({ status: false, message: "loans tidak ditemukan" });
      }
      res.json({
        status: true,
        data: loans,
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
      const loansid = await Loans.add(req.body);
      res.status(200).json({
        status: true,
        data: { id: loansid, ...req.body },
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
      const updated = await Loans.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ status: false, message: "Loans not found" });
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
      const deleted = await Loans.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ status: false, message: "Loans tidak ditemukan" });
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