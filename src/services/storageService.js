// Service for handling local storage operations
class StorageService {
  static STORAGE_KEY = 'ap_bike_challan_data';
  
  // Save data to local storage
  static saveData(key, data) {
    try {
      const storedData = this.getStoredData();
      storedData[key] = data;
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storedData));
      return true;
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return false;
    }
  }
  
  // Get data from local storage
  static getData(key) {
    try {
      const storedData = this.getStoredData();
      return storedData[key] || null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  }
  
  // Get all stored data
  static getStoredData() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error parsing localStorage data:', error);
      return {};
    }
  }
  
  // Remove data from local storage
  static removeData(key) {
    try {
      const storedData = this.getStoredData();
      delete storedData[key];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(storedData));
      return true;
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return false;
    }
  }
  
  // Clear all data
  static clearAll() {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
  
  // Check if localStorage is available
  static isAvailable() {
    try {
      const testKey = '__storage_test__';
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  // Save challan to offline storage
  static saveOfflineChallan(challan) {
    if (!this.isAvailable()) return false;
    
    try {
      const offlineChallans = this.getData('offlineChallans') || [];
      offlineChallans.push({
        ...challan,
        timestamp: new Date().toISOString(),
        syncStatus: 'pending'
      });
      
      return this.saveData('offlineChallans', offlineChallans);
    } catch (error) {
      console.error('Error saving offline challan:', error);
      return false;
    }
  }
  
  // Get offline challans
  static getOfflineChallans() {
    if (!this.isAvailable()) return [];
    return this.getData('offlineChallans') || [];
  }
  
  // Update sync status of offline challan
  static updateChallanSyncStatus(challanId, status) {
    if (!this.isAvailable()) return false;
    
    try {
      const offlineChallans = this.getData('offlineChallans') || [];
      const updatedChallans = offlineChallans.map(challan => 
        challan.id === challanId ? { ...challan, syncStatus: status } : challan
      );
      
      return this.saveData('offlineChallans', updatedChallans);
    } catch (error) {
      console.error('Error updating challan sync status:', error);
      return false;
    }
  }
  
  // Remove synced challans
  static removeSyncedChallans() {
    if (!this.isAvailable()) return false;
    
    try {
      const offlineChallans = this.getData('offlineChallans') || [];
      const pendingChallans = offlineChallans.filter(
        challan => challan.syncStatus !== 'synced'
      );
      
      return this.saveData('offlineChallans', pendingChallans);
    } catch (error) {
      console.error('Error removing synced challans:', error);
      return false;
    }
  }
}

export default StorageService;