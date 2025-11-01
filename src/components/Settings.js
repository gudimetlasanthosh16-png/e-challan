import React, { useState, useEffect } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    autoSync: true,
    language: 'en',
    dateFormat: 'dd/mm/yyyy',
    currency: 'INR'
  });
  
  const [saved, setSaved] = useState(false);
  
  useEffect(() => {
    // Load settings from localStorage if available
    const savedSettings = localStorage.getItem('challan_settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);
  
  const handleChange = (name, value) => {
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
    setSaved(false);
  };
  
  const handleSave = () => {
    localStorage.setItem('challan_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };
  
  return (
    <div className="settings">
      <h2>System Settings</h2>
      
      {saved && (
        <div className="success-message">
          Settings saved successfully!
        </div>
      )}
      
      <div className="settings-form">
        <div className="form-group">
          <label>Theme:</label>
          <select 
            value={settings.theme} 
            onChange={(e) => handleChange('theme', e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Notifications:</label>
          <div className="toggle-switch">
            <input 
              type="checkbox" 
              id="notifications"
              checked={settings.notifications}
              onChange={(e) => handleChange('notifications', e.target.checked)}
            />
            <label htmlFor="notifications" className="switch-label">
              <span className="switch-inner"></span>
              <span className="switch-switch"></span>
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label>Auto-sync Offline Data:</label>
          <div className="toggle-switch">
            <input 
              type="checkbox" 
              id="autoSync"
              checked={settings.autoSync}
              onChange={(e) => handleChange('autoSync', e.target.checked)}
            />
            <label htmlFor="autoSync" className="switch-label">
              <span className="switch-inner"></span>
              <span className="switch-switch"></span>
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <label>Language:</label>
          <select 
            value={settings.language} 
            onChange={(e) => handleChange('language', e.target.value)}
          >
            <option value="en">English</option>
            <option value="te">తెలుగు (Telugu)</option>
            <option value="hi">हिंदी (Hindi)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Date Format:</label>
          <select 
            value={settings.dateFormat} 
            onChange={(e) => handleChange('dateFormat', e.target.value)}
          >
            <option value="dd/mm/yyyy">DD/MM/YYYY</option>
            <option value="mm/dd/yyyy">MM/DD/YYYY</option>
            <option value="yyyy-mm-dd">YYYY-MM-DD</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Currency:</label>
          <select 
            value={settings.currency} 
            onChange={(e) => handleChange('currency', e.target.value)}
          >
            <option value="INR">Indian Rupee (₹)</option>
            <option value="USD">US Dollar ($)</option>
          </select>
        </div>
        
        <button onClick={handleSave} className="save-btn">Save Settings</button>
      </div>
      
      <div className="system-info">
        <h3>System Information</h3>
        <div className="info-grid">
          <div className="info-item">
            <label>App Version:</label>
            <span>1.0.0</span>
          </div>
          <div className="info-item">
            <label>Last Sync:</label>
            <span>2025-10-31 14:30</span>
          </div>
          <div className="info-item">
            <label>Storage Used:</label>
            <span>2.4 MB</span>
          </div>
          <div className="info-item">
            <label>Connection:</label>
            <span className={navigator.onLine ? 'online' : 'offline'}>
              {navigator.onLine ? 'Online' : 'Offline'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;