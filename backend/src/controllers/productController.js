// backend/src/controllers/productController.js
const pool = require('../db/connection');
const Product = require('../models/Product');

/**
 * Get all products
 */
exports.getAllProducts = async (req, res, next) => {
  try {
    const connection = await pool.getConnection();
    const [products] = await connection.execute(
      'SELECT * FROM products ORDER BY created_at DESC'
    );
    connection.release();

    res.json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product by ID
 */
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const connection = await pool.getConnection();
    const [products] = await connection.execute(
      'SELECT * FROM products WHERE id = ?',
      [parseInt(id)]
    );
    connection.release();

    if (products.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(products[0]);
  } catch (error) {
    next(error);
  }
};

/**
 * Create new product
 */
exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, image, category, stock } = req.body;

    // Validate input
    const validation = Product.validate({
      name,
      description,
      price,
      image,
      category,
      stock
    });

    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }

    // Sanitize input
    const sanitized = Product.sanitize({
      name,
      description,
      price,
      image,
      category,
      stock
    });

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO products (name, description, price, image, category, stock) VALUES (?, ?, ?, ?, ?, ?)',
      [
        sanitized.name,
        sanitized.description,
        sanitized.price,
        sanitized.image,
        sanitized.category,
        sanitized.stock
      ]
    );
    connection.release();

    res.status(201).json({
      id: result.insertId,
      ...sanitized,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update product
 */
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category, stock } = req.body;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    // Validate input
    const validation = Product.validate({
      name,
      description,
      price,
      image,
      category,
      stock
    });

    if (!validation.isValid) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: validation.errors 
      });
    }

    // Sanitize input
    const sanitized = Product.sanitize({
      name,
      description,
      price,
      image,
      category,
      stock
    });

    const connection = await pool.getConnection();

    // Check if product exists
    const [checkProducts] = await connection.execute(
      'SELECT id FROM products WHERE id = ?',
      [parseInt(id)]
    );

    if (checkProducts.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Product not found' });
    }

    // Update product
    await connection.execute(
      'UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, stock = ? WHERE id = ?',
      [
        sanitized.name,
        sanitized.description,
        sanitized.price,
        sanitized.image,
        sanitized.category,
        sanitized.stock,
        parseInt(id)
      ]
    );
    connection.release();

    res.json({
      id: parseInt(id),
      ...sanitized,
      updated_at: new Date().toISOString()
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product
 */
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(parseInt(id))) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }

    const connection = await pool.getConnection();

    // Check if product exists
    const [checkProducts] = await connection.execute(
      'SELECT id FROM products WHERE id = ?',
      [parseInt(id)]
    );

    if (checkProducts.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Product not found' });
    }

    // Delete product
    await connection.execute('DELETE FROM products WHERE id = ?', [parseInt(id)]);
    connection.release();

    res.json({ 
      message: 'Product deleted successfully', 
      id: parseInt(id) 
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Search products by name or category
 */
exports.searchProducts = async (req, res, next) => {
  try {
    const { query, category } = req.query;

    let sql = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (query) {
      sql += ' AND (name LIKE ? OR description LIKE ?)';
      const searchTerm = `%${query}%`;
      params.push(searchTerm, searchTerm);
    }

    if (category) {
      sql += ' AND category = ?';
      params.push(category);
    }

    sql += ' ORDER BY created_at DESC';

    const connection = await pool.getConnection();
    const [products] = await connection.execute(sql, params);
    connection.release();

    res.json(products);
  } catch (error) {
    next(error);
  }
};
