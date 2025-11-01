import React, { useState, useEffect } from 'react';
import ChallanService from '../services/challanService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentChallans, setRecentChallans] = useState([]);
  const [loading, setLoading] = useState(true);
  
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
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
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
    return <div className="dashboard">Loading dashboard data...</div>;
  }
  
  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      {stats && (
        <div className="stats-container">
          <div className="stat-card">
            <h3>Total Challans</h3>
            <p>{stats.totalChallans.toLocaleString('en-IN')}</p>
            <div className="stat-footer">
              <span>+12% from last month</span>
            </div>
          </div>
          <div className="stat-card">
            <h3>Paid Challans</h3>
            <p>{stats.paidChallans.toLocaleString('en-IN')}</p>
            <div className="stat-footer">
              <span>{formatCurrency(stats.totalAmountCollected)} collected</span>
            </div>
          </div>
          <div className="stat-card">
            <h3>Pending Payments</h3>
            <p>{stats.pendingPayments.toLocaleString('en-IN')}</p>
            <div className="stat-footer">
              <span>{formatCurrency(stats.pendingAmount)} pending</span>
            </div>
          </div>
          <div className="stat-card">
            <h3>Today's Challans</h3>
            <p>{stats.todaysChallans}</p>
            <div className="stat-footer">
              <span>+5% from yesterday</span>
            </div>
          </div>
        </div>
      )}
      
      <div className="recent-challans">
        <h3>Recent Challans</h3>
        <table className="history-table">
          <thead>
            <tr>
              <th>Challan ID</th>
              <th>Vehicle Number</th>
              <th>Violation</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;