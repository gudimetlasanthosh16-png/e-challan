import StorageService from './storageService';

// Mock service for handling challan operations
class ChallanService {
  static notificationCallbacks = [];
  
  // Subscribe to notifications
  static subscribeToNotifications(callback) {
    this.notificationCallbacks.push(callback);
  }
  
  // Unsubscribe from notifications
  static unsubscribeFromNotifications(callback) {
    this.notificationCallbacks = this.notificationCallbacks.filter(cb => cb !== callback);
  }
  
  // Send notification to all subscribers
  static sendNotification(notification) {
    this.notificationCallbacks.forEach(callback => {
      try {
        callback(notification);
      } catch (error) {
        console.error('Error in notification callback:', error);
      }
    });
  }
  
  // Get all challans with more realistic data
  static getAllChallans() {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const challans = [
          { id: 'AP20251030001', vehicle: 'AP23AB1234', date: '2025-10-30', amount: 500, status: 'Paid', violation: 'Overspeeding' },
          { id: 'AP20251030002', vehicle: 'AP24CD5678', date: '2025-10-30', amount: 1200, status: 'Pending', violation: 'No Helmet' },
          { id: 'AP20251029001', vehicle: 'AP25EF9012', date: '2025-10-29', amount: 800, status: 'Paid', violation: 'Wrong Side Driving' },
          { id: 'AP20251028001', vehicle: 'AP26GH3456', date: '2025-10-28', amount: 300, status: 'Paid', violation: 'Jumping Red Light' },
          { id: 'AP20251027001', vehicle: 'AP27IJ7890', date: '2025-10-27', amount: 600, status: 'Pending', violation: 'No License' },
          { id: 'AP20251027002', vehicle: 'AP28KL2468', date: '2025-10-27', amount: 1500, status: 'Paid', violation: 'No Insurance' },
          { id: 'AP20251026001', vehicle: 'AP29MN1357', date: '2025-10-26', amount: 400, status: 'Pending', violation: 'Overspeeding' },
          { id: 'AP20251025001', vehicle: 'AP30OP9753', date: '2025-10-25', amount: 700, status: 'Paid', violation: 'No Helmet' },
          { id: 'AP20251024001', vehicle: 'AP31QR8642', date: '2025-10-24', amount: 900, status: 'Paid', violation: 'Wrong Side Driving' },
          { id: 'AP20251023001', vehicle: 'AP32ST7531', date: '2025-10-23', amount: 1100, status: 'Pending', violation: 'Jumping Red Light' }
        ];
        resolve(challans);
      }, 500);
    });
  }
  
  // Get challan by ID
  static getChallanById(id) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // In a real app, this would filter from the actual data
        const challan = {
          id: id,
          vehicle: 'AP23AB1234',
          date: '2025-10-30',
          amount: 500,
          status: 'Paid',
          violation: 'Overspeeding',
          location: 'Main Road, Vijayawada',
          officer: 'Officer Name',
          description: 'Vehicle was overspeeding by 20 km/h in a 50 km/h zone'
        };
        resolve(challan);
      }, 300);
    });
  }
  
  // Create a new challan
  static createChallan(challanData) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if we're online or offline
        const isOnline = navigator.onLine;
        
        if (isOnline) {
          // Online mode - create challan normally
          const newChallan = {
            id: 'AP' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + Math.floor(100 + Math.random() * 900),
            ...challanData,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending'
          };
          
          // Send notification
          this.sendNotification({
            id: Date.now(),
            title: 'New Challan Generated',
            message: `Challan ${newChallan.id} created for vehicle ${newChallan.vehicle}`,
            time: new Date().toLocaleTimeString(),
            read: false,
            type: 'info'
          });
          
          resolve(newChallan);
        } else {
          // Offline mode - save to local storage
          const offlineChallan = {
            id: 'OFFLINE_' + Date.now(),
            ...challanData,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending',
            offline: true
          };
          
          const saved = StorageService.saveOfflineChallan(offlineChallan);
          if (saved) {
            // Send notification
            this.sendNotification({
              id: Date.now(),
              title: 'Challan Saved Offline',
              message: `Challan for vehicle ${offlineChallan.vehicle} saved locally`,
              time: new Date().toLocaleTimeString(),
              read: false,
              type: 'warning'
            });
            
            resolve(offlineChallan);
          } else {
            reject(new Error('Failed to save offline challan'));
          }
        }
      }, 500);
    });
  }
  
  // Update challan status
  static updateChallanStatus(id, status) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Send notification
        this.sendNotification({
          id: Date.now(),
          title: 'Challan Status Updated',
          message: `Challan ${id} status changed to ${status}`,
          time: new Date().toLocaleTimeString(),
          read: false,
          type: status === 'Paid' ? 'success' : 'info'
        });
        
        resolve({ id, status });
      }, 300);
    });
  }
  
  // Search vehicles
  static searchVehicle(vehicleNumber) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock vehicle data
        const vehicleData = {
          vehicleNumber: vehicleNumber,
          ownerName: "Rajesh Kumar",
          model: "Honda Activa 5G",
          registrationDate: "2022-05-15",
          insuranceValid: true,
          pollutionCertValid: true,
          lastChallan: "None",
          pendingChallans: 0,
          ownerAddress: "123, Main Street, Vijayawada",
          ownerPhone: "+91 9876543210"
        };
        resolve(vehicleData);
      }, 500);
    });
  }
  
  // Get dashboard statistics with more realistic data
  static getDashboardStats() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const stats = {
          totalChallans: 2458,
          paidChallans: 1987,
          pendingPayments: 471,
          todaysChallans: 32,
          totalAmountCollected: 1842500,
          pendingAmount: 432650
        };
        resolve(stats);
      }, 300);
    });
  }
  
  // Get offline challans
  static getOfflineChallans() {
    return Promise.resolve(StorageService.getOfflineChallans());
  }
  
  // Sync offline challans when online
  static syncOfflineChallans() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const offlineChallans = StorageService.getOfflineChallans();
        // In a real app, this would send the challans to the server
        // For now, we'll just mark them as synced
        offlineChallans.forEach(challan => {
          StorageService.updateChallanSyncStatus(challan.id, 'synced');
        });
        
        if (offlineChallans.length > 0) {
          // Send notification
          this.sendNotification({
            id: Date.now(),
            title: 'Offline Data Synced',
            message: `${offlineChallans.length} offline challans synced with server`,
            time: new Date().toLocaleTimeString(),
            read: false,
            type: 'success'
          });
        }
        
        resolve(offlineChallans);
      }, 1000);
    });
  }
}

export default ChallanService;