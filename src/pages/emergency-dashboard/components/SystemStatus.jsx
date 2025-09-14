import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = ({ systemData }) => {
  const statusItems = [
    {
      label: 'System Health',
      value: systemData?.systemHealth,
      icon: 'Activity',
      status: systemData?.systemHealth === 'Operational' ? 'success' : 'warning'
    },
    {
      label: 'Database',
      value: systemData?.database,
      icon: 'Database',
      status: systemData?.database === 'Online' ? 'success' : 'error'
    },
    {
      label: 'Communication',
      value: systemData?.communication,
      icon: 'Radio',
      status: systemData?.communication === 'Active' ? 'success' : 'warning'
    },
    {
      label: 'GPS Tracking',
      value: systemData?.gpsTracking,
      icon: 'MapPin',
      status: systemData?.gpsTracking === 'Online' ? 'success' : 'error'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'success': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'error': return 'bg-destructive/10';
      default: return 'bg-muted/10';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">System Status</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
          <span className="text-sm text-success">All Systems Operational</span>
        </div>
      </div>
      <div className="space-y-3">
        {statusItems?.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${getStatusBgColor(item?.status)}`}>
                <Icon name={item?.icon} size={16} className={getStatusColor(item?.status)} />
              </div>
              <span className="text-sm font-medium text-foreground">{item?.label}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${getStatusColor(item?.status)}`}>
                {item?.value}
              </span>
              <div className={`w-2 h-2 rounded-full ${getStatusColor(item?.status)} bg-current`} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Last Updated:</span>
          <span className="text-foreground font-mono">
            {new Date()?.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;