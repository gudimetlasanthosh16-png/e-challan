import React, { useState, useEffect, useMemo } from 'react';

const VehicleAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for vehicle analytics
  const vehicleData = [
    { id: 1, vehicleNumber: 'AP23AB1234', owner: 'Rajesh Kumar', model: 'Honda Activa 5G', violations: 3, pendingChallans: 1, totalAmount: 1500 },
    { id: 2, vehicleNumber: 'AP24CD5678', owner: 'Suresh Prasad', model: 'Suzuki Access 125', violations: 2, pendingChallans: 0, totalAmount: 1000 },
    { id: 3, vehicleNumber: 'AP25EF9012', owner: 'Meena Reddy', model: 'TVS Jupiter', violations: 5, pendingChallans: 2, totalAmount: 2800 },
    { id: 4, vehicleNumber: 'AP26GH3456', owner: 'Anil Sharma', model: 'Hero Splendor+', violations: 1, pendingChallans: 0, totalAmount: 500 },
    { id: 5, vehicleNumber: 'AP27IJ7890', owner: 'Priya Kumar', model: 'Yamaha Fascino', violations: 4, pendingChallans: 1, totalAmount: 2200 }
  ];
  
  const filteredVehicles = useMemo(() => {
    if (!searchTerm) return vehicleData;
    return vehicleData.filter(vehicle => 
      vehicle.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, vehicleData]);
  
  const getViolationSeverity = (count) => {
    if (count >= 5) return 'high';
    if (count >= 3) return 'medium';
    return 'low';
  };
  
  return (
    <div className="vehicle-analytics">
      <div className="analytics-header">
        <h2>Vehicle Analytics</h2>
        <div className="analytics-controls">
          <input 
            type="text" 
            placeholder="Search by vehicle number or owner name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      
      <div className="analytics-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'violations' ? 'active' : ''}
          onClick={() => setActiveTab('violations')}
        >
          Violation Patterns
        </button>
        <button 
          className={activeTab === 'compliance' ? 'active' : ''}
          onClick={() => setActiveTab('compliance')}
        >
          Compliance Score
        </button>
      </div>
      
      <div className="analytics-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total Vehicles</h3>
                <p>1,248</p>
              </div>
              <div className="stat-card">
                <h3>High Violation Vehicles</h3>
                <p>87</p>
              </div>
              <div className="stat-card">
                <h3>Average Violations/Vehicle</h3>
                <p>2.3</p>
              </div>
              <div className="stat-card">
                <h3>Compliance Rate</h3>
                <p>78%</p>
              </div>
            </div>
            
            <div className="vehicles-table">
              <h3>Vehicle Violation Records</h3>
              <table className="history-table">
                <thead>
                  <tr>
                    <th>Vehicle Number</th>
                    <th>Owner</th>
                    <th>Model</th>
                    <th>Violations</th>
                    <th>Pending Challans</th>
                    <th>Total Amount (₹)</th>
                    <th>Severity</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVehicles.map(vehicle => (
                    <tr key={vehicle.id}>
                      <td>{vehicle.vehicleNumber}</td>
                      <td>{vehicle.owner}</td>
                      <td>{vehicle.model}</td>
                      <td>{vehicle.violations}</td>
                      <td>{vehicle.pendingChallans}</td>
                      <td>₹{vehicle.totalAmount.toLocaleString()}</td>
                      <td>
                        <span className={`severity ${getViolationSeverity(vehicle.violations)}`}>
                          {getViolationSeverity(vehicle.violations).toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'violations' && (
          <div className="violations-content">
            <h3>Violation Patterns Analysis</h3>
            <div className="patterns-grid">
              <div className="pattern-card">
                <h4>By Time of Day</h4>
                <ul>
                  <li>Morning (6-10 AM): 35%</li>
                  <li>Afternoon (10 AM-4 PM): 25%</li>
                  <li>Evening (4-8 PM): 30%</li>
                  <li>Night (8 PM-6 AM): 10%</li>
                </ul>
              </div>
              <div className="pattern-card">
                <h4>By Location</h4>
                <ul>
                  <li>Main Road: 40%</li>
                  <li>Market Area: 25%</li>
                  <li>School Zone: 20%</li>
                  <li>Residential: 15%</li>
                </ul>
              </div>
              <div className="pattern-card">
                <h4>By Vehicle Type</h4>
                <ul>
                  <li>Scooters: 60%</li>
                  <li>Motorcycles: 30%</li>
                  <li>Other: 10%</li>
                </ul>
              </div>
              <div className="pattern-card">
                <h4>Repeat Offenders</h4>
                <ul>
                  <li>3+ Violations: 12%</li>
                  <li>2 Violations: 25%</li>
                  <li>1 Violation: 63%</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'compliance' && (
          <div className="compliance-content">
            <h3>Compliance Score Dashboard</h3>
            <div className="compliance-grid">
              <div className="compliance-card">
                <h4>Overall Compliance</h4>
                <div className="score-display">
                  <div className="score-circle">
                    <span>78%</span>
                  </div>
                </div>
                <p className="score-description">Above average compliance rate</p>
              </div>
              <div className="compliance-card">
                <h4>Monthly Trend</h4>
                <div className="trend-chart">
                  <div className="trend-bar high">85%</div>
                  <div className="trend-bar medium">78%</div>
                  <div className="trend-bar low">72%</div>
                </div>
                <p className="trend-description">Improving over last 3 months</p>
              </div>
              <div className="compliance-card">
                <h4>Top Compliant Areas</h4>
                <ol>
                  <li>Area A - 92%</li>
                  <li>Area B - 88%</li>
                  <li>Area C - 85%</li>
                </ol>
              </div>
              <div className="compliance-card">
                <h4>Improvement Suggestions</h4>
                <ul>
                  <li>Increase patrols in high-violation zones</li>
                  <li>Implement awareness campaigns</li>
                  <li>Install additional traffic signals</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleAnalytics;