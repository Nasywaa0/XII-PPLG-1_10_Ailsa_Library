const Review = require('../models/reviewsModel');

module.exports = {
  // GET all reviews
  index: async (req, res) => {
    try {
      const reviews = await Review.getAll();
      res.status(200).json({
        status: true,
        data: reviews,
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // GET review by ID
  show: async (req, res) => {
    try {
      const review = await Review.getById(req.params.id);
      if (!review) {
        return res.status(404).json({ status: false, message: "Review tidak ditemukan" });
      }
      res.json({
        status: true,
        data: review,
        message: "Berhasil",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // POST (create) new review
  store: async (req, res) => {
    try {
      console.log("Received data:", req.body);
      const reviewId = await Review.add(req.body);
      res.status(200).json({
        status: true,
        data: { id: reviewId, ...req.body },
        message: "Sukses menambahkan review",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // PUT (update) review by ID
  update: async (req, res) => {
    try {
      const updated = await Review.update(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ status: false, message: "Review tidak ditemukan" });
      }
      res.json({
        status: true,
        data: { id: req.params.id, ...req.body },
        message: "Review berhasil diperbarui",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },

  // DELETE review by ID
  delete: async (req, res) => {
    try {
      const deleted = await Review.delete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ status: false, message: "Review tidak ditemukan" });
      }
      res.json({
        status: true,
        message: "Review berhasil dihapus",
        method: req.method,
        url: req.url,
      });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  },
};
