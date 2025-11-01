import React, { useState, useEffect } from 'react';
import ChallanService from '../services/challanService';

const ModernDashboard = ({ onNavigate, userType }) => {
  const [stats, setStats] = useState(null);
  const [recentChallans, setRecentChallans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week');
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsData, challansData] = await Promise.all([
          ChallanService.getDashboardStats(),
          ChallanService.getAllChallans()
        ]);
        
        setStats(statsData);
        // Sort challans by date and get the most recent ones
        const sortedChallans = [...challansData].sort((a, b) => 
          new Date(b.date) - new Date(a.date)
        );
        setRecentChallans(sortedChallans.slice(0, 5));
        
        // Mock notifications with more realistic data
        setNotifications([
          { 
            id: 1, 
            title: 'New Challan Generated', 
            message: 'Challan #AP123456 created for vehicle AP23AB1234', 
            time: '2 min ago', 
            unread: true,
            type: 'info'
          },
          { 
            id: 2, 
            title: 'Payment Received', 
            message: 'Payment of ₹500 received for challan #AP123457', 
            time: '15 min ago', 
            unread: true,
            type: 'success'
          },
          { 
            id: 3, 
            title: 'System Update', 
            message: 'New violation types added to the system', 
            time: '1 hour ago', 
            unread: false,
            type: 'info'
          },
          { 
            id: 4, 
            title: 'High Violation Alert', 
            message: 'Overspeeding violations increased by 25% this week', 
            time: '3 hours ago', 
            unread: true,
            type: 'warning'
          }
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // More realistic mock data for charts
  const violationData = [
    { name: 'Overspeeding', value: 145, color: '#3b82f6' },
    { name: 'No Helmet', value: 98, color: '#10b981' },
    { name: 'Red Light Jump', value: 67, color: '#f59e0b' },
    { name: 'Wrong Side', value: 42, color: '#8b5cf6' },
    { name: 'No License', value: 28, color: '#ef4444' },
    { name: 'No Insurance', value: 19, color: '#ec4899' }
  ];
  
  const collectionData = [
    { name: 'Mon', amount: 125400 },
    { name: 'Tue', amount: 187300 },
    { name: 'Wed', amount: 153200 },
    { name: 'Thu', amount: 210500 },
    { name: 'Fri', amount: 198700 },
    { name: 'Sat', amount: 256800 },
    { name: 'Sun', amount: 224100 }
  ];
  
  const officerQuickActions = [
    { id: 1, name: 'Generate Challan', icon: '📝', color: '#3b82f6', action: 'challan' },
    { id: 2, name: 'Search Vehicle', icon: '🚗', color: '#10b981', action: 'search' },
    { id: 3, name: 'Process Payment', icon: '💳', color: '#8b5cf6', action: 'payment' },
    { id: 4, name: 'View Reports', icon: '📊', color: '#f59e0b', action: 'reports' },
    { id: 5, name: 'Check Notifications', icon: '🔔', color: '#ef4444', action: 'notifications' },
    { id: 6, name: 'Violation Trends', icon: '📈', color: '#8b5cf6', action: 'trends' },
    { id: 7, name: 'Vehicle Analytics', icon: '🚘', color: '#10b981', action: 'analytics' },
    { id: 8, name: 'Officer Performance', icon: '👮', color: '#f59e0b', action: 'performance' }
  ];
  
  const citizenQuickActions = [
    { id: 1, name: 'Pay Challan', icon: '💳', color: '#10b981', action: 'payment' },
    { id: 2, name: 'My Challans', icon: '📋', color: '#3b82f6', action: 'history' },
    { id: 3, name: 'Check Notifications', icon: '🔔', color: '#ef4444', action: 'notifications' },
    { id: 4, name: 'View Reports', icon: '📊', color: '#f59e0b', action: 'reports' }
  ];
  
  const handleQuickAction = (action) => {
    // Navigate to the appropriate page based on the action
    if (onNavigate) {
      onNavigate(action.action);
    }
  };
  
  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, unread: false } : notification
    ));
  };
  
  const getUnreadCount = () => {
    return notifications.filter(n => n.unread).length;
  };
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };
  
  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      </div>
    );
  }
  
  // Determine which quick actions to show based on user type
  const actionsToShow = userType === 'officer' ? officerQuickActions : citizenQuickActions;
  
  // Dashboard title based on user type
  const dashboardTitle = userType === 'officer' ? 'Officer Dashboard' : 'Citizen Dashboard';
  
  // Stats cards based on user type
  const getStatsCards = () => {
    if (userType === 'officer') {
      return [
        { title: 'Total Challans', value: stats.totalChallans.toLocaleString('en-IN'), icon: '📋', change: '+12%', positive: true },
        { title: 'Paid Challans', value: stats.paidChallans.toLocaleString('en-IN'), icon: '✅', change: '+8%', positive: true },
        { title: 'Pending Payments', value: stats.pendingPayments.toLocaleString('en-IN'), icon: '⚠️', change: '-3%', positive: false },
        { title: 'Amount Collected', value: formatCurrency(stats.totalAmountCollected), icon: '💰', change: '+15%', positive: true }
      ];
    } else {
      return [
        { title: 'Active Challans', value: '3', icon: '📋', change: '0', positive: true },
        { title: 'Total Paid', value: formatCurrency(12500), icon: '✅', change: '+5%', positive: true },
        { title: 'Pending Payments', value: formatCurrency(2400), icon: '⚠️', change: '-2%', positive: false },
        { title: 'Compliance Score', value: '92%', icon: '⭐', change: '+3%', positive: true }
      ];
    }
  };
  
  const statsCards = getStatsCards();
  
  return (
    <div className="dashboard">
      {/* Main Dashboard Content */}
      <div className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-content">
            <h2>{dashboardTitle}</h2>
            <div className="header-actions">
              <div className="notifications-badge" onClick={() => onNavigate('notifications')}>
                <span className="bell-icon">🔔</span>
                {getUnreadCount() > 0 && (
                  <span className="notification-count">{getUnreadCount()}</span>
                )}
              </div>
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="time-range-selector"
              >
                <option value="day">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="stats-container">
          {statsCards.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-header">
                <div className="stat-icon">{stat.icon}</div>
                {stat.change !== '0' && (
                  <div className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                    {stat.change}
                  </div>
                )}
              </div>
              <div className="stat-info">
                <h3>{stat.title}</h3>
                <p>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Only show charts for officers */}
        {userType === 'officer' && (
          <div className="charts-container">
            <div className="chart-card">
              <div className="chart-header">
                <h3>Violations by Type</h3>
                <div className="chart-actions">
                  <button className="chart-action-btn">Export</button>
                </div>
              </div>
              <div className="chart-placeholder">
                <div className="pie-chart-container">
                  <div className="pie-chart">
                    {violationData.map((item, index) => (
                      <div 
                        key={index} 
                        className="pie-segment"
                        style={{
                          '--rotation': index === 0 ? 0 : violationData.slice(0, index).reduce((sum, d) => sum + d.value, 0) / violationData.reduce((sum, d) => sum + d.value, 0) * 360,
                          '--segment-size': item.value / violationData.reduce((sum, d) => sum + d.value, 0) * 100,
                          '--segment-color': item.color
                        }}
                      ></div>
                    ))}
                    <div className="pie-center">
                      <div className="pie-value">{violationData.reduce((sum, d) => sum + d.value, 0)}</div>
                      <div className="pie-label">Total</div>
                    </div>
                  </div>
                  <div className="chart-legend">
                    {violationData.map((item, index) => (
                      <div key={index} className="legend-item">
                        <div className="legend-color" style={{backgroundColor: item.color}}></div>
                        <div className="legend-text">
                          <span className="legend-name">{item.name}</span>
                          <span className="legend-value">{item.value.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h3>Daily Collections</h3>
                <div className="chart-actions">
                  <button className="chart-action-btn">Export</button>
                </div>
              </div>
              <div className="chart-placeholder">
                <div className="bar-chart">
                  {collectionData.map((item, index) => (
                    <div key={index} className="bar-container">
                      <div className="bar-tooltip">
                        <div className="tooltip-content">
                          <div className="tooltip-value">{formatCurrency(item.amount)}</div>
                          <div className="tooltip-date">{item.name}</div>
                        </div>
                      </div>
                      <div 
                        className="bar" 
                        style={{height: `${(item.amount / Math.max(...collectionData.map(d => d.amount))) * 80}%`}}
                      >
                        <div className="bar-value">{formatCurrency(item.amount)}</div>
                      </div>
                      <span className="bar-label">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="dashboard-sections">
          <div className="recent-challans">
            <div className="section-header">
              <h3>Recent Challans</h3>
              <button className="view-all-btn" onClick={() => onNavigate('history')}>View All</button>
            </div>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Challan ID</th>
                  <th>Vehicle Number</th>
                  <th>Violation</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentChallans.map((challan) => (
                  <tr key={challan.id}>
                    <td>{challan.id}</td>
                    <td>{challan.vehicle}</td>
                    <td>{challan.violation}</td>
                    <td>{formatCurrency(challan.amount)}</td>
                    <td>
                      <span className={`status ${challan.status.toLowerCase()}`}>
                        {challan.status}
                      </span>
                    </td>
                    <td>{formatDate(challan.date)}</td>
                    <td>
                      <button className="action-btn view-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Only show upcoming tasks for officers */}
          {userType === 'officer' && (
            <div className="upcoming-tasks">
              <div className="section-header">
                <h3>Upcoming Tasks</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="tasks-list">
                <div className="task-item">
                  <div className="task-icon">📋</div>
                  <div className="task-content">
                    <h4>Generate Monthly Report</h4>
                    <p>Due by tomorrow</p>
                  </div>
                  <button className="task-action-btn">Start</button>
                </div>
                <div className="task-item">
                  <div className="task-icon">🔔</div>
                  <div className="task-content">
                    <h4>Follow up on pending payments</h4>
                    <p>{stats ? `${stats.pendingPayments} challans pending` : 'Loading...'}</p>
                  </div>
                  <button className="task-action-btn">View</button>
                </div>
                <div className="task-item">
                  <div className="task-icon">📊</div>
                  <div className="task-content">
                    <h4>Review violation trends</h4>
                    <p>Weekly analysis required</p>
                  </div>
                  <button className="task-action-btn">Analyze</button>
                </div>
                <div className="task-item">
                  <div className="task-icon">⚠️</div>
                  <div className="task-content">
                    <h4>High violation zone alert</h4>
                    <p>Gandhi Road showing 40% increase</p>
                  </div>
                  <button className="task-action-btn">Details</button>
                </div>
              </div>
            </div>
          )}
          
          {/* Quick Actions Section */}
          <div className="quick-actions-section">
            <div className="section-header">
              <h3>Quick Actions</h3>
            </div>
            <div className="quick-actions">
              {actionsToShow.map(action => (
                <button 
                  key={action.id}
                  className="quick-action-btn"
                  onClick={() => handleQuickAction(action)}
                >
                  <span className="action-icon" style={{ backgroundColor: action.color }}>
                    {action.icon}
                  </span>
                  <span className="action-name">{action.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;