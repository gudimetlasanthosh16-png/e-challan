import React, { useState } from 'react';
import ChallanService from '../services/challanService';

const ChallanGeneration = () => {
  const [formData, setFormData] = useState({
    vehicleNumber: '',
    violationType: '',
    location: '',
    amount: '',
    description: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [challanId, setChallanId] = useState('');
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    
    try {
      const challanData = {
        vehicle: formData.vehicleNumber,
        violation: formData.violationType,
        location: formData.location,
        amount: parseInt(formData.amount),
        description: formData.description
      };
      
      const result = await ChallanService.createChallan(challanData);
      setChallanId(result.id);
      setSuccess(true);
      
      // Reset form
      setFormData({
        vehicleNumber: '',
        violationType: '',
        location: '',
        amount: '',
        description: ''
      });
    } catch (error) {
      console.error('Error generating challan:', error);
      alert('Error generating challan. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="challan-generation">
      <h2>Generate Challan</h2>
      
      {success && (
        <div className="success-message">
          <p>Challan generated successfully!</p>
          <p>Challan ID: <strong>{challanId}</strong></p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="challan-form">
        <div className="form-group">
          <label>Vehicle Number:</label>
          <input 
            type="text" 
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            placeholder="AP23AB1234"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Violation Type:</label>
          <select 
            name="violationType"
            value={formData.violationType}
            onChange={handleChange}
            required
          >
            <option value="">Select Violation</option>
            <option value="Overspeeding">Overspeeding</option>
            <option value="No Helmet">Not Wearing Helmet</option>
            <option value="Jumping Red Light">Jumping Red Light</option>
            <option value="Wrong Side Driving">Wrong Side Driving</option>
            <option value="No License">Driving Without License</option>
            <option value="No Insurance">No Insurance</option>
            <option value="No Pollution Certificate">No Pollution Certificate</option>
            <option value="Triple Riding">Triple Riding</option>
            <option value="Using Mobile">Using Mobile While Driving</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Location:</label>
          <input 
            type="text" 
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter Location"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Amount (₹):</label>
          <input 
            type="number" 
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            min="100"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description (Optional)"
            rows="3"
          ></textarea>
        </div>
        
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Generating...' : 'Generate Challan'}
        </button>
      </form>
    </div>
  );
};

export default ChallanGeneration;