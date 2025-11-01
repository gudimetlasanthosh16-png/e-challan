import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About Andhra Pradesh Bike Challan System</h1>
        <p className="header-subtitle">Revolutionizing traffic management in Andhra Pradesh</p>
      </div>
      
      <div className="content-section">
        <div className="section-container">
          <div className="text-content">
            <h2>Our Mission</h2>
            <p>
              The Andhra Pradesh Bike Challan System is designed to modernize traffic enforcement and 
              improve road safety across the state. Our mission is to provide traffic officers with 
              efficient digital tools to manage violations, process payments, and generate insightful 
              reports that contribute to safer roads for everyone.
            </p>
            
            <h2>Why Digital Challan System?</h2>
            <p>
              Traditional paper-based challan systems are prone to errors, loss, and inefficiencies. 
              Our digital solution addresses these challenges by providing:
            </p>
            <ul>
              <li>Real-time data capture and storage</li>
              <li>Instant payment processing</li>
              <li>Comprehensive reporting and analytics</li>
              <li>Reduced paperwork and administrative overhead</li>
              <li>Improved transparency and accountability</li>
            </ul>
          </div>
          
          <div className="image-content">
            <div className="placeholder-image">Traffic Management Illustration</div>
          </div>
        </div>
      </div>
      
      <div className="stats-section">
        <div className="section-container">
          <h2>By The Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">50,000+</div>
              <div className="stat-label">Challans Processed Monthly</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Payment Collection Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">200+</div>
              <div className="stat-label">Traffic Officers Using System</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15%</div>
              <div className="stat-label">Reduction in Traffic Violations</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="team-section">
        <div className="section-container">
          <h2>Our Leadership Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">JD</div>
              <h3>John Doe</h3>
              <p>Project Director</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">AS</div>
              <h3>Anil Sharma</h3>
              <p>Technical Lead</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">PK</div>
              <h3>Priya Kumar</h3>
              <p>Product Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;