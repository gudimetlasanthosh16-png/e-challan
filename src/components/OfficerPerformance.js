import React, { useState } from 'react';

const OfficerPerformance = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [sortBy, setSortBy] = useState('challans');
  
  // Mock data for officer performance
  const officerData = [
    { id: 1, name: 'Rajesh Kumar', badge: 'TP-001', challans: 127, amount: 63500, compliance: 92, rating: 4.8 },
    { id: 2, name: 'Suresh Prasad', badge: 'TP-002', challans: 98, amount: 49000, compliance: 87, rating: 4.5 },
    { id: 3, name: 'Meena Reddy', badge: 'TP-003', challans: 115, amount: 57500, compliance: 95, rating: 4.9 },
    { id: 4, name: 'Anil Sharma', badge: 'TP-004', challans: 86, amount: 43000, compliance: 82, rating: 4.2 },
    { id: 5, name: 'Priya Kumar', badge: 'TP-005', challans: 94, amount: 47000, compliance: 89, rating: 4.6 }
  ];
  
  const sortedOfficers = [...officerData].sort((a, b) => {
    if (sortBy === 'challans') return b.challans - a.challans;
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'compliance') return b.compliance - a.compliance;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });
  
  const getPerformanceClass = (rating) => {
    if (rating >= 4.5) return 'excellent';
    if (rating >= 4.0) return 'good';
    if (rating >= 3.5) return 'average';
    return 'poor';
  };
  
  return (
    <div className="officer-performance">
      <div className="performance-header">
        <h2>Officer Performance Dashboard</h2>
        <div className="performance-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-selector"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-selector"
          >
            <option value="challans">Sort by Challans</option>
            <option value="amount">Sort by Amount</option>
            <option value="compliance">Sort by Compliance</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
      </div>
      
      <div className="performance-content">
        <div className="stats-overview">
          <div className="stat-card">
            <h3>Total Officers</h3>
            <p>42</p>
          </div>
          <div className="stat-card">
            <h3>Average Performance</h3>
            <p>4.3/5.0</p>
          </div>
          <div className="stat-card">
            <h3>Top Performer</h3>
            <p>Meena Reddy</p>
          </div>
          <div className="stat-card">
            <h3>Total Challans</h3>
            <p>1,847</p>
          </div>
        </div>
        
        <div className="performance-table">
          <h3>Officer Performance Rankings</h3>
          <table className="history-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Officer Name</th>
                <th>Badge Number</th>
                <th>Challans Issued</th>
                <th>Amount Collected (₹)</th>
                <th>Compliance Rate</th>
                <th>Performance Rating</th>
              </tr>
            </thead>
            <tbody>
              {sortedOfficers.map((officer, index) => (
                <tr key={officer.id}>
                  <td>{index + 1}</td>
                  <td>{officer.name}</td>
                  <td>{officer.badge}</td>
                  <td>{officer.challans}</td>
                  <td>₹{officer.amount.toLocaleString()}</td>
                  <td>{officer.compliance}%</td>
                  <td>
                    <span className={`rating ${getPerformanceClass(officer.rating)}`}>
                      {officer.rating} ★
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="performance-insights">
          <h3>Performance Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>Top Performer</h4>
              <p>Meena Reddy (TP-003)</p>
              <span className="insight-value">95% compliance rate</span>
            </div>
            <div className="insight-card">
              <h4>Improvement Area</h4>
              <p>Evening Patrols</p>
              <span className="insight-value">Below average performance</span>
            </div>
            <div className="insight-card">
              <h4>Training Needed</h4>
              <p>3 Officers</p>
              <span className="insight-value">Rating below 3.5</span>
            </div>
            <div className="insight-card">
              <h4>Recognition Due</h4>
              <p>2 Officers</p>
              <span className="insight-value">Consistently high ratings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfficerPerformance;