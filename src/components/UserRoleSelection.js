import React, { useState } from 'react';
import StorageService from '../services/storageService';

const UserRoleSelection = ({ onComplete }) => {
  const [step, setStep] = useState(1); // 1: role selection, 2: basic details, 3: quiz
  const [userType, setUserType] = useState('');
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    badgeNumber: '', // For officers
    vehicleNumber: '' // For citizens
  });
  const [quizAnswers, setQuizAnswers] = useState({
    q1: '',
    q2: '',
    q3: ''
  });

  const handleRoleSelect = (role) => {
    setUserType(role);
    setStep(2);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuizChange = (question, answer) => {
    setQuizAnswers(prev => ({
      ...prev,
      [question]: answer
    }));
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setStep(3); // Move to quiz step
  };

  const handleSubmitQuiz = (e) => {
    e.preventDefault();
    // Save user data to localStorage
    const userInfo = {
      ...userData,
      userType,
      quizAnswers,
      timestamp: new Date().toISOString()
    };
    
    StorageService.saveData('userInfo', userInfo);
    onComplete(userType, userData); // Pass both userType and userData
  };

  const renderRoleSelection = () => (
    <div className="role-selection-container">
      <h2>Welcome to AP Bike Challan System</h2>
      <p className="subtitle">Please select your role to continue</p>
      
      <div className="role-options">
        <div 
          className="role-card" 
          onClick={() => handleRoleSelect('officer')}
        >
          <div className="role-icon">👮</div>
          <h3>Traffic Officer</h3>
          <p>Generate challans, process payments, and manage violations</p>
        </div>
        
        <div 
          className="role-card" 
          onClick={() => handleRoleSelect('citizen')}
        >
          <div className="role-icon">👤</div>
          <h3>Bike Owner/Citizen</h3>
          <p>View challans, make payments, and check vehicle status</p>
        </div>
      </div>
    </div>
  );

  const renderBasicDetails = () => (
    <div className="user-details-container">
      <h2>{userType === 'officer' ? 'Officer Details' : 'Citizen Details'}</h2>
      <p className="subtitle">Please provide your basic information</p>
      
      <form onSubmit={handleSubmitDetails} className="user-details-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        
        {userType === 'officer' && (
          <div className="form-group">
            <label htmlFor="badgeNumber">Badge Number *</label>
            <input
              type="text"
              id="badgeNumber"
              name="badgeNumber"
              value={userData.badgeNumber}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        
        {userType === 'citizen' && (
          <div className="form-group">
            <label htmlFor="vehicleNumber">Vehicle Number</label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              value={userData.vehicleNumber}
              onChange={handleInputChange}
              placeholder="Optional"
            />
          </div>
        )}
        
        <div className="form-actions">
          <button type="button" onClick={() => setStep(1)} className="back-btn">
            Back
          </button>
          <button type="submit" className="next-btn">
            Continue
          </button>
        </div>
      </form>
    </div>
  );

  const renderQuiz = () => (
    <div className="quiz-container">
      <h2>Quick Verification</h2>
      <p className="subtitle">Please answer these questions to verify your role</p>
      
      <form onSubmit={handleSubmitQuiz} className="quiz-form">
        {userType === 'officer' ? (
          <>
            <div className="quiz-question">
              <h4>1. What is the standard fine for overspeeding in Andhra Pradesh?</h4>
              <div className="quiz-options">
                <label>
                  <input
                    type="radio"
                    name="q1"
                    value="a"
                    checked={quizAnswers.q1 === 'a'}
                    onChange={() => handleQuizChange('q1', 'a')}
                  />
                  ₹500
                </label>
                <label>
                  <input
                    type="radio"
                    name="q1"
                    value="b"
                    checked={quizAnswers.q1 === 'b'}
                    onChange={() => handleQuizChange('q1', 'b')}
                  />
                  ₹1000
                </label>
                <label>
                  <input
                    type="radio"
                    name="q1"
                    value="c"
                    checked={quizAnswers.q1 === 'c'}
                    onChange={() => handleQuizChange('q1', 'c')}
                  />
                  ₹2000
                </label>
              </div>
            </div>
            
            <div className="quiz-question">
              <h4>2. Which section of the Motor Vehicles Act covers helmet violations?</h4>
              <div className="quiz-options">
                <label>
                  <input
                    type="radio"
                    name="q2"
                    value="a"
                    checked={quizAnswers.q2 === 'a'}
                    onChange={() => handleQuizChange('q2', 'a')}
                  />
                  Section 129
                </label>
                <label>
                  <input
                    type="radio"
                    name="q2"
                    value="b"
                    checked={quizAnswers.q2 === 'b'}
                    onChange={() => handleQuizChange('q2', 'b')}
                  />
                  Section 177
                </label>
                <label>
                  <input
                    type="radio"
                    name="q2"
                    value="c"
                    checked={quizAnswers.q2 === 'c'}
                    onChange={() => handleQuizChange('q2', 'c')}
                  />
                  Section 184
                </label>
              </div>
            </div>
            
            <div className="quiz-question">
              <h4>3. What is the maximum speed limit in city areas?</h4>
              <div className="quiz-options">
                <label>
                  <input
                    type="radio"
                    name="q3"
                    value="a"
                    checked={quizAnswers.q3 === 'a'}
                    onChange={() => handleQuizChange('q3', 'a')}
                  />
                  40 km/h
                </label>
                <label>
                  <input
                    type="radio"
                    name="q3"
                    value="b"
                    checked={quizAnswers.q3 === 'b'}
                    onChange={() => handleQuizChange('q3', 'b')}
                  />
                  50 km/h
                </label>
                <label>
                  <input
                    type="radio"
                    name="q3"
                    value="c"
                    checked={quizAnswers.q3 === 'c'}
                    onChange={() => handleQuizChange('q3', 'c')}
                  />
                  60 km/h
                </label>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="quiz-question">
              <h4>1. What should you do if you receive a challan?</h4>
              <div className="quiz-options">
                <label>
                  <input
                    type="radio"
                    name="q1"
                    value="a"
                    checked={quizAnswers.q1 === 'a'}
                    onChange={() => handleQuizChange('q1', 'a')}
                  />
                  Ignore it
                </label>
                <label>
                  <input
                    type="radio"
                    name="q1"
                    value="b"
                    checked={quizAnswers.q1 === 'b'}
                    onChange={() => handleQuizChange('q1', 'b')}
                  />
                  Pay the fine within the specified time
                </label>
                <label>
                  <input
                    type="radio"
                    name="q1"
                    value="c"
                    checked={quizAnswers.q1 === 'c'}
                    onChange={() => handleQuizChange('q1', 'c')}
                  />
                  Challenge it without paying
                </label>
              </div>
            </div>
            
            <div className="quiz-question">
              <h4>2. What is the penalty for not wearing a helmet?</h4>
              <div className="quiz-options">
                <label>
                  <input
                    type="radio"
                    name="q2"
                    value="a"
                    checked={quizAnswers.q2 === 'a'}
                    onChange={() => handleQuizChange('q2', 'a')}
                  />
                  ₹100 and 3 months license suspension
                </label>
                <label>
                  <input
                    type="radio"
                    name="q2"
                    value="b"
                    checked={quizAnswers.q2 === 'b'}
                    onChange={() => handleQuizChange('q2', 'b')}
                  />
                  ₹500 and 3 months license suspension
                </label>
                <label>
                  <input
                    type="radio"
                    name="q2"
                    value="c"
                    checked={quizAnswers.q2 === 'c'}
                    onChange={() => handleQuizChange('q2', 'c')}
                  />
                  ₹1000 and 6 months license suspension
                </label>
              </div>
            </div>
            
            <div className="quiz-question">
              <h4>3. How can you check your challan status?</h4>
              <div className="quiz-options">
                <label>
                  <input
                    type="radio"
                    name="q3"
                    value="a"
                    checked={quizAnswers.q3 === 'a'}
                    onChange={() => handleQuizChange('q3', 'a')}
                  />
                  Visit the traffic police station
                </label>
                <label>
                  <input
                    type="radio"
                    name="q3"
                    value="b"
                    checked={quizAnswers.q3 === 'b'}
                    onChange={() => handleQuizChange('q3', 'b')}
                  />
                  Online through the official portal
                </label>
                <label>
                  <input
                    type="radio"
                    name="q3"
                    value="c"
                    checked={quizAnswers.q3 === 'c'}
                    onChange={() => handleQuizChange('q3', 'c')}
                  />
                  Both A and B
                </label>
              </div>
            </div>
          </>
        )}
        
        <div className="form-actions">
          <button type="button" onClick={() => setStep(2)} className="back-btn">
            Back
          </button>
          <button type="submit" className="submit-btn">
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="user-role-selection">
      {step === 1 && renderRoleSelection()}
      {step === 2 && renderBasicDetails()}
      {step === 3 && renderQuiz()}
    </div>
  );
};

export default UserRoleSelection;