import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceAssignmentPanel = ({ onAssignResource, onOptimizeDispatch }) => {
  const [availableUnits] = useState([
    {
      id: 'AMB-001',
      type: 'ambulance',
      status: 'available',
      location: '5th & Main St',
      eta: '3 min',
      crew: 'Johnson, Smith',
      equipment: ['AED', 'Oxygen', 'Stretcher']
    },
    {
      id: 'FIRE-12',
      type: 'fire',
      status: 'available',
      location: 'Station 12',
      eta: '4 min',
      crew: 'Rodriguez, Chen, Williams',
      equipment: ['Ladder', 'Hose', 'Rescue Tools']
    },
    {
      id: 'POL-205',
      type: 'police',
      status: 'en-route',
      location: 'Broadway & 2nd',
      eta: '2 min',
      crew: 'Officer Davis',
      equipment: ['Standard Patrol']
    },
    {
      id: 'AMB-003',
      type: 'ambulance',
      status: 'busy',
      location: 'General Hospital',
      eta: '15 min',
      crew: 'Martinez, Lee',
      equipment: ['AED', 'Oxygen', 'Stretcher']
    }
  ]);

  const [assignedUnits, setAssignedUnits] = useState([
    {
      id: 'POL-205',
      type: 'police',
      status: 'en-route',
      assignedAt: new Date(Date.now() - 300000),
      role: 'First Responder'
    }
  ]);

  const [draggedUnit, setDraggedUnit] = useState(null);

  const getUnitIcon = (type) => {
    switch (type) {
      case 'ambulance': return 'Truck';
      case 'fire': return 'Flame';
      case 'police': return 'Shield';
      default: return 'Car';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success bg-success/10';
      case 'en-route': return 'text-warning bg-warning/10';
      case 'busy': return 'text-destructive bg-destructive/10';
      case 'offline': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const handleDragStart = (unit) => {
    setDraggedUnit(unit);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    if (draggedUnit && draggedUnit?.status === 'available') {
      const newAssignment = {
        ...draggedUnit,
        assignedAt: new Date(),
        role: 'Assigned Unit'
      };
      setAssignedUnits([...assignedUnits, newAssignment]);
      onAssignResource?.(newAssignment);
    }
    setDraggedUnit(null);
  };

  const handleRemoveAssignment = (unitId) => {
    setAssignedUnits(assignedUnits?.filter(unit => unit?.id !== unitId));
  };

  const handleOptimizeDispatch = () => {
    onOptimizeDispatch?.();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-emergency-lg font-semibold text-foreground">Resource Assignment</h2>
            <p className="text-emergency-sm text-muted-foreground">
              Drag units to assign or use optimization
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleOptimizeDispatch}
          iconName="Zap"
          iconPosition="left"
        >
          Auto-Optimize
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Units */}
        <div>
          <h3 className="text-emergency-md font-medium text-foreground mb-4">Available Units</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {availableUnits?.map((unit) => (
              <div
                key={unit?.id}
                draggable={unit?.status === 'available'}
                onDragStart={() => handleDragStart(unit)}
                className={`p-4 border border-border rounded-lg transition-all duration-200 ${
                  unit?.status === 'available' ?'cursor-move hover:border-primary hover:shadow-emergency' :'opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getUnitIcon(unit?.type)} size={16} className="text-secondary" />
                    </div>
                    <div>
                      <h4 className="text-emergency-sm font-semibold text-foreground">{unit?.id}</h4>
                      <p className="text-emergency-xs text-muted-foreground capitalize">{unit?.type}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-emergency-xs font-medium ${getStatusColor(unit?.status)}`}>
                    {unit?.status}
                  </div>
                </div>

                <div className="space-y-2 text-emergency-xs">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">{unit?.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">ETA: {unit?.eta}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">{unit?.crew}</span>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-1">
                  {unit?.equipment?.map((item, index) => (
                    <span key={index} className="px-2 py-1 bg-muted/30 rounded text-emergency-xs text-muted-foreground">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Assigned Units */}
        <div>
          <h3 className="text-emergency-md font-medium text-foreground mb-4">Assigned Units</h3>
          <div
            className="min-h-32 p-4 border-2 border-dashed border-border rounded-lg"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {assignedUnits?.length === 0 ? (
              <div className="text-center py-8">
                <Icon name="Users" size={32} className="text-muted-foreground mx-auto mb-2" />
                <p className="text-emergency-sm text-muted-foreground">
                  Drag units here to assign them
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {assignedUnits?.map((unit) => (
                  <div key={unit?.id} className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={getUnitIcon(unit?.type)} size={16} className="text-primary" />
                        </div>
                        <div>
                          <h4 className="text-emergency-sm font-semibold text-foreground">{unit?.id}</h4>
                          <p className="text-emergency-xs text-muted-foreground">{unit?.role}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveAssignment(unit?.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between text-emergency-xs">
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="text-foreground">
                          Assigned: {unit?.assignedAt?.toLocaleTimeString()}
                        </span>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-emergency-xs font-medium ${getStatusColor(unit?.status)}`}>
                        {unit?.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dispatch Actions */}
          {assignedUnits?.length > 0 && (
            <div className="mt-4 space-y-2">
              <Button 
                variant="default" 
                fullWidth 
                iconName="Send"
                iconPosition="left"
              >
                Dispatch All Units
              </Button>
              <Button 
                variant="outline" 
                fullWidth 
                iconName="MessageSquare"
                iconPosition="left"
              >
                Send Instructions
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Optimization Suggestions */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Lightbulb" size={16} className="text-accent" />
          <h4 className="text-emergency-sm font-medium text-foreground">Dispatch Optimization</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-emergency-xs">
          <div className="text-center">
            <div className="text-emergency-lg font-bold text-accent">2:30</div>
            <div className="text-muted-foreground">Optimal Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-emergency-lg font-bold text-success">3</div>
            <div className="text-muted-foreground">Recommended Units</div>
          </div>
          <div className="text-center">
            <div className="text-emergency-lg font-bold text-secondary">95%</div>
            <div className="text-muted-foreground">Success Probability</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAssignmentPanel;