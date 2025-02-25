const express = require('express');
const router = express.Router();
const reviews = require('../controllers/reviews'); // Pastikan path ini benar

// Pastikan semua fungsi ada di dalam loans.js
router.get('/', reviews.index);
router.get('/:id', reviews.show);
router.post('/', reviews.store);
router.put('/:id', reviews.update);
router.delete('/:id', reviews.delete);

module.exports = router;
