import React, { useState, useEffect } from 'react';
import ChallanService from '../services/challanService';

const Reports = () => {
  const [reportType, setReportType] = useState('daily');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Initialize with default date range
  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    
    setDateRange({
      startDate: lastWeek.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    });
  }, []);
  
  const generateReport = async () => {
    setLoading(true);
    
    try {
      // In a real app, this would call the actual report API
      // For now, we'll simulate with mock data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockReportData = {
        daily: {
          title: 'Daily Collection Report',
          data: [
            { date: '2025-10-25', challans: 12, amount: 6500 },
            { date: '2025-10-26', challans: 18, amount: 9200 },
            { date: '2025-10-27', challans: 15, amount: 7800 },
            { date: '2025-10-28', challans: 22, amount: 11500 },
            { date: '2025-10-29', challans: 19, amount: 9800 },
            { date: '2025-10-30', challans: 24, amount: 12600 }
          ],
          totalChallans: 110,
          totalAmount: 57400
        },
        violation: {
          title: 'Violation Type Report',
          data: [
            { violation: 'Overspeeding', count: 45, amount: 22500 },
            { violation: 'No Helmet', count: 32, amount: 16000 },
            { violation: 'Jumping Red Light', count: 18, amount: 10800 },
            { violation: 'Wrong Side Driving', count: 12, amount: 7200 },
            { violation: 'No License', count: 8, amount: 8000 },
            { violation: 'Others', count: 15, amount: 9500 }
          ],
          totalViolations: 130,
          totalAmount: 74000
        },
        area: {
          title: 'Area-wise Collection Report',
          data: [
            { area: 'Vijayawada Central', challans: 42, amount: 21500 },
            { area: 'Guntur Main Road', challans: 35, amount: 18200 },
            { area: 'Vizag Highway', challans: 28, amount: 14600 },
            { area: 'Tirupati Bypass', challans: 25, amount: 12800 },
            { area: 'Nellore Junction', challans: 20, amount: 10500 }
          ],
          totalAreas: 5,
          totalAmount: 77600
        }
      };
      
      setReportData(mockReportData[reportType]);
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      generateReport();
    }
  }, [reportType, dateRange]);
  
  return (
    <div className="reports">
      <h2>Reports & Analytics</h2>
      
      <div className="report-controls">
        <div className="form-group">
          <label>Report Type:</label>
          <select 
            value={reportType} 
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="daily">Daily Collection</option>
            <option value="violation">Violation Type</option>
            <option value="area">Area-wise Collection</option>
          </select>
        </div>
        
        <div className="date-range">
          <div className="form-group">
            <label>Start Date:</label>
            <input 
              type="date" 
              value={dateRange.startDate}
              onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label>End Date:</label>
            <input 
              type="date" 
              value={dateRange.endDate}
              onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
            />
          </div>
        </div>
      </div>
      
      {loading ? (
        <div className="loading">Generating report...</div>
      ) : reportData ? (
        <div className="report-content">
          <h3>{reportData.title}</h3>
          <p className="report-period">
            Period: {dateRange.startDate} to {dateRange.endDate}
          </p>
          
          <div className="report-summary">
            <div className="summary-card">
              <h4>Total Records</h4>
              <p>{reportData.totalChallans || reportData.totalViolations || reportData.totalAreas}</p>
            </div>
            <div className="summary-card">
              <h4>Total Amount</h4>
              <p>₹{reportData.totalAmount?.toLocaleString() || 0}</p>
            </div>
          </div>
          
          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  {reportType === 'daily' && (
                    <>
                      <th>Date</th>
                      <th>Challans</th>
                      <th>Amount (₹)</th>
                    </>
                  )}
                  {reportType === 'violation' && (
                    <>
                      <th>Violation Type</th>
                      <th>Count</th>
                      <th>Amount (₹)</th>
                    </>
                  )}
                  {reportType === 'area' && (
                    <>
                      <th>Area</th>
                      <th>Challans</th>
                      <th>Amount (₹)</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {reportData.data.map((item, index) => (
                  <tr key={index}>
                    {reportType === 'daily' && (
                      <>
                        <td>{item.date}</td>
                        <td>{item.challans}</td>
                        <td>₹{item.amount.toLocaleString()}</td>
                      </>
                    )}
                    {reportType === 'violation' && (
                      <>
                        <td>{item.violation}</td>
                        <td>{item.count}</td>
                        <td>₹{item.amount.toLocaleString()}</td>
                      </>
                    )}
                    {reportType === 'area' && (
                      <>
                        <td>{item.area}</td>
                        <td>{item.challans}</td>
                        <td>₹{item.amount.toLocaleString()}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="report-actions">
            <button className="export-btn">Export to Excel</button>
            <button className="print-btn">Print Report</button>
          </div>
        </div>
      ) : (
        <div className="no-report">Select parameters to generate report</div>
      )}
    </div>
  );
};

export default Reports;