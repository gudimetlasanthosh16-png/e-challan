import React, { useState } from 'react';

const Help = () => {
  const [activeSection, setActiveSection] = useState('getting-started');
  
  const helpSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: (
        <div>
          <h3>Welcome to Andhra Pradesh Bike Challan System</h3>
          <p>This system helps traffic officers manage bike challans efficiently. Here's how to get started:</p>
          <ol>
            <li><strong>Login</strong>: Use your assigned credentials to access the system</li>
            <li><strong>Dashboard</strong>: View system statistics and recent activity</li>
            <li><strong>Generate Challan</strong>: Create new challans for traffic violations</li>
            <li><strong>Search</strong>: Look up vehicle information and challan history</li>
            <li><strong>Payments</strong>: Process challan payments</li>
          </ol>
        </div>
      )
    },
    {
      id: 'challan-generation',
      title: 'Challan Generation',
      content: (
        <div>
          <h3>Creating a New Challan</h3>
          <p>To generate a new challan:</p>
          <ol>
            <li>Navigate to the "Generate Challan" section</li>
            <li>Enter the vehicle number (format: APXXYYZZZZ)</li>
            <li>Select the violation type from the dropdown</li>
            <li>Enter the location where the violation occurred</li>
            <li>Specify the fine amount (system suggests based on violation)</li>
            <li>Add any additional notes in the description field</li>
            <li>Click "Generate Challan" to create the challan</li>
          </ol>
          <h4>Common Violations</h4>
          <ul>
            <li><strong>Overspeeding</strong>: ₹500-2000 depending on speed limit exceeded</li>
            <li><strong>No Helmet</strong>: ₹500</li>
            <li><strong>Jumping Red Light</strong>: ₹1000</li>
            <li><strong>Wrong Side Driving</strong>: ₹800</li>
            <li><strong>No License</strong>: ₹5000</li>
          </ul>
        </div>
      )
    },
    {
      id: 'vehicle-search',
      title: 'Vehicle Search',
      content: (
        <div>
          <h3>Searching for Vehicle Information</h3>
          <p>Use the vehicle search feature to:</p>
          <ul>
            <li>Verify vehicle registration details</li>
            <li>Check insurance and pollution certificate status</li>
            <li>View pending challans for a vehicle</li>
            <li>Access vehicle owner information</li>
          </ul>
          <h4>Search Tips</h4>
          <ul>
            <li>Enter the complete vehicle number for accurate results</li>
            <li>Vehicle numbers follow the format: AP[District][Series][Number]</li>
            <li>Example: AP23AB1234 (Vijayawada district)</li>
          </ul>
        </div>
      )
    },
    {
      id: 'payments',
      title: 'Payment Processing',
      content: (
        <div>
          <h3>Processing Challan Payments</h3>
          <p>To process a challan payment:</p>
          <ol>
            <li>Go to the "Payment" section</li>
            <li>Enter the challan ID or search by vehicle number</li>
            <li>Verify the challan details</li>
            <li>Select a payment method (UPI, Card, Net Banking)</li>
            <li>Complete the payment process</li>
            <li>Provide a receipt to the payer</li>
          </ol>
          <h4>Payment Methods</h4>
          <ul>
            <li><strong>UPI</strong>: Fast and secure mobile payments</li>
            <li><strong>Credit/Debit Card</strong>: Accept all major cards</li>
            <li><strong>Net Banking</strong>: Direct bank transfers</li>
          </ul>
        </div>
      )
    },
    {
      id: 'offline-mode',
      title: 'Offline Mode',
      content: (
        <div>
          <h3>Working Offline</h3>
          <p>The system supports offline operation:</p>
          <ul>
            <li>Generate challans even without internet connectivity</li>
            <li>Data is automatically saved to your device</li>
            <li>Syncs automatically when connection is restored</li>
            <li>All offline data is securely stored</li>
          </ul>
          <h4>Offline Features</h4>
          <ul>
            <li>Challan generation</li>
            <li>Vehicle information lookup (cached data)</li>
            <li>View previously accessed records</li>
            <li>Payment processing (pending sync)</li>
          </ul>
          <p className="note">Note: Some features require online connectivity and will be unavailable in offline mode.</p>
        </div>
      )
    },
    {
      id: 'reports',
      title: 'Reports & Analytics',
      content: (
        <div>
          <h3>Generating Reports</h3>
          <p>The system provides several reporting options:</p>
          <ul>
            <li><strong>Daily Collection Reports</strong>: Track daily revenue</li>
            <li><strong>Violation Type Reports</strong>: Analyze common violations</li>
            <li><strong>Area-wise Reports</strong>: Compare collections across locations</li>
          </ul>
          <h4>Using Reports</h4>
          <ol>
            <li>Navigate to the "Reports" section</li>
            <li>Select the report type</li>
            <li>Choose date range</li>
            <li>Click "Generate Report"</li>
            <li>Export or print as needed</li>
          </ol>
        </div>
      )
    }
  ];
  
  return (
    <div className="help">
      <h2>Help & Documentation</h2>
      
      <div className="help-container">
        <div className="help-sidebar">
          <h3>Topics</h3>
          <ul>
            {helpSections.map(section => (
              <li key={section.id}>
                <button 
                  className={activeSection === section.id ? 'active' : ''}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="help-content">
          {helpSections.find(section => section.id === activeSection)?.content}
          
          <div className="help-footer">
            <h4>Need More Help?</h4>
            <p>Contact System Administrator: admin@aptraffic.gov.in</p>
            <p>Helpline: +91-863-XXXX-XXXX</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;