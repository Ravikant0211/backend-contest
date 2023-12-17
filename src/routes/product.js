const express = require('express');
const {
  lowInventoryProducts,
  totalInventoryValue,
} = require('../controllers/Product');

const router = express.Router();

router.get('/low-inventory', lowInventoryProducts);
router.get('/total-value', totalInventoryValue);

module.exports = router;
