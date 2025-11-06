// frontend/src/components/Header/Header.jsx
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Header.css';

const Header = ({ onCartClick, onAdminClick, currentView }) => {
  const { cart } = useContext(StoreContext);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>🛍️ EcoStore</h1>
        </div>
        
        <nav className="nav">
          <button 
            className={`nav-btn ${currentView === 'home' ? 'active' : ''}`}
            onClick={() => window.location.href = '/'}
          >
            Home
          </button>
          <button 
            className={`nav-btn admin-btn`}
            onClick={onAdminClick}
          >
            Admin Panel
          </button>
        </nav>

        <button className="cart-btn" onClick={onCartClick}>
          <span className="cart-icon">🛒</span>
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
      </div>
    </header>
  );
};

export default Header;