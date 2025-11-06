// frontend/src/components/Notification/Notification.jsx
import React, { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import './Notification.css';

const Notification = () => {
  const { notification } = useContext(StoreContext);

  if (!notification) return null;

  return (
    <div className={`notification notification-${notification.type}`}>
      <span className="notification-message">{notification.message}</span>
    </div>
  );
};

export default Notification;
