// backend/src/routes/products.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/**
 * Product Routes
 */

// GET all products
router.get('/', productController.getAllProducts);

// GET product search
router.get('/search', productController.searchProducts);

// GET single product by ID
router.get('/:id', productController.getProductById);

// POST create new product
router.post('/', productController.createProduct);

// PUT update product
router.put('/:id', productController.updateProduct);

// DELETE product
router.delete('/:id', productController.deleteProduct);

module.exports = router;