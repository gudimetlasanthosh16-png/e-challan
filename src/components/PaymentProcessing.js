import React, { useState } from 'react';
import ChallanService from '../services/challanService';

const PaymentProcessing = ({ autoChallan }) => {
  const [paymentData, setPaymentData] = useState({
    challanId: autoChallan ? autoChallan.id : '',
    amount: autoChallan ? autoChallan.amount.toString() : '',
    paymentMethod: 'upi',
    vehicle: autoChallan ? autoChallan.vehicle : ''
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [challanDetails, setChallanDetails] = useState(autoChallan || null);
  
  // If autoChallan prop changes, update the state
  React.useEffect(() => {
    if (autoChallan) {
      setPaymentData({
        challanId: autoChallan.id,
        amount: autoChallan.amount.toString(),
        paymentMethod: 'upi',
        vehicle: autoChallan.vehicle
      });
      setChallanDetails(autoChallan);
    }
  }, [autoChallan]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({
      ...paymentData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (error) {
      setError('');
    }
    
    // If user is entering challan ID, clear previous details
    if (name === 'challanId') {
      setChallanDetails(null);
      setPaymentData(prev => ({ ...prev, amount: '' }));
    }
  };
  
  const fetchChallanDetails = async () => {
    if (!paymentData.challanId.trim()) {
      setError('Please enter a challan ID');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // In a real app, this would fetch actual challan details
      // For now, we'll simulate with mock data
      const mockChallan = {
        id: paymentData.challanId,
        vehicle: 'AP23AB1234',
        amount: parseInt(paymentData.amount) || 500,
        status: 'Pending',
        violation: 'Overspeeding',
        date: new Date().toLocaleDateString(),
        location: 'Highway Sector 5'
      };
      
      setChallanDetails(mockChallan);
      setPaymentData(prev => ({ ...prev, amount: mockChallan.amount.toString() }));
    } catch (err) {
      setError('Challan not found. Please check the ID and try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!challanDetails && !autoChallan) {
      setError('Please fetch challan details first');
      return;
    }
    
    if (!paymentData.paymentMethod) {
      setError('Please select a payment method');
      return;
    }
    
    setLoading(true);
    setSuccess(false);
    setError('');
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update challan status
      await ChallanService.updateChallanStatus(paymentData.challanId, 'Paid');
      
      setSuccess(true);
      
      // Reset form if not auto challan
      if (!autoChallan) {
        setPaymentData({
          challanId: '',
          amount: '',
          paymentMethod: 'upi',
          vehicle: ''
        });
        setChallanDetails(null);
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="payment-processing">
      <h2>{autoChallan ? 'Pay Automatic Challan' : 'Challan Payment'}</h2>
      
      {success && (
        <div className="success-message">
          <p>Payment processed successfully!</p>
          <p>Transaction ID: TXN{Math.floor(100000 + Math.random() * 900000)}</p>
          <p>Challan ID: {paymentData.challanId}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="payment-form">
        {autoChallan ? (
          <div className="auto-challan-info">
            <h3>Automatic Speeding Challan</h3>
            <div className="challan-detail">
              <label>Challan ID:</label>
              <span>{autoChallan.id}</span>
            </div>
            <div className="challan-detail">
              <label>Vehicle:</label>
              <span>{autoChallan.vehicle}</span>
            </div>
            <div className="challan-detail">
              <label>Violation:</label>
              <span>{autoChallan.violation}</span>
            </div>
            <div className="challan-detail">
              <label>Amount:</label>
              <span>₹{autoChallan.amount}</span>
            </div>
            <div className="challan-detail">
              <label>Date:</label>
              <span>{autoChallan.date || new Date().toLocaleDateString()}</span>
            </div>
            <div className="challan-detail">
              <label>Location:</label>
              <span>{autoChallan.location}</span>
            </div>
          </div>
        ) : (
          <>
            <div className="form-group">
              <label>Challan ID:</label>
              <div className="challan-id-input">
                <input 
                  type="text" 
                  name="challanId"
                  value={paymentData.challanId}
                  onChange={handleChange}
                  placeholder="Enter Challan ID"
                  required
                />
                <button 
                  type="button" 
                  onClick={fetchChallanDetails}
                  disabled={loading}
                >
                  {loading ? 'Fetching...' : 'Fetch'}
                </button>
              </div>
            </div>
            
            {challanDetails && (
              <div className="challan-summary">
                <h3>Challan Summary</h3>
                <div className="summary-item">
                  <label>Vehicle:</label>
                  <span>{challanDetails.vehicle}</span>
                </div>
                <div className="summary-item">
                  <label>Violation:</label>
                  <span>{challanDetails.violation}</span>
                </div>
                <div className="summary-item">
                  <label>Status:</label>
                  <span className={`status ${challanDetails.status.toLowerCase()}`}>
                    {challanDetails.status}
                  </span>
                </div>
                <div className="summary-item">
                  <label>Date:</label>
                  <span>{challanDetails.date}</span>
                </div>
                <div className="summary-item">
                  <label>Location:</label>
                  <span>{challanDetails.location}</span>
                </div>
              </div>
            )}
          </>
        )}
        
        <div className="form-group">
          <label>Amount (₹):</label>
          <input 
            type="number" 
            name="amount"
            value={paymentData.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            readOnly={!!challanDetails || !!autoChallan}
          />
        </div>
        
        <div className="form-group">
          <label>Payment Method:</label>
          <div className="payment-methods">
            <label>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="upi"
                checked={paymentData.paymentMethod === 'upi'}
                onChange={handleChange}
              />
              UPI
            </label>
            <label>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="credit_card"
                checked={paymentData.paymentMethod === 'credit_card'}
                onChange={handleChange}
              />
              Credit Card
            </label>
            <label>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="debit_card"
                checked={paymentData.paymentMethod === 'debit_card'}
                onChange={handleChange}
              />
              Debit Card
            </label>
            <label>
              <input 
                type="radio" 
                name="paymentMethod" 
                value="net_banking"
                checked={paymentData.paymentMethod === 'net_banking'}
                onChange={handleChange}
              />
              Net Banking
            </label>
          </div>
        </div>
        
        {paymentData.paymentMethod === 'upi' && (
          <div className="form-group">
            <label>UPI ID:</label>
            <input 
              type="text" 
              placeholder="Enter UPI ID (e.g. mobile@upi)"
            />
          </div>
        )}
        
        {error && <div className="error">{error}</div>}
        
        <button 
          type="submit" 
          className="pay-btn" 
          disabled={loading || (!challanDetails && !autoChallan)}
        >
          {loading ? 'Processing Payment...' : `Pay ₹${paymentData.amount || '0'}`}
        </button>
      </form>
    </div>
  );
};

export default PaymentProcessing;