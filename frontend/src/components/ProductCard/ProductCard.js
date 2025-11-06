// frontend/src/components/ProductCard/ProductCard.jsx
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onView, onAddToCart }) => {
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img src={product.image} alt={product.name} className="product-image" />
        {product.stock <= 10 && product.stock > 0 && (
          <span className="stock-badge low">Low Stock</span>
        )}
        {product.stock === 0 && (
          <span className="stock-badge out">Out of Stock</span>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description.substring(0, 60)}...</p>
        
        <div className="product-footer">
          <span className="product-price">
            ${Number(product.price).toFixed(2)}
          </span>
        </div>
        
        <div className="product-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => onView(product)}
          >
            View Details
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => onAddToCart(product)}
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
