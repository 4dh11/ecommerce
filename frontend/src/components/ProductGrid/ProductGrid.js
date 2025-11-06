// frontend/src/components/ProductGrid/ProductGrid.jsx
import React, { useContext, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import ProductCard from '../ProductCard/ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ onProductView, onAddToCart }) => {
  const { products, loading, fetchProducts, addToCart } = useContext(StoreContext);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  if (products.length === 0) {
    return <div className="empty-state">No products available</div>;
  }

  return (
    <div className="product-grid-container">
      <h2 className="grid-title">Featured Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onView={onProductView}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
