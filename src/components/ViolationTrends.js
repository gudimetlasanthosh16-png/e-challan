import React, { useState, useEffect } from 'react';

const ViolationTrends = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [chartType, setChartType] = useState('bar');
  
  // Mock data for violation trends
  const monthlyData = [
    { month: 'Jan', overspeeding: 120, noHelmet: 85, redLight: 60, wrongSide: 45, noLicense: 30 },
    { month: 'Feb', overspeeding: 110, noHelmet: 90, redLight: 55, wrongSide: 50, noLicense: 35 },
    { month: 'Mar', overspeeding: 130, noHelmet: 95, redLight: 65, wrongSide: 40, noLicense: 25 },
    { month: 'Apr', overspeeding: 140, noHelmet: 100, redLight: 70, wrongSide: 55, noLicense: 40 },
    { month: 'May', overspeeding: 135, noHelmet: 105, redLight: 68, wrongSide: 48, noLicense: 38 },
    { month: 'Jun', overspeeding: 125, noHelmet: 98, redLight: 62, wrongSide: 52, noLicense: 32 }
  ];
  
  const weeklyData = [
    { week: 'Week 1', overspeeding: 30, noHelmet: 25, redLight: 15, wrongSide: 12, noLicense: 8 },
    { week: 'Week 2', overspeeding: 35, noHelmet: 28, redLight: 18, wrongSide: 14, noLicense: 10 },
    { week: 'Week 3', overspeeding: 28, noHelmet: 22, redLight: 16, wrongSide: 10, noLicense: 7 },
    { week: 'Week 4', overspeeding: 32, noHelmet: 27, redLight: 19, wrongSide: 15, noLicense: 9 }
  ];
  
  const dailyData = [
    { day: 'Mon', overspeeding: 5, noHelmet: 4, redLight: 3, wrongSide: 2, noLicense: 1 },
    { day: 'Tue', overspeeding: 6, noHelmet: 5, redLight: 2, wrongSide: 3, noLicense: 2 },
    { day: 'Wed', overspeeding: 4, noHelmet: 3, redLight: 4, wrongSide: 1, noLicense: 1 },
    { day: 'Thu', overspeeding: 7, noHelmet: 6, redLight: 3, wrongSide: 4, noLicense: 3 },
    { day: 'Fri', overspeeding: 8, noHelmet: 7, redLight: 5, wrongSide: 3, noLicense: 2 },
    { day: 'Sat', overspeeding: 10, noHelmet: 8, redLight: 7, wrongSide: 6, noLicense: 4 },
    { day: 'Sun', overspeeding: 9, noHelmet: 7, redLight: 6, wrongSide: 5, noLicense: 3 }
  ];
  
  const [data, setData] = useState(monthlyData);
  
  useEffect(() => {
    switch (timeRange) {
      case 'week':
        setData(weeklyData);
        break;
      case 'day':
        setData(dailyData);
        break;
      default:
        setData(monthlyData);
    }
  }, [timeRange]);
  
  const getMaxValue = () => {
    return Math.max(...data.flatMap(item => 
      [item.overspeeding, item.noHelmet, item.redLight, item.wrongSide, item.noLicense]
    ));
  };
  
  const maxValue = getMaxValue();
  
  return (
    <div className="violation-trends">
      <div className="trends-header">
        <h2>Violation Trends Analysis</h2>
        <div className="trends-controls">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-selector"
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
          </select>
          <select 
            value={chartType} 
            onChange={(e) => setChartType(e.target.value)}
            className="chart-type-selector"
          >
            <option value="bar">Bar Chart</option>
            <option value="line">Line Chart</option>
          </select>
        </div>
      </div>
      
      <div className="trends-content">
        {chartType === 'bar' ? (
          <div className="bar-chart-container">
            <div className="chart-grid">
              {data.map((item, index) => (
                <div key={index} className="chart-column">
                  <div className="bars">
                    <div 
                      className="bar overspeeding-bar" 
                      style={{height: `${(item.overspeeding / maxValue) * 100}%`}}
                    ></div>
                    <div 
                      className="bar no-helmet-bar" 
                      style={{height: `${(item.noHelmet / maxValue) * 100}%`}}
                    ></div>
                    <div 
                      className="bar red-light-bar" 
                      style={{height: `${(item.redLight / maxValue) * 100}%`}}
                    ></div>
                    <div 
                      className="bar wrong-side-bar" 
                      style={{height: `${(item.wrongSide / maxValue) * 100}%`}}
                    ></div>
                    <div 
                      className="bar no-license-bar" 
                      style={{height: `${(item.noLicense / maxValue) * 100}%`}}
                    ></div>
                  </div>
                  <div className="chart-label">{item.month || item.week || item.day}</div>
                </div>
              ))}
            </div>
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color overspeeding-color"></div>
                <span>Overspeeding</span>
              </div>
              <div className="legend-item">
                <div className="legend-color no-helmet-color"></div>
                <span>No Helmet</span>
              </div>
              <div className="legend-item">
                <div className="legend-color red-light-color"></div>
                <span>Red Light Jump</span>
              </div>
              <div className="legend-item">
                <div className="legend-color wrong-side-color"></div>
                <span>Wrong Side</span>
              </div>
              <div className="legend-item">
                <div className="legend-color no-license-color"></div>
                <span>No License</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="line-chart-container">
            <div className="line-chart">
              {/* In a real app, this would be a proper line chart */}
              <div className="chart-placeholder">
                <p>Line chart visualization would appear here</p>
              </div>
            </div>
          </div>
        )}
        
        <div className="trends-summary">
          <h3>Key Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <h4>Peak Violation Day</h4>
              <p>Saturday</p>
              <span className="insight-value">Highest violation count</span>
            </div>
            <div className="insight-card">
              <h4>Most Common Violation</h4>
              <p>Overspeeding</p>
              <span className="insight-value">42% of all violations</span>
            </div>
            <div className="insight-card">
              <h4>Trend Direction</h4>
              <p>Stable</p>
              <span className="insight-value">±5% variation</span>
            </div>
            <div className="insight-card">
              <h4>Compliance Rate</h4>
              <p>78%</p>
              <span className="insight-value">Improving by 3%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationTrends;