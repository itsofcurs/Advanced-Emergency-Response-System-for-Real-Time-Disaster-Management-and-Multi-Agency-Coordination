import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallerInformationPanel = ({ extractedLocation, onLocationUpdate }) => {
  const [callerInfo, setCallerInfo] = useState(null);
  const [locationHistory, setLocationHistory] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  // Mock caller information
  const mockCallerData = {
    phoneNumber: '+1 (555) 123-4567',
    name: 'Sarah Mitchell',
    address: '1247 Oak Street, Springfield, IL 62701',
    emergencyContact: 'John Mitchell - (555) 987-6543',
    medicalInfo: 'No known allergies, Type 1 Diabetes',
    previousCalls: [
      { date: '2024-08-15', type: 'Medical Emergency', resolved: true },
      { date: '2024-06-22', type: 'Fire Report', resolved: true }
    ],
    verificationStatus: 'verified',
    riskLevel: 'standard',
    language: 'English',
    accessibility: 'None reported'
  };

  const mockLocationData = [
    { timestamp: '14:22:47', source: 'Cell Tower', location: 'Highway 95, Mile 45.2', accuracy: '±150m' },
    { timestamp: '14:22:52', source: 'GPS', location: 'Highway 95, Exit 12 Northbound', accuracy: '±10m' },
    { timestamp: '14:23:05', source: 'AI Analysis', location: 'Highway 95, Exit 12, Near Shell Station', accuracy: 'High Confidence' }
  ];

  useEffect(() => {
    // Simulate caller information lookup
    const timer = setTimeout(() => {
      setCallerInfo(mockCallerData);
      setLocationHistory(mockLocationData);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (extractedLocation) {
      const newLocation = {
        timestamp: new Date()?.toLocaleTimeString(),
        source: 'AI Analysis',
        location: extractedLocation,
        accuracy: 'High Confidence'
      };
      setLocationHistory(prev => [...prev, newLocation]);
    }
  }, [extractedLocation]);

  const handleVerifyLocation = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      onLocationUpdate(locationHistory?.[locationHistory?.length - 1]?.location || 'Location verified');
    }, 2000);
  };

  const handleUpdateCallerInfo = () => {
    console.log('Opening caller information update form');
  };

  const getRiskLevelColor = (level) => {
    switch (level) {
      case 'high': return 'text-primary';
      case 'medium': return 'text-warning';
      case 'standard': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  if (!callerInfo) {
    return (
      <div className="bg-card border border-border rounded-lg h-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Looking up caller information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="User" size={20} className="text-secondary" />
          <h3 className="text-lg font-semibold text-foreground">Caller Information</h3>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded text-xs font-medium ${
            callerInfo?.verificationStatus === 'verified' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
          }`}>
            <Icon name="Shield" size={12} />
            <span>{callerInfo?.verificationStatus}</span>
          </div>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleUpdateCallerInfo}
          iconName="Edit"
        />
      </div>
      {/* Caller Details */}
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Primary Information */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Phone" size={16} className="text-primary" />
                <span className="font-mono text-foreground">{callerInfo?.phoneNumber}</span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Caller Name</label>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="User" size={16} className="text-secondary" />
                <span className="text-foreground">{callerInfo?.name}</span>
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-muted-foreground">Registered Address</label>
            <div className="flex items-start space-x-2 mt-1">
              <Icon name="MapPin" size={16} className="text-accent mt-0.5" />
              <span className="text-foreground">{callerInfo?.address}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Risk Level</label>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="AlertTriangle" size={16} className={getRiskLevelColor(callerInfo?.riskLevel)} />
                <span className={`font-medium capitalize ${getRiskLevelColor(callerInfo?.riskLevel)}`}>
                  {callerInfo?.riskLevel}
                </span>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-muted-foreground">Language</label>
              <div className="flex items-center space-x-2 mt-1">
                <Icon name="Globe" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{callerInfo?.language}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Emergency Contact</h4>
          <div className="flex items-center space-x-2">
            <Icon name="UserCheck" size={16} className="text-success" />
            <span className="text-foreground">{callerInfo?.emergencyContact}</span>
          </div>
        </div>

        {/* Medical Information */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Medical Information</h4>
          <div className="flex items-start space-x-2">
            <Icon name="Heart" size={16} className="text-primary mt-0.5" />
            <span className="text-foreground">{callerInfo?.medicalInfo}</span>
          </div>
        </div>

        {/* Location History */}
        <div className="border-t border-border pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-foreground">Location History</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={handleVerifyLocation}
              loading={isVerifying}
              iconName="MapPin"
              iconPosition="left"
            >
              Verify Location
            </Button>
          </div>
          
          <div className="space-y-3">
            {locationHistory?.map((location, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="flex-shrink-0">
                  <Icon 
                    name={location?.source === 'GPS' ? 'Satellite' : location?.source === 'AI Analysis' ? 'Brain' : 'Radio'} 
                    size={16} 
                    className="text-accent mt-0.5" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{location?.location}</span>
                    <span className="text-xs text-muted-foreground">{location?.timestamp}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">Source: {location?.source}</span>
                    <span className="text-xs text-accent">Accuracy: {location?.accuracy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call History */}
        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Previous Emergency Calls</h4>
          <div className="space-y-2">
            {callerInfo?.previousCalls?.map((call, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-foreground">{call?.type}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground">{call?.date}</span>
                  <div className={`w-2 h-2 rounded-full ${call?.resolved ? 'bg-success' : 'bg-warning'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Phone"
            iconPosition="left"
          >
            Call Back
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            iconPosition="left"
          >
            Send SMS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CallerInformationPanel;