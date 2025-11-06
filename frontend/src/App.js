import React, { useState } from 'react';
import { StoreProvider } from './context/StoreContext';
import Header from './components/Header/Header';
import ProductGrid from './components/ProductGrid/ProductGrid';
import Cart from './components/Cart/Cart';
import ProductModal from './components/ProductModal/ProductModal';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Notification from './components/Notification/Notification';
import './App.css';

function App() {
  const [showCart, setShowCart] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    // Context will handle this
  };

  return (
    <StoreProvider>
      <div className="App">
        <Header 
          onCartClick={() => setShowCart(true)}
          onAdminClick={() => setShowAdmin(true)}
          currentView="home"
        />
        
        <main className="main-content">
          <ProductGrid 
            onProductView={setSelectedProduct}
            onAddToCart={handleAddToCart}
          />
        </main>

        <footer className="footer">
          <p>&copy; 2025 EcoStore. All rights reserved.</p>
        </footer>

        {showCart && <Cart onClose={() => setShowCart(false)} />}
        {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
        {selectedProduct && (
          <ProductModal 
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}

        <Notification />
      </div>
    </StoreProvider>
  );
}

export default App;