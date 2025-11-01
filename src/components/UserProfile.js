import React, { useState } from 'react';

const UserProfile = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user.name,
    email: user.email || '',
    phone: user.phone || '',
    department: user.department || (user.role === 'officer' ? 'Traffic Police' : 'Citizen'),
    badgeNumber: user.badgeNumber || (user.role === 'officer' ? 'TP-001' : 'N/A'),
    vehicleNumber: user.vehicleNumber || 'AP23AB1234'
  });
  
  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send data to a server
    alert('Profile updated successfully!');
    setIsEditing(false);
  };
  
  // Mock statistics based on user role
  const getStats = () => {
    if (user.role === 'officer') {
      return [
        { title: 'Challans Issued', value: '127', icon: '📋' },
        { title: 'Payments Collected', value: '₹84,250', icon: '💰' },
        { title: 'Violations Detected', value: '98', icon: '🚨' },
        { title: 'Resolution Rate', value: '87%', icon: '✅' }
      ];
    } else {
      return [
        { title: 'Active Challans', value: '3', icon: '📋' },
        { title: 'Total Paid', value: '₹12,500', icon: '💳' },
        { title: 'Pending Payments', value: '₹2,400', icon: '⏳' },
        { title: 'Compliance Score', value: '92%', icon: '⭐' }
      ];
    }
  };
  
  const stats = getStats();
  
  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>{user.role === 'officer' ? 'Officer Profile' : 'User Profile'}</h2>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={() => setIsEditing(false)} className="cancel-btn">Cancel</button>
              <button onClick={handleSubmit} className="save-btn">Save</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="edit-btn">Edit Profile</button>
              <button onClick={onLogout} className="logout-btn">Logout</button>
            </>
          )}
        </div>
      </div>
      
      <div className="profile-content">
        <div className="profile-info-section">
          <div className="profile-avatar">
            <div className="avatar-container">
              <div className="avatar-placeholder">
                {user.name.charAt(0)}
              </div>
              <div className={`status-indicator ${user.role}`}></div>
            </div>
            <div className="profile-basic-info">
              <h3>{user.name}</h3>
              <p className="user-role">{user.role === 'officer' ? 'Traffic Officer' : 'Citizen'}</p>
              <p className="user-id">ID: {user.username}</p>
            </div>
          </div>
          
          {isEditing ? (
            <form onSubmit={handleSubmit} className="profile-form">
              <div className="form-group">
                <label>Name:</label>
                <input 
                  type="text" 
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Email:</label>
                <input 
                  type="email" 
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label>Phone:</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                />
              </div>
              
              {user.role === 'officer' ? (
                <>
                  <div className="form-group">
                    <label>Department:</label>
                    <input 
                      type="text" 
                      name="department"
                      value={profileData.department}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Badge Number:</label>
                    <input 
                      type="text" 
                      name="badgeNumber"
                      value={profileData.badgeNumber}
                      onChange={handleChange}
                    />
                  </div>
                </>
              ) : (
                <div className="form-group">
                  <label>Vehicle Number:</label>
                  <input 
                    type="text" 
                    name="vehicleNumber"
                    value={profileData.vehicleNumber}
                    onChange={handleChange}
                  />
                </div>
              )}
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-item">
                <label>Full Name:</label>
                <span>{user.name}</span>
              </div>
              
              <div className="detail-item">
                <label>Username:</label>
                <span>{user.username}</span>
              </div>
              
              <div className="detail-item">
                <label>Role:</label>
                <span className={`role-badge ${user.role}`}>{user.role === 'officer' ? 'Traffic Officer' : 'Citizen'}</span>
              </div>
              
              <div className="detail-item">
                <label>Email:</label>
                <span>{profileData.email || 'Not provided'}</span>
              </div>
              
              <div className="detail-item">
                <label>Phone:</label>
                <span>{profileData.phone || 'Not provided'}</span>
              </div>
              
              {user.role === 'officer' ? (
                <>
                  <div className="detail-item">
                    <label>Department:</label>
                    <span>{profileData.department}</span>
                  </div>
                  
                  <div className="detail-item">
                    <label>Badge Number:</label>
                    <span>{profileData.badgeNumber}</span>
                  </div>
                </>
              ) : (
                <div className="detail-item">
                  <label>Vehicle Number:</label>
                  <span>{profileData.vehicleNumber}</span>
                </div>
              )}
              
              <div className="detail-item">
                <label>Member Since:</label>
                <span>Jan 15, 2023</span>
              </div>
              
              <div className="detail-item">
                <label>Last Login:</label>
                <span>Today, 09:45 AM</span>
              </div>
            </div>
          )}
        </div>
        
        <div className="profile-stats-section">
          <h3>{user.role === 'officer' ? 'Performance Metrics' : 'Account Summary'}</h3>
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon">{stat.icon}</div>
                <h4>{stat.title}</h4>
                <p className="stat-value">{stat.value}</p>
              </div>
            ))}
          </div>
          
          {user.role === 'officer' ? (
            <div className="achievements-section">
              <h3>Recent Achievements</h3>
              <div className="achievements-list">
                <div className="achievement-item">
                  <div className="achievement-icon">🏆</div>
                  <div className="achievement-content">
                    <h4>Top Performer</h4>
                    <p>Ranked #1 for highest challans issued this month</p>
                  </div>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon">⭐</div>
                  <div className="achievement-content">
                    <h4>Perfect Compliance</h4>
                    <p>100% compliance rate in School Zone monitoring</p>
                  </div>
                </div>
                <div className="achievement-item">
                  <div className="achievement-icon">🏅</div>
                  <div className="achievement-content">
                    <h4>Community Service</h4>
                    <p>Outstanding contribution to road safety awareness</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="tips-section">
              <h3>Road Safety Tips</h3>
              <div className="tips-list">
                <div className="tip-item">
                  <div className="tip-icon">✅</div>
                  <div className="tip-content">
                    <h4>Wear Your Helmet</h4>
                    <p>Always wear a properly fitted helmet while riding</p>
                  </div>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">🚦</div>
                  <div className="tip-content">
                    <h4>Follow Traffic Signals</h4>
                    <p>Obey all traffic signals and signs</p>
                  </div>
                </div>
                <div className="tip-item">
                  <div className="tip-icon">📱</div>
                  <div className="tip-content">
                    <h4>Avoid Distractions</h4>
                    <p>Don't use mobile phones while driving</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;