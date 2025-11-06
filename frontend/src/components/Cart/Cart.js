// frontend/src/components/Cart/Cart.jsx
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Cart.css';

const Cart = ({ onClose }) => {
  const { cart, removeFromCart, updateCartItem, cartTotal, clearCart } = useContext(StoreContext);

  if (cart.length === 0) {
    return (
      <div className="cart-modal">
        <div className="cart-content">
          <h2>Shopping Cart</h2>
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="btn btn-primary" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              
              <div className="cart-item-details">
                <h4>{item.name}</h4>
               <p className="price">
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>

              <div className="cart-item-quantity">
                <button onClick={() => updateCartItem(item.id, item.quantity - 1)}>−</button>
                <input 
                  type="number" 
                  value={item.quantity}
                  onChange={(e) => updateCartItem(item.id, parseInt(e.target.value) || 1)}
                  min="1"
                />
                <button onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
              </div>

            <div className="cart-item-total">
  ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
</div>


              <button 
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="cart-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Continue Shopping
          </button>
          <button className="btn btn-primary" onClick={() => alert('Checkout functionality coming soon!')}>
            Proceed to Checkout
          </button>
          <button className="btn btn-danger" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
