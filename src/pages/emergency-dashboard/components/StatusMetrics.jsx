import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusMetrics = ({ metrics }) => {
  const statusItems = [
    {
      label: 'Active Incidents',
      value: metrics?.activeIncidents,
      icon: 'AlertCircle',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Available Units',
      value: metrics?.availableUnits,
      icon: 'Truck',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Avg Response Time',
      value: `${metrics?.avgResponseTime}m`,
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      label: 'Critical Alerts',
      value: metrics?.criticalAlerts,
      icon: 'AlertTriangle',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statusItems?.map((item, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{item?.label}</p>
              <p className={`text-2xl font-bold ${item?.color}`}>{item?.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${item?.bgColor}`}>
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusMetrics;