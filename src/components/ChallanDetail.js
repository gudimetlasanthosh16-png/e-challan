import React, { useState, useEffect } from 'react';
import ChallanService from '../services/challanService';

const ChallanDetail = ({ challanId, onBack }) => {
  const [challan, setChallan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    const fetchChallan = async () => {
      try {
        const data = await ChallanService.getChallanById(challanId);
        setChallan(data);
      } catch (err) {
        setError('Error fetching challan details');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };
    
    if (challanId) {
      fetchChallan();
    }
  }, [challanId]);
  
  if (loading) {
    return <div className="challan-detail">Loading challan details...</div>;
  }
  
  if (error) {
    return <div className="challan-detail error">{error}</div>;
  }
  
  if (!challan) {
    return <div className="challan-detail">Challan not found</div>;
  }
  
  return (
    <div className="challan-detail">
      <button onClick={onBack} className="back-btn">← Back to History</button>
      
      <div className="challan-header">
        <h2>Challan Details</h2>
        <div className="challan-id">ID: {challan.id}</div>
      </div>
      
      <div className="challan-info-grid">
        <div className="info-card">
          <h3>Vehicle Information</h3>
          <div className="info-item">
            <label>Vehicle Number:</label>
            <span>{challan.vehicle}</span>
          </div>
        </div>
        
        <div className="info-card">
          <h3>Violation Details</h3>
          <div className="info-item">
            <label>Violation Type:</label>
            <span>{challan.violation}</span>
          </div>
          <div className="info-item">
            <label>Location:</label>
            <span>{challan.location}</span>
          </div>
          <div className="info-item">
            <label>Date & Time:</label>
            <span>{challan.date}</span>
          </div>
        </div>
        
        <div className="info-card">
          <h3>Financial Details</h3>
          <div className="info-item">
            <label>Amount:</label>
            <span className="amount">₹{challan.amount.toLocaleString()}</span>
          </div>
          <div className="info-item">
            <label>Status:</label>
            <span className={`status ${challan.status.toLowerCase()}`}>
              {challan.status}
            </span>
          </div>
        </div>
        
        <div className="info-card">
          <h3>Officer Information</h3>
          <div className="info-item">
            <label>Issuing Officer:</label>
            <span>{challan.officer}</span>
          </div>
        </div>
      </div>
      
      <div className="description-section">
        <h3>Description</h3>
        <p>{challan.description}</p>
      </div>
      
      <div className="actions">
        {challan.status === 'Pending' && (
          <button className="pay-now-btn">Pay Now</button>
        )}
        <button className="print-btn">Print Challan</button>
      </div>
    </div>
  );
};

export default ChallanDetail;