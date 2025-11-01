import React, { useState } from 'react';
import ChallanService from '../services/challanService';

const VehicleSearch = () => {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSearch = async () => {
    if (!vehicleNumber.trim()) {
      setError('Please enter a vehicle number');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await ChallanService.searchVehicle(vehicleNumber);
      setVehicleData(data);
    } catch (err) {
      setError('Error fetching vehicle data. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="vehicle-search">
      <h2>Vehicle Search</h2>
      <div className="search-form">
        <input 
          type="text" 
          placeholder="Enter Vehicle Number (e.g. AP23AB1234)" 
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      
      {error && <div className="error">{error}</div>}
      
      {vehicleData && (
        <div className="vehicle-details">
          <h3>Vehicle Details</h3>
          <div className="detail-grid">
            <div className="detail-item">
              <label>Vehicle Number:</label>
              <span>{vehicleData.vehicleNumber}</span>
            </div>
            <div className="detail-item">
              <label>Owner Name:</label>
              <span>{vehicleData.ownerName}</span>
            </div>
            <div className="detail-item">
              <label>Model:</label>
              <span>{vehicleData.model}</span>
            </div>
            <div className="detail-item">
              <label>Registration Date:</label>
              <span>{vehicleData.registrationDate}</span>
            </div>
            <div className="detail-item">
              <label>Insurance Valid:</label>
              <span className={vehicleData.insuranceValid ? 'valid' : 'invalid'}>
                {vehicleData.insuranceValid ? 'Yes' : 'No'}
              </span>
            </div>
            <div className="detail-item">
              <label>Pollution Certificate:</label>
              <span className={vehicleData.pollutionCertValid ? 'valid' : 'invalid'}>
                {vehicleData.pollutionCertValid ? 'Valid' : 'Expired'}
              </span>
            </div>
            <div className="detail-item">
              <label>Last Challan:</label>
              <span>{vehicleData.lastChallan}</span>
            </div>
            <div className="detail-item">
              <label>Pending Challans:</label>
              <span>{vehicleData.pendingChallans}</span>
            </div>
            <div className="detail-item">
              <label>Owner Address:</label>
              <span>{vehicleData.ownerAddress}</span>
            </div>
            <div className="detail-item">
              <label>Owner Phone:</label>
              <span>{vehicleData.ownerPhone}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleSearch;