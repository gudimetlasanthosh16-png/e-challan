import React from 'react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <div className="logo-container">
          <div className="logo">AP</div>
        </div>
        
        <h1>Andhra Pradesh Challan System</h1>
        <p className="tagline">Efficient traffic management and violation tracking</p>
        
        <p className="description">
          Welcome to the official Andhra Pradesh Challan System. Our platform helps traffic officers 
          efficiently manage violations while providing citizens with easy access to their challan information 
          and payment options. With real-time speed monitoring and automatic challan generation, we're making 
          roads safer for everyone.
        </p>
        
        <button onClick={onGetStarted} className="get-started-btn">
          Get Started
        </button>
      </div>
      
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">📝</div>
          <h3>Easy Challan Generation</h3>
          <p>Officers can quickly generate challans with all necessary details and violation information.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Secure Payments</h3>
          <p>Citizens can securely pay their challans online with multiple payment options available.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🚨</div>
          <h3>Real-time Speed Monitoring</h3>
          <p>Advanced speed detection system that automatically generates challans for overspeeding.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Analytics & Reports</h3>
          <p>Comprehensive dashboards and reports for better traffic management decisions.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3>Mobile Friendly</h3>
          <p>Fully responsive design that works seamlessly on all devices.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>AI-Powered System</h3>
          <p>Intelligent system that automatically processes violations and generates documentation.</p>
        </div>
      </div>
      
      <div className="hero-stats">
        <div className="hero-stat">
          <div className="stat-number">25,000+</div>
          <div className="stat-label">Challans Processed</div>
        </div>
        
        <div className="hero-stat">
          <div className="stat-number">98%</div>
          <div className="stat-label">Payment Success Rate</div>
        </div>
        
        <div className="hero-stat">
          <div className="stat-number">15,000+</div>
          <div className="stat-label">Happy Users</div>
        </div>
      </div>
      
      <div className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Speed Detection</h3>
            <p>Our system monitors vehicle speeds in real-time using advanced sensors.</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Violation Detection</h3>
            <p>When a vehicle exceeds the speed limit, the system automatically detects it.</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Challan Generation</h3>
            <p>AI automatically generates a challan with all required details and pricing.</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Payment & Resolution</h3>
            <p>Users receive the challan and can pay securely through our platform.</p>
          </div>
        </div>
      </div>
      
      <div className="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The system has made my job so much easier. Generating challans now takes just a few clicks, and the automatic speed monitoring has reduced violations significantly."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-name">Rajesh Kumar</div>
              <div className="author-title">Traffic Officer, Vijayawada</div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"I used to dread getting challans, but this system makes it so transparent. I can see exactly why I got the challan and pay it instantly online."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-name">Priya Sharma</div>
              <div className="author-title">Citizen, Hyderabad</div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The analytics dashboard gives us valuable insights into traffic patterns and violation hotspots, helping us deploy resources more effectively."</p>
            </div>
            <div className="testimonial-author">
              <div className="author-name">Dr. Srinivas Rao</div>
              <div className="author-title">Traffic Police Commissioner</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-items">
          <div className="faq-item">
            <h3>How does the automatic speed monitoring work?</h3>
            <p>Our system uses advanced sensors and cameras to monitor vehicle speeds in real-time. When a vehicle exceeds the legal speed limit, the system automatically captures the violation and generates a challan.</p>
          </div>
          
          <div className="faq-item">
            <h3>Can I pay my challan online?</h3>
            <p>Yes, you can pay your challans securely online through our platform using various payment methods including credit/debit cards, UPI, and net banking.</p>
          </div>
          
          <div className="faq-item">
            <h3>What happens if I don't pay my challan?</h3>
            <p>Unpaid challans may result in additional penalties and could lead to vehicle impoundment or legal action. We recommend paying challans promptly to avoid complications.</p>
          </div>
          
          <div className="faq-item">
            <h3>How can I check my challan status?</h3>
            <p>You can check your challan status by logging into the system with your vehicle registration number or driving license number.</p>
          </div>
        </div>
      </div>
      
      <div className="contact-section">
        <h2>Contact Us</h2>
        <div className="contact-content">
          <div className="contact-info">
            <h3>Andhra Pradesh Traffic Police Department</h3>
            <p>For assistance with challans or to report issues with the system:</p>
            <div className="contact-details">
              <p>📞 Toll-free: 1800-123-4567</p>
              <p>📧 Email: support@apchallan.gov.in</p>
              <p>🏢 Address: Traffic Police Headquarters, Amaravati, Andhra Pradesh</p>
            </div>
          </div>
          <div className="quick-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#features">Features</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="/privacy-policy">Privacy Policy</a></li>
              <li><a href="/terms-of-service">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <footer className="landing-footer">
        <p>© 2025 Andhra Pradesh Traffic Police Department. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;