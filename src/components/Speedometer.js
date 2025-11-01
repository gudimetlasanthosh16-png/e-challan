import React, { useState, useEffect, useRef, useCallback } from 'react';
import ChallanService from '../services/challanService';

const Speedometer = () => {
  const [speed, setSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [challans, setChallans] = useState([]);
  const speedIntervalRef = useRef(null);
  const alarmSoundRef = useRef(null);
  const speedsRef = useRef([]);
  const overspeedEventsRef = useRef([]);
  const warningTimeoutRef = useRef(null);

  const startMonitoring = useCallback(() => {
    if (speedIntervalRef.current) return;
    if (isMonitoring) return;
    
    setIsMonitoring(true);
    setWarningCount(0);
    setShowWarning(false);
    speedsRef.current = [];
    setSpeedHistory([]);
    overspeedEventsRef.current = [];
    
    // Clear any existing intervals
    if (speedIntervalRef.current) {
      clearInterval(speedIntervalRef.current);
    }
    
    // Start generating random speeds
    speedIntervalRef.current = setInterval(() => {
      // Generate a more realistic speed pattern
      let newSpeed;
      if (speedsRef.current.length === 0) {
        newSpeed = Math.floor(Math.random() * 30); // Start slow
      } else {
        // Create a more natural acceleration/deceleration pattern
        const prevSpeed = speedsRef.current[speedsRef.current.length - 1];
        const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
        newSpeed = Math.max(0, Math.min(120, prevSpeed + change));
      }
      
      speedsRef.current.push(newSpeed);
      setSpeed(newSpeed);
      
      // Update speed history (keep last 20 entries)
      setSpeedHistory(prev => {
        const newHistory = [...prev, { time: Date.now(), speed: newSpeed }];
        return newHistory.slice(-20);
      });
      
      // Calculate statistics
      const currentSpeeds = speedsRef.current;
      const currentMax = Math.max(...currentSpeeds);
      const currentAvg = currentSpeeds.length > 0 
        ? Math.round(currentSpeeds.reduce((sum, s) => sum + s, 0) / currentSpeeds.length)
        : 0;
      
      setMaxSpeed(currentMax);
      setAvgSpeed(currentAvg);
      
      // Check if speed exceeds limit
      if (newSpeed > 80) {
        handleOverspeedingEvent(newSpeed);
      } else {
        // Reset warning if speed is below limit
        if (showWarning) {
          setShowWarning(false);
        }
      }
    }, 500); // Update more frequently for realism
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    if (speedIntervalRef.current) {
      clearInterval(speedIntervalRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
    setShowWarning(false);
  };

  const handleOverspeedingEvent = async (currentSpeed) => {
    // Record the overspeed event
    const event = {
      timestamp: Date.now(),
      speed: currentSpeed,
      eventId: `OS-${Date.now()}`,
      processed: false
    };
    
    overspeedEventsRef.current.push(event);
    
    // If this is a new overspeed event (not continuing from previous)
    if (!showWarning) {
      setShowWarning(true);
      setWarningCount(1);
      
      // Play warning sound
      playWarningSound();
      
      // Set timeout for next warning
      warningTimeoutRef.current = setTimeout(() => {
        setShowWarning(false);
      }, 5000);
    } else if (warningCount < 3) {
      const newCount = warningCount + 1;
      setWarningCount(newCount);
      
      // Play warning sound
      playWarningSound();
      
      // Set timeout for next warning
      if (newCount < 3) {
        warningTimeoutRef.current = setTimeout(() => {
          setShowWarning(false);
        }, 5000);
      } else {
        // After 3 warnings, generate automatic challan
        await generateAutomaticChallan(currentSpeed);
      }
    }
    
    // If speed is significantly over limit, generate challan immediately
    if (currentSpeed > 100 && !event.processed) {
      event.processed = true;
      await generateAutomaticChallan(currentSpeed);
    }
  };

  const playWarningSound = () => {
    // In a real app, we would play an actual sound
    console.log("Warning sound played");
  };

  const generateAutomaticChallan = async (speedValue) => {
    try {
      // Create challan data
      const challanData = {
        vehicle: 'AP23AB1234', // In a real app, this would be detected
        violation: 'Overspeeding',
        location: 'Highway Sector 5',
        amount: calculateChallanAmount(speedValue),
        description: `Vehicle detected overspeeding at ${speedValue} km/h. Speed limit is 80 km/h.`
      };
      
      // Generate challan through service
      const newChallan = await ChallanService.createChallan(challanData);
      
      // Add to challans list
      setChallans(prev => [newChallan, ...prev]);
      
      // Add to complaints
      const newComplaint = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        speed: speedValue,
        status: 'Challan Generated',
        complaintId: newChallan.id
      };
      
      setComplaints(prev => [newComplaint, ...prev]);
      setShowWarning(false);
      setWarningCount(0);
      
      // Show notification
      alert(`Automatic challan generated! Speed: ${speedValue} km/h. Challan ID: ${newChallan.id}. Amount: ₹${challanData.amount}`);
      
      return newChallan;
    } catch (error) {
      console.error('Error generating challan:', error);
      alert('Error generating challan. Please try again.');
    }
  };

  const calculateChallanAmount = (speedValue) => {
    // Calculate challan amount based on overspeeding
    const overspeed = speedValue - 80;
    if (overspeed <= 10) return 500; // 81-90 km/h
    if (overspeed <= 20) return 1000; // 91-100 km/h
    if (overspeed <= 30) return 2000; // 101-110 km/h
    return 3000; // Above 110 km/h
  };

  const clearComplaints = () => {
    setComplaints([]);
  };

  const clearChallans = () => {
    setChallans([]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (speedIntervalRef.current) {
        clearInterval(speedIntervalRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, []);

  // Calculate needle rotation (0-120 km/h mapped to -120° to 120°)
  const getNeedleRotation = () => {
    return (speed / 120) * 240 - 120;
  };

  // Get speed color based on value
  const getSpeedColor = () => {
    if (speed <= 60) return '#10b981'; // Green
    if (speed <= 80) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const handlePayChallan = (challan) => {
    // In a real app, this would navigate to the payment page with the challan data
    alert(`Redirecting to payment page for Challan ID: ${challan.id}, Amount: ₹${challan.amount}`);
  };

  return (
    <div className="speedometer-container">
      <h2>Real-time Speed Monitoring</h2>
      
      <div className="speedometer-content">
        <div className="speed-display">
          <div className="speedometer">
            <div className="speedometer-dial">
              {/* Speed markings */}
              <div className="speed-markings">
                {[0, 20, 40, 60, 80, 100, 120].map((value) => (
                  <div 
                    key={value} 
                    className="speed-marking"
                    style={{ transform: `rotate(${(value / 120) * 240 - 120}deg)` }}
                  >
                    <span>{value}</span>
                  </div>
                ))}
              </div>
              
              {/* Colored zones */}
              <div className="speed-zone safe"></div>
              <div className="speed-zone warning"></div>
              <div className="speed-zone danger"></div>
              
              <div 
                className="speedometer-needle" 
                style={{ 
                  transform: `rotate(${getNeedleRotation()}deg)`,
                  backgroundColor: getSpeedColor()
                }}
              ></div>
              <div className="speedometer-center"></div>
            </div>
            <div className="speed-value">
              <span className="speed-number">{speed}</span>
              <span className="speed-unit">km/h</span>
            </div>
          </div>
          
          <div className="speed-stats">
            <div className="stat-card">
              <div className="stat-label">Current Speed</div>
              <div className="stat-value" style={{ color: getSpeedColor() }}>
                {speed} <span className="stat-unit">km/h</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Max Speed</div>
              <div className="stat-value">
                {maxSpeed} <span className="stat-unit">km/h</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Avg Speed</div>
              <div className="stat-value">
                {avgSpeed} <span className="stat-unit">km/h</span>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-label">Status</div>
              <div className={`stat-value ${speed > 80 ? 'danger' : speed > 60 ? 'warning' : 'safe'}`}>
                {speed > 80 ? 'Overspeeding' : speed > 60 ? 'Moderate' : 'Normal'}
              </div>
            </div>
          </div>
        </div>
        
        <div className="speed-controls">
          {!isMonitoring ? (
            <button className="start-btn" onClick={startMonitoring}>
              Start Monitoring
            </button>
          ) : (
            <button className="stop-btn" onClick={stopMonitoring}>
              Stop Monitoring
            </button>
          )}
          
          {showWarning && (
            <div className="warning-panel">
              <div className="warning-icon">⚠️</div>
              <div className="warning-text">
                <h3>Speed Limit Exceeded!</h3>
                <p>You are driving at {speed} km/h. Speed limit is 80 km/h.</p>
                <p>Warning {warningCount} of 3</p>
              </div>
            </div>
          )}
          
          <div className="speed-limit-indicator">
            <div className="limit-label">Speed Limit</div>
            <div className="limit-value">80 km/h</div>
          </div>
        </div>
      </div>
      
      {/* Speed History Chart */}
      {speedHistory.length > 0 && (
        <div className="speed-history-section">
          <h3>Speed History</h3>
          <div className="history-controls">
            <button 
              className="history-btn"
              onClick={() => {
                // Refresh history
                setSpeedHistory([...speedHistory]);
              }}
            >
              Refresh
            </button>
            <button 
              className="history-btn clear-btn"
              onClick={() => {
                // Clear history
                setSpeedHistory([]);
                speedsRef.current = [];
              }}
            >
              Clear History
            </button>
          </div>
          
          <div className="history-chart-container">
            <div className="history-chart">
              {speedHistory.map((entry, index) => (
                <div key={index} className="history-bar-container">
                  <div 
                    className="history-bar" 
                    style={{
                      height: `${(entry.speed / 120) * 100}%`,
                      backgroundColor: entry.speed > 80 ? '#ef4444' : entry.speed > 60 ? '#f59e0b' : '#10b981'
                    }}
                  ></div>
                  <div className="history-bar-label">{entry.speed}</div>
                </div>
              ))}
            </div>
            
            <div className="history-stats">
              <div className="history-stat-card">
                <div className="history-stat-label">Total Readings</div>
                <div className="history-stat-value">{speedHistory.length}</div>
              </div>
              
              <div className="history-stat-card">
                <div className="history-stat-label">Highest Speed</div>
                <div className="history-stat-value">{maxSpeed} km/h</div>
              </div>
              
              <div className="history-stat-card">
                <div className="history-stat-label">Average Speed</div>
                <div className="history-stat-value">{avgSpeed} km/h</div>
              </div>
              
              <div className="history-stat-card">
                <div className="history-stat-label">Overspeeding Events</div>
                <div className="history-stat-value">
                  {speedHistory.filter(entry => entry.speed > 80).length}
                </div>
              </div>
            </div>
          </div>
          
          {/* Detailed Speed History Table */}
          <div className="speed-history-table">
            <h4>Detailed Speed Log</h4>
            <table className="history-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Speed (km/h)</th>
                  <th>Status</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {speedHistory.map((entry, index) => {
                  const prevEntry = index > 0 ? speedHistory[index - 1] : null;
                  const duration = prevEntry ? 
                    Math.round((entry.time - prevEntry.time) / 1000) + 's' : '0s';
                  
                  return (
                    <tr key={index}>
                      <td>{new Date(entry.time).toLocaleTimeString()}</td>
                      <td>{entry.speed}</td>
                      <td>
                        <span className={`status-badge ${
                          entry.speed > 80 ? 'danger' : 
                          entry.speed > 60 ? 'warning' : 'safe'
                        }`}>
                          {entry.speed > 80 ? 'Overspeeding' : 
                           entry.speed > 60 ? 'Moderate' : 'Normal'}
                        </span>
                      </td>
                      <td>{duration}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Automatic Challans Section */}
      {challans.length > 0 && (
        <div className="challans-section">
          <div className="challans-header">
            <h3>Automatic Challans Generated</h3>
            <button className="clear-btn" onClick={clearChallans}>
              Clear All
            </button>
          </div>
          
          <div className="challans-list">
            {challans.map(challan => (
              <div key={challan.id} className="challan-item">
                <div className="challan-header">
                  <div className="challan-id">Challan ID: {challan.id}</div>
                  <div className={`challan-status ${challan.status.toLowerCase()}`}>
                    {challan.status}
                  </div>
                </div>
                <div className="challan-details">
                  <div className="challan-info">
                    <div className="challan-label">Vehicle:</div>
                    <div className="challan-value">{challan.vehicle}</div>
                  </div>
                  <div className="challan-info">
                    <div className="challan-label">Violation:</div>
                    <div className="challan-value">{challan.violation}</div>
                  </div>
                  <div className="challan-info">
                    <div className="challan-label">Amount:</div>
                    <div className="challan-value">₹{challan.amount}</div>
                  </div>
                  <div className="challan-info">
                    <div className="challan-label">Date:</div>
                    <div className="challan-value">{challan.date || new Date().toLocaleDateString()}</div>
                  </div>
                  <div className="challan-info">
                    <div className="challan-label">Location:</div>
                    <div className="challan-value">{challan.location}</div>
                  </div>
                </div>
                <div className="challan-actions">
                  <button className="view-btn">View Details</button>
                  <button className="pay-btn" onClick={() => handlePayChallan(challan)}>Pay Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Complaints Section */}
      {complaints.length > 0 && (
        <div className="complaints-section">
          <div className="complaints-header">
            <h3>Automatic Complaints Filed</h3>
            <button className="clear-btn" onClick={clearComplaints}>
              Clear All
            </button>
          </div>
          
          <div className="complaints-list">
            {complaints.map(complaint => (
              <div key={complaint.id} className="complaint-item">
                <div className="complaint-info">
                  <div className="complaint-id">ID: {complaint.complaintId}</div>
                  <div className="complaint-speed">Speed: {complaint.speed} km/h</div>
                  <div className="complaint-time">Time: {complaint.timestamp}</div>
                  <div className="complaint-status">Status: {complaint.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Speedometer;