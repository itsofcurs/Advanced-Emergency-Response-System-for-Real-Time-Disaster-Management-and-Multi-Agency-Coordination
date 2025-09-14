import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = () => {
  const metrics = [
    {
      id: 1,
      title: "Average Response Time",
      value: "4.2",
      unit: "minutes",
      change: -12.5,
      trend: "down",
      icon: "Clock",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 2,
      title: "Incident Resolution Rate",
      value: "94.7",
      unit: "%",
      change: 3.2,
      trend: "up",
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 3,
      title: "Active Incidents",
      value: "23",
      unit: "current",
      change: -8.1,
      trend: "down",
      icon: "AlertCircle",
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 4,
      title: "Resource Utilization",
      value: "78.3",
      unit: "%",
      change: 5.7,
      trend: "up",
      icon: "Activity",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 5,
      title: "Multi-Agency Coordination",
      value: "89.2",
      unit: "%",
      change: 2.1,
      trend: "up",
      icon: "Users",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      id: 6,
      title: "Hospital Capacity",
      value: "67.4",
      unit: "%",
      change: -4.3,
      trend: "down",
      icon: "Building2",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  const getTrendIcon = (trend) => {
    return trend === 'up' ? 'TrendingUp' : 'TrendingDown';
  };

  const getTrendColor = (trend) => {
    return trend === 'up' ? 'text-success' : 'text-destructive';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${metric?.bgColor}`}>
              <Icon name={metric?.icon} size={24} className={metric?.color} />
            </div>
            <div className={`flex items-center space-x-1 ${getTrendColor(metric?.trend)}`}>
              <Icon name={getTrendIcon(metric?.trend)} size={16} />
              <span className="text-sm font-medium">{Math.abs(metric?.change)}%</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-muted-foreground">{metric?.title}</h3>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-foreground">{metric?.value}</span>
              <span className="text-sm text-muted-foreground">{metric?.unit}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;