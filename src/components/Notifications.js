import React, { useState, useEffect, useCallback } from 'react';
import ChallanService from '../services/challanService';

const Notifications = () => {
  const [notifications, setNotifications] = useState(() => {
    // Load notifications from localStorage if available
    const saved = localStorage.getItem('challan_notifications');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        title: 'New Challan Generated',
        message: 'Challan #AP123456 has been generated for vehicle AP23AB1234',
        time: '2 minutes ago',
        read: false,
        type: 'info'
      },
      {
        id: 2,
        title: 'Payment Received',
        message: 'Payment of ₹500 received for challan #AP123457',
        time: '15 minutes ago',
        read: false,
        type: 'success'
      },
      {
        id: 3,
        title: 'Overdue Payment',
        message: 'Challan #AP123458 is overdue by 5 days',
        time: '1 hour ago',
        read: true,
        type: 'warning'
      },
      {
        id: 4,
        title: 'System Update',
        message: 'The system will be under maintenance tonight from 12 AM to 2 AM',
        time: '3 hours ago',
        read: true,
        type: 'info'
      }
    ];
  });
  
  const [filter, setFilter] = useState('all');
  
  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('challan_notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  // Subscribe to real-time notifications
  useEffect(() => {
    const handleNotification = (notification) => {
      setNotifications(prev => [notification, ...prev]);
    };
    
    ChallanService.subscribeToNotifications(handleNotification);
    
    return () => {
      ChallanService.unsubscribeFromNotifications(handleNotification);
    };
  }, []);
  
  const markAsRead = useCallback((id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? {...notification, read: true} : notification
      )
    );
  }, []);
  
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notification => ({...notification, read: true}))
    );
  }, []);
  
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>Notifications</h2>
        <div className="notifications-controls">
          <span className="unread-count">Unread: {unreadCount}</span>
          <button onClick={markAllAsRead} className="mark-all-btn">Mark All as Read</button>
        </div>
      </div>
      
      <div className="notifications-filter">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={filter === 'info' ? 'active' : ''}
          onClick={() => setFilter('info')}
        >
          Info
        </button>
        <button 
          className={filter === 'success' ? 'active' : ''}
          onClick={() => setFilter('success')}
        >
          Success
        </button>
        <button 
          className={filter === 'warning' ? 'active' : ''}
          onClick={() => setFilter('warning')}
        >
          Warnings
        </button>
      </div>
      
      <div className="notifications-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.read ? 'read' : 'unread'} ${notification.type}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="notification-icon">
                {notification.type === 'info' && 'ℹ️'}
                {notification.type === 'success' && '✅'}
                {notification.type === 'warning' && '⚠️'}
              </div>
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
              </div>
              {!notification.read && <div className="unread-indicator"></div>}
            </div>
          ))
        ) : (
          <div className="no-notifications">
            <p>No notifications found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;