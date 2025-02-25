const express = require('express');
const router = express.Router();
const category = require('../controllers/category');

router.get('/', category.index);

router.get('/:id', category.show);

router.post('/', category.store);

router.put('/:id', category.update);

router.delete('/:id', category.delete);

module.exports = router;