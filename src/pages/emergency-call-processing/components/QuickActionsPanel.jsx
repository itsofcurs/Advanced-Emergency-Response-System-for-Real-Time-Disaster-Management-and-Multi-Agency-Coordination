import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ aiRecommendations, extractedLocation, onIncidentCreate, onDispatch, onHospitalAlert }) => {
  const [isCreatingIncident, setIsCreatingIncident] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState([]);
  
  const [availableUnits] = useState([
    { id: 'fire-01', type: 'Fire', name: 'Engine 12', status: 'available', eta: '4 min', distance: '2.1 mi' },
    { id: 'medical-01', type: 'Medical', name: 'Ambulance 7', status: 'available', eta: '6 min', distance: '3.2 mi' },
    { id: 'police-01', type: 'Police', name: 'Unit 45', status: 'available', eta: '3 min', distance: '1.8 mi' },
    { id: 'fire-02', type: 'Fire', name: 'Ladder 8', status: 'en-route', eta: '8 min', distance: '4.5 mi' }
  ]);

  const [hospitalOptions] = useState([
    { id: 'general', name: 'Springfield General Hospital', capacity: '85%', eta: '12 min', trauma: true },
    { id: 'mercy', name: 'Mercy Medical Center', capacity: '72%', eta: '15 min', trauma: false },
    { id: 'regional', name: 'Regional Emergency Center', capacity: '91%', eta: '18 min', trauma: true }
  ]);

  const handleCreateIncident = async () => {
    setIsCreatingIncident(true);
    
    // Simulate incident creation
    setTimeout(() => {
      const incidentData = {
        id: `INC-${Date.now()}`,
        type: 'Vehicle Accident',
        location: extractedLocation || 'Highway 95, Exit 12',
        severity: 'HIGH',
        timestamp: new Date()?.toISOString(),
        caller: 'Sarah Mitchell',
        description: 'Multi-vehicle accident with fire risk and potential injuries'
      };
      
      onIncidentCreate(incidentData);
      setIsCreatingIncident(false);
    }, 2000);
  };

  const handleDispatchUnits = async () => {
    if (selectedUnits?.length === 0) return;
    
    setIsDispatching(true);
    
    // Simulate dispatch
    setTimeout(() => {
      onDispatch(selectedUnits);
      setIsDispatching(false);
      setSelectedUnits([]);
    }, 1500);
  };

  const handleHospitalAlert = (hospital) => {
    onHospitalAlert(hospital);
  };

  const toggleUnitSelection = (unitId) => {
    setSelectedUnits(prev => 
      prev?.includes(unitId) 
        ? prev?.filter(id => id !== unitId)
        : [...prev, unitId]
    );
  };

  const getUnitTypeIcon = (type) => {
    switch (type) {
      case 'Fire': return 'Flame';
      case 'Medical': return 'Heart';
      case 'Police': return 'Shield';
      default: return 'Truck';
    }
  };

  const getUnitTypeColor = (type) => {
    switch (type) {
      case 'Fire': return 'text-primary';
      case 'Medical': return 'text-success';
      case 'Police': return 'text-secondary';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'en-route': return 'text-warning';
      case 'busy': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getCapacityColor = (capacity) => {
    const percent = parseInt(capacity);
    if (percent >= 90) return 'text-primary';
    if (percent >= 80) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Zap" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
          <span className="text-sm text-success">Ready</span>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Primary Emergency Actions */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Primary Actions</h4>
          
          <div className="space-y-3">
            <Button
              variant="default"
              size="lg"
              onClick={handleCreateIncident}
              loading={isCreatingIncident}
              iconName="AlertCircle"
              iconPosition="left"
              fullWidth
            >
              Create Emergency Incident
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="destructive"
                size="sm"
                iconName="Siren"
                iconPosition="left"
                className="animate-emergency-pulse"
              >
                Mass Alert
              </Button>
              
              <Button
                variant="warning"
                size="sm"
                iconName="Radio"
                iconPosition="left"
              >
                Broadcast
              </Button>
            </div>
          </div>
        </div>

        {/* Unit Dispatch */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">Dispatch Units</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDispatchUnits}
              loading={isDispatching}
              disabled={selectedUnits?.length === 0}
              iconName="Send"
              iconPosition="left"
            >
              Dispatch ({selectedUnits?.length})
            </Button>
          </div>
          
          <div className="space-y-2">
            {availableUnits?.map((unit) => (
              <div 
                key={unit?.id}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedUnits?.includes(unit?.id) 
                    ? 'border-primary bg-primary/10' :'border-border hover:border-accent'
                } ${unit?.status !== 'available' ? 'opacity-60' : ''}`}
                onClick={() => unit?.status === 'available' && toggleUnitSelection(unit?.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={getUnitTypeIcon(unit?.type)} 
                      size={16} 
                      className={getUnitTypeColor(unit?.type)} 
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">{unit?.name}</div>
                      <div className="text-xs text-muted-foreground">{unit?.type}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm font-medium text-foreground">{unit?.eta}</div>
                    <div className={`text-xs ${getStatusColor(unit?.status)}`}>
                      {unit?.status}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>Distance: {unit?.distance}</span>
                  {selectedUnits?.includes(unit?.id) && (
                    <Icon name="CheckCircle" size={14} className="text-primary" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital Alerts */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Hospital Coordination</h4>
          
          <div className="space-y-2">
            {hospitalOptions?.map((hospital) => (
              <div key={hospital?.id} className="p-3 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Building2" size={16} className="text-secondary" />
                    <span className="text-sm font-medium text-foreground">{hospital?.name}</span>
                    {hospital?.trauma && (
                      <span className="px-2 py-1 bg-primary/20 text-primary text-xs rounded">
                        Trauma
                      </span>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleHospitalAlert(hospital)}
                    iconName="Bell"
                  >
                    Alert
                  </Button>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span className={`font-medium ${getCapacityColor(hospital?.capacity)}`}>
                      {hospital?.capacity}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={12} className="text-muted-foreground" />
                    <span className="text-muted-foreground">ETA: {hospital?.eta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI-Powered Quick Actions */}
        {aiRecommendations && aiRecommendations?.length > 0 && (
          <div className="space-y-3 border-t border-border pt-4">
            <div className="flex items-center space-x-2">
              <Icon name="Brain" size={16} className="text-accent" />
              <h4 className="text-sm font-semibold text-foreground">AI Suggested Actions</h4>
            </div>
            
            <div className="space-y-2">
              {aiRecommendations?.slice(0, 3)?.map((recommendation, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  iconName="Zap"
                  iconPosition="left"
                  fullWidth
                  className="justify-start"
                >
                  {recommendation?.action}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Communication Tools */}
        <div className="space-y-3 border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground">Communication</h4>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="MessageSquare"
              iconPosition="left"
            >
              Send SMS
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Mail"
              iconPosition="left"
            >
              Email Alert
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              iconPosition="left"
            >
              Conference
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Megaphone"
              iconPosition="left"
            >
              Public Alert
            </Button>
          </div>
        </div>

        {/* Emergency Protocols */}
        <div className="space-y-3 border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground">Emergency Protocols</h4>
          
          <div className="space-y-2">
            <Button
              variant="destructive"
              size="sm"
              iconName="AlertTriangle"
              iconPosition="left"
              fullWidth
              className="animate-emergency-pulse"
            >
              Activate Emergency Protocol
            </Button>
            
            <Button
              variant="warning"
              size="sm"
              iconName="Shield"
              iconPosition="left"
              fullWidth
            >
              Initiate Lockdown Procedure
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              iconName="Users"
              iconPosition="left"
              fullWidth
            >
              Multi-Agency Coordination
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsPanel;