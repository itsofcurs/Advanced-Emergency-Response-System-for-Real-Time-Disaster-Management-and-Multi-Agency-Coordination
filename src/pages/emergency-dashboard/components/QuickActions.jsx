import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onCreateIncident, onEmergencyAlert, onDispatchOptimize }) => {
  const quickActionItems = [
    {
      label: 'Create New Incident',
      description: 'Manually create an emergency incident',
      icon: 'Plus',
      variant: 'default',
      action: onCreateIncident,
      priority: 'high'
    },
    {
      label: 'Emergency Alert',
      description: 'Broadcast system-wide emergency alert',
      icon: 'AlertTriangle',
      variant: 'destructive',
      action: onEmergencyAlert,
      priority: 'critical'
    },
    {
      label: 'Optimize Dispatch',
      description: 'AI-powered resource optimization',
      icon: 'Zap',
      variant: 'secondary',
      action: onDispatchOptimize,
      priority: 'medium'
    },
    {
      label: 'Hospital Alert',
      description: 'Alert hospitals for incoming patients',
      icon: 'Building2',
      variant: 'outline',
      action: () => console.log('Hospital alert triggered'),
      priority: 'medium'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActionItems?.map((item, index) => (
          <Button
            key={index}
            variant={item?.variant}
            size="lg"
            onClick={item?.action}
            iconName={item?.icon}
            iconPosition="left"
            fullWidth
            className={`justify-start text-left h-auto p-4 ${
              item?.priority === 'critical' ? 'animate-emergency-pulse' : ''
            }`}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{item?.label}</span>
              <span className="text-xs opacity-80 font-normal">{item?.description}</span>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;