import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage';
import UserRoleSelection from './components/UserRoleSelection';
import About from './components/About';
import Contact from './components/Contact';
import Features from './components/Features';
import ModernDashboard from './components/ModernDashboard';
import VehicleSearch from './components/VehicleSearch';
import ChallanGeneration from './components/ChallanGeneration';
import ChallanHistory from './components/ChallanHistory';
import PaymentProcessing from './components/PaymentProcessing';
import UserProfile from './components/UserProfile';
import Notifications from './components/Notifications';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Help from './components/Help';
import Speedometer from './components/Speedometer';
import ViolationTrends from './components/ViolationTrends';
import VehicleAnalytics from './components/VehicleAnalytics';
import OfficerPerformance from './components/OfficerPerformance';
import OfflineIndicator from './components/OfflineIndicator';
import ChallanService from './services/challanService';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showUserRoleSelection, setShowUserRoleSelection] = useState(false);
  const [userType, setUserType] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const handleGetStarted = () => {
    setShowLandingPage(false);
    setShowUserRoleSelection(true);
  };
  
  const handleUserRoleComplete = (type, userData) => {
    setShowUserRoleSelection(false);
    setUserType(type);
    setCurrentUser({
      id: Date.now(),
      username: userData.email,
      name: userData.name,
      role: type
    });
  };
  
  const handleLogout = () => {
    setActiveTab('dashboard');
    setShowLandingPage(true);
    setUserType(null);
    setCurrentUser(null);
  };
  
  const handleDashboardNavigation = (tab) => {
    setActiveTab(tab);
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Try to sync offline challans when coming back online
      syncOfflineChallans();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Check for offline challans on app load if online
    if (isOnline) {
      syncOfflineChallans();
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline]);
  
  const syncOfflineChallans = async () => {
    try {
      const offlineChallans = await ChallanService.getOfflineChallans();
      if (offlineChallans.length > 0) {
        await ChallanService.syncOfflineChallans();
        // Show notification or update UI as needed
        console.log(`Synced ${offlineChallans.length} offline challans`);
      }
    } catch (error) {
      console.error('Error syncing offline challans:', error);
    }
  };
  
  // Show landing page initially
  if (showLandingPage) {
    return (
      <>
        <OfflineIndicator />
        <LandingPage onGetStarted={handleGetStarted} />
      </>
    );
  }
  
  // Show user role selection
  if (showUserRoleSelection) {
    return (
      <>
        <OfflineIndicator />
        <UserRoleSelection onComplete={handleUserRoleComplete} />
      </>
    );
  }
  
  // Define navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { id: 'dashboard', label: 'Dashboard', icon: '📊' },
      { id: 'speedometer', label: 'Speedometer', icon: '⏱️' },
      { id: 'payment', label: 'Payment', icon: '💳' },
      { id: 'reports', label: 'Reports', icon: '📈' },
      { id: 'settings', label: 'Settings', icon: '⚙️' },
      { id: 'help', label: 'Help', icon: '❓' }
    ];
    
    // Items only available to officers
    const officerItems = [
      { id: 'search', label: 'Vehicle Search', icon: '🚗' },
      { id: 'challan', label: 'Generate Challan', icon: '📝' },
      { id: 'history', label: 'Challan History', icon: '📋' },
      { id: 'analytics', label: 'Analytics', icon: '📊' },
      { id: 'performance', label: 'Performance', icon: '🏆' }
    ];
    
    // Items only available to citizens
    const citizenItems = [
      { id: 'history', label: 'My Challans', icon: '📋' }
    ];
    
    if (userType === 'officer') {
      // For officers, include all items
      return [...commonItems, ...officerItems];
    } else {
      // For citizens, include common items and citizen-specific items
      return [...commonItems, ...citizenItems];
    }
  };
  
  const navItems = getNavItems();
  
  return (
    <div className="App">
      <OfflineIndicator />
      
      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>
      
      {/* Sidebar Drawer */}
      <div className={`app-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>AP Challan System</h2>
          <button className="sidebar-close-btn" onClick={closeSidebar}>×</button>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                closeSidebar();
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>
        
        <div className="sidebar-footer">
          <button 
            className="sidebar-nav-item"
            onClick={() => {
              setActiveTab('profile');
              closeSidebar();
            }}
          >
            <span className="nav-icon">👤</span>
            <span className="nav-label">{currentUser ? currentUser.name : 'Profile'}</span>
          </button>
          <button 
            className="sidebar-nav-item"
            onClick={() => {
              setActiveTab('notifications');
              closeSidebar();
            }}
          >
            <span className="nav-icon">🔔</span>
            <span className="nav-label">Notifications</span>
          </button>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
      
      {/* Main Content */}
      <div className="app-main-content">
        <header className="App-header">
          <h1>Andhra Pradesh Challan System</h1>
          <div className="header-controls">
            <button 
              className={activeTab === 'notifications' ? 'active' : ''}
              onClick={() => setActiveTab('notifications')}
            >
              Notifications
            </button>
            <button 
              className={activeTab === 'profile' ? 'active' : ''}
              onClick={() => setActiveTab('profile')}
            >
              {currentUser ? currentUser.name : 'Profile'}
            </button>
          </div>
        </header>
        
        <main className="App-main">
          {activeTab === 'dashboard' && <ModernDashboard onNavigate={handleDashboardNavigation} userType={userType} />}
          {activeTab === 'speedometer' && <Speedometer />}
          {activeTab === 'search' && userType === 'officer' && <VehicleSearch />}
          {activeTab === 'challan' && userType === 'officer' && <ChallanGeneration />}
          {activeTab === 'history' && <ChallanHistory userType={userType} currentUser={currentUser} />}
          {activeTab === 'payment' && <PaymentProcessing />}
          {activeTab === 'profile' && <UserProfile user={currentUser} onLogout={handleLogout} />}
          {activeTab === 'notifications' && <Notifications />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'analytics' && userType === 'officer' && <VehicleAnalytics />}
          {activeTab === 'performance' && userType === 'officer' && <OfficerPerformance />}
          {activeTab === 'settings' && <Settings />}
          {activeTab === 'help' && <Help />}
          {activeTab === 'about' && <About />}
          {activeTab === 'contact' && <Contact />}
          {activeTab === 'features' && <Features />}
          {activeTab === 'trends' && <ViolationTrends />}
        </main>
      </div>
    </div>
  );
}

export default App;