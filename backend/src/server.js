// backend/src/server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'ecommerce',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize Database
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create table if not exists
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        image VARCHAR(500),
        category VARCHAR(100),
        stock INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Check if table has data
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM products');
    
    if (rows[0].count === 0) {
      // Insert sample data
      const sampleProducts = [
        ['Wireless Headphones', 'Premium noise-cancelling wireless headphones with 30-hour battery life', 129.99, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400', 'Electronics', 45],
        ['Smart Watch', 'Fitness tracking smartwatch with heart rate monitor and GPS', 249.99, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400', 'Electronics', 32],
        ['Running Shoes', 'Lightweight athletic shoes with superior cushioning and support', 89.99, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400', 'Clothing', 60],
        ['Coffee Maker', 'Programmable coffee maker with thermal carafe and auto-brew', 79.99, 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400', 'Home & Kitchen', 28],
        ['Laptop Backpack', 'Durable water-resistant backpack with padded laptop compartment', 49.99, 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 'Accessories', 55],
        ['Yoga Mat', 'Extra thick non-slip yoga mat with carrying strap', 34.99, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400', 'Sports', 40],
        ['Desk Lamp', 'LED desk lamp with adjustable brightness and USB charging port', 39.99, 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400', 'Home & Office', 22],
        ['Water Bottle', 'Insulated stainless steel water bottle keeps drinks cold for 24 hours', 24.99, 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400', 'Sports', 75],
        ['Bluetooth Speaker', 'Portable waterproof speaker with 360-degree sound', 59.99, 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400', 'Electronics', 38],
        ['Plant Pot Set', 'Set of 3 ceramic plant pots with drainage holes and saucers', 29.99, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400', 'Home & Garden', 50]
      ];

      for (const product of sampleProducts) {
        await connection.execute(
          'INSERT INTO products (name, description, price, image, category, stock) VALUES (?, ?, ?, ?, ?, ?)',
          product
        );
      }
      console.log('✓ Sample products inserted');
    }
    
    connection.release();
    console.log('✓ Database initialized successfully');
  } catch (error) {
    console.error('✗ Database initialization error:', error.message);
  }
}

// Import routes - CORRECTED PATH
const productRoutes = require('./routes/products');

// Use routes
app.use('/api/products', productRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Initialize and start server
const PORT = process.env.PORT || 5000;
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n✓ Server running on http://localhost:${PORT}`);
    console.log(`✓ API available at http://localhost:${PORT}/api`);
    console.log(`✓ Health check: http://localhost:${PORT}/api/health\n`);
  });
}).catch(error => {
  console.error('✗ Failed to start server:', error.message);
  process.exit(1);
});

module.exports = app;