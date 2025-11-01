import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send the data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    
    // Reset submitted status after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };
  
  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Contact Us</h1>
        <p className="header-subtitle">Get in touch with our team for support or inquiries</p>
      </div>
      
      <div className="content-section">
        <div className="section-container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get In Touch</h2>
              <p>
                Have questions about the Andhra Pradesh Bike Challan System? Our support team 
                is here to help you with any inquiries or technical issues.
              </p>
              
              <div className="contact-details">
                <div className="contact-item">
                  <h3>📧 Email</h3>
                  <p>support@apbiketraffic.gov.in</p>
                  <p>admin@apbiketraffic.gov.in</p>
                </div>
                
                <div className="contact-item">
                  <h3>📞 Phone</h3>
                  <p>+91-863-XXXX-XXXX</p>
                  <p>+91-863-XXXX-XXXX</p>
                </div>
                
                <div className="contact-item">
                  <h3>🏢 Office</h3>
                  <p>Andhra Pradesh Traffic Police Headquarters</p>
                  <p>Amaravati, Andhra Pradesh</p>
                </div>
                
                <div className="contact-item">
                  <h3>🕒 Support Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            
            <div className="contact-form">
              <h2>Send a Message</h2>
              {submitted ? (
                <div className="success-message">
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows="5"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;