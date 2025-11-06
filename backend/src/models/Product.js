// backend/src/models/Product.js
/**
 * Product Model
 * Defines the Product schema and structure
 */

class Product {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.price = data.price;
    this.image = data.image;
    this.category = data.category;
    this.stock = data.stock;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
  }

  /**
   * Validate product data
   */
  static validate(data) {
    const errors = [];

    if (!data.name || typeof data.name !== 'string' || data.name.trim().length === 0) {
      errors.push('Product name is required and must be a non-empty string');
    }

    if (!data.description || typeof data.description !== 'string' || data.description.trim().length === 0) {
      errors.push('Product description is required and must be a non-empty string');
    }

    if (!data.price || isNaN(parseFloat(data.price)) || parseFloat(data.price) <= 0) {
      errors.push('Product price is required and must be a positive number');
    }

    if (!data.image || typeof data.image !== 'string' || data.image.trim().length === 0) {
      errors.push('Product image URL is required');
    }

    if (!data.category || typeof data.category !== 'string' || data.category.trim().length === 0) {
      errors.push('Product category is required');
    }

    if (!data.stock && data.stock !== 0 || isNaN(parseInt(data.stock)) || parseInt(data.stock) < 0) {
      errors.push('Product stock is required and must be a non-negative number');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Sanitize product data
   */
  static sanitize(data) {
    return {
      name: String(data.name).trim(),
      description: String(data.description).trim(),
      price: parseFloat(data.price),
      image: String(data.image).trim(),
      category: String(data.category).trim(),
      stock: parseInt(data.stock)
    };
  }

  /**
   * Format product data for response
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: parseFloat(this.price),
      image: this.image,
      category: this.category,
      stock: this.stock,
      created_at: this.created_at,
      updated_at: this.updated_at
    };
  }
}

module.exports = Product;
