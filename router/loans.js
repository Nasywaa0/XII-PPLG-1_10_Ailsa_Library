const express = require('express');
const router = express.Router();
const loans = require('../controllers/loans'); // Pastikan path ini benar

// Pastikan semua fungsi ada di dalam loans.js
router.get('/', loans.index);
router.get('/:id', loans.show);
router.post('/', loans.store);
router.put('/:id', loans.update);
router.delete('/:id', loans.delete);

module.exports = router;
