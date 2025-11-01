import React from 'react';

const Features = () => {
  return (
    <div className="features-page">
      <div className="page-header">
        <h1>Powerful Features</h1>
        <p className="header-subtitle">Everything you need for efficient traffic management</p>
      </div>
      
      <div className="content-section">
        <div className="section-container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Mobile-First Design</h3>
              <p>
                Our system is optimized for mobile devices, allowing traffic officers to 
                generate challans and process payments directly from their smartphones 
                or tablets while on patrol.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Real-time Sync</h3>
              <p>
                All data is synchronized in real-time across devices, ensuring that 
                information is always up-to-date whether you're in the office or on the road.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>Enterprise Security</h3>
              <p>
                Military-grade encryption and secure authentication protect all your 
                data from unauthorized access and ensure compliance with government regulations.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">💳</div>
              <h3>Digital Payments</h3>
              <p>
                Accept payments through multiple digital channels including UPI, credit/debit 
                cards, and net banking for instant settlement and reduced cash handling.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">📊</div>
              <h3>Advanced Analytics</h3>
              <p>
                Gain valuable insights with our comprehensive reporting dashboard that 
                helps identify violation patterns and optimize resource allocation.
              </p>
            </div>
            
            <div className="feature-item">
              <div className="feature-icon">🔄</div>
              <h3>Offline Capability</h3>
              <p>
                Continue working even without an internet connection. All data is 
                automatically synced when connectivity is restored.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="integration-section">
        <div className="section-container">
          <h2>Seamless Integrations</h2>
          <p className="section-subtitle">
            Connect with existing government systems for enhanced functionality
          </p>
          
          <div className="integrations-grid">
            <div className="integration-card">
              <div className="integration-logo">RTO</div>
              <h3>RTO Database</h3>
              <p>Real-time vehicle and owner information</p>
            </div>
            
            <div className="integration-card">
              <div className="integration-logo">GST</div>
              <h3>GST Portal</h3>
              <p>Automatic tax compliance reporting</p>
            </div>
            
            <div className="integration-card">
              <div className="integration-logo">API</div>
              <h3>API Access</h3>
              <p>Custom integrations for specific needs</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="pricing-section">
        <div className="section-container">
          <h2>Simple, Transparent Pricing</h2>
          <p className="section-subtitle">
            Choose the plan that works best for your department
          </p>
          
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3>Basic</h3>
              <div className="price">₹0</div>
              <p className="price-description">per officer per month</p>
              <ul>
                <li>Challan Generation</li>
                <li>Basic Reporting</li>
                <li>Email Support</li>
              </ul>
              <button className="pricing-btn">Get Started</button>
            </div>
            
            <div className="pricing-card featured">
              <h3>Professional</h3>
              <div className="price">₹500</div>
              <p className="price-description">per officer per month</p>
              <ul>
                <li>All Basic Features</li>
                <li>Advanced Analytics</li>
                <li>Priority Support</li>
                <li>Custom Integrations</li>
              </ul>
              <button className="pricing-btn featured">Try Free for 30 Days</button>
            </div>
            
            <div className="pricing-card">
              <h3>Enterprise</h3>
              <div className="price">Custom</div>
              <p className="price-description">Tailored for large departments</p>
              <ul>
                <li>All Professional Features</li>
                <li>Dedicated Account Manager</li>
                <li>24/7 Premium Support</li>
                <li>Custom Development</li>
              </ul>
              <button className="pricing-btn">Contact Sales</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;