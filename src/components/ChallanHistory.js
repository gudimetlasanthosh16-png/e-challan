import React, { useState, useEffect } from 'react';
import ChallanService from '../services/challanService';
import ChallanDetail from './ChallanDetail';

const ChallanHistory = ({ userType, currentUser }) => {
  const [challans, setChallans] = useState([]);
  const [filteredChallans, setFilteredChallans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    vehicleNumber: '',
    status: 'all'
  });
  const [selectedChallan, setSelectedChallan] = useState(null);
  
  useEffect(() => {
    const fetchChallans = async () => {
      try {
        const data = await ChallanService.getAllChallans();
        
        // If user is a citizen, only show challans for their vehicle
        if (userType === 'citizen' && currentUser) {
          // In a real app, we would filter by the user's vehicle number
          // For now, we'll just show all challans for demonstration
          setChallans(data);
          setFilteredChallans(data);
        } else {
          // Officers can see all challans
          setChallans(data);
          setFilteredChallans(data);
        }
      } catch (error) {
        console.error('Error fetching challan history:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchChallans();
  }, [userType, currentUser]);
  
  useEffect(() => {
    let result = challans;
    
    if (filters.vehicleNumber) {
      result = result.filter(challan => 
        challan.vehicle.toLowerCase().includes(filters.vehicleNumber.toLowerCase())
      );
    }
    
    if (filters.status !== 'all') {
      result = result.filter(challan => challan.status === filters.status);
    }
    
    // If user is a citizen, only show their challans
    if (userType === 'citizen' && currentUser) {
      // In a real app, we would filter by the user's vehicle number
      // For demonstration, we'll just show all challans
    }
    
    setFilteredChallans(result);
  }, [filters, challans, userType, currentUser]);
  
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleViewChallan = (challan) => {
    setSelectedChallan(challan);
  };
  
  const handleBackToHistory = () => {
    setSelectedChallan(null);
  };
  
  if (selectedChallan) {
    return <ChallanDetail challanId={selectedChallan.id} onBack={handleBackToHistory} />;
  }
  
  if (loading) {
    return <div className="challan-history">Loading challan history...</div>;
  }
  
  return (
    <div className="challan-history">
      <h2>{userType === 'citizen' ? 'My Challans' : 'Challan History'}</h2>
      {userType === 'officer' && (
        <div className="filter-options">
          <input 
            type="text" 
            placeholder="Filter by Vehicle Number" 
            value={filters.vehicleNumber}
            onChange={(e) => handleFilterChange('vehicleNumber', e.target.value)}
          />
          <select 
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
          <button>Apply Filters</button>
        </div>
      )}
      
      <table className="history-table">
        <thead>
          <tr>
            <th>Challan ID</th>
            <th>Vehicle Number</th>
            <th>Violation</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredChallans.length > 0 ? (
            filteredChallans.map((challan) => (
              <tr key={challan.id}>
                <td>{challan.id}</td>
                <td>{challan.vehicle}</td>
                <td>{challan.violation}</td>
                <td>{challan.date}</td>
                <td>₹{challan.amount.toLocaleString()}</td>
                <td>
                  <span className={`status ${challan.status.toLowerCase()}`}>
                    {challan.status}
                  </span>
                </td>
                <td>
                  <button 
                    className="view-btn" 
                    onClick={() => handleViewChallan(challan)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="no-data">No challans found matching the filters</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ChallanHistory;