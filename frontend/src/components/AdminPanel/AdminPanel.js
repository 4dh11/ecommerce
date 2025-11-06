// frontend/src/components/AdminPanel/AdminPanel.jsx
import React, { useContext, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import ProductForm from '../ProductForm/ProductForm';
import './AdminPanel.css';

const AdminPanel = ({ onClose }) => {
  const { products, deleteProduct, loading } = useContext(StoreContext);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setConfirmDelete(id);
  };

  const confirmDeleteProduct = async (id) => {
    await deleteProduct(id);
    setConfirmDelete(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="admin-content">
        <div className="admin-stats">
          <div className="stat-card">
            <span className="stat-label">Total Products</span>
            <span className="stat-value">{products.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Value</span>
            <span className="stat-value">${products.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Low Stock</span>
            <span className="stat-value">{products.filter(p => p.stock <= 10).length}</span>
          </div>
        </div>

        <div className="admin-actions">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setEditingProduct(null);
              setShowForm(true);
            }}
          >
            + Add New Product
          </button>
        </div>

        {showForm && (
          <ProductForm 
            product={editingProduct}
            onClose={handleFormClose}
          />
        )}

        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id}>
                  <td>
                    <img src={product.image} alt={product.name} className="table-image" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>${Number(product.price).toFixed(2)}</td>

                  <td>
                    <span className={`stock-indicator ${product.stock <= 10 ? 'low' : ''}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-sm btn-secondary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {confirmDelete && (
          <div className="confirm-dialog">
            <div className="confirm-content">
              <p>Are you sure you want to delete this product?</p>
              <div className="confirm-actions">
                <button 
                  className="btn btn-secondary"
                  onClick={() => setConfirmDelete(null)}
                >
                  Cancel
                </button>
                <button 
                  className="btn btn-danger"
                  onClick={() => confirmDeleteProduct(confirmDelete)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
