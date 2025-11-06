// frontend/src/components/ProductModal/ProductModal.jsx
import React from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-body">
          <img src={product.image} alt={product.name} className="modal-image" />
          
          <div className="modal-info">
            <h2>{product.name}</h2>
            <p className="modal-category">{product.category}</p>
            
            <p className="modal-description">{product.description}</p>
            
            <div className="modal-meta">
              <div className="meta-item">
                <span className="meta-label">Price:</span>
               <span className="meta-value price">
  ${Number(product.price).toFixed(2)}
</span>

              </div>
              <div className="meta-item">
                <span className="meta-label">Stock:</span>
                <span className="meta-value">{product.stock} available</span>
              </div>
            </div>

            {product.stock === 0 ? (
              <button className="btn btn-primary" disabled>Out of Stock</button>
            ) : (
              <button 
                className="btn btn-primary btn-large"
                onClick={() => {
                  onAddToCart(product);
                  onClose();
                }}
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
