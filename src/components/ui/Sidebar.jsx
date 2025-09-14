import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [emergencyStatus] = useState({
    activeIncidents: 7,
    criticalAlerts: 2,
    systemStatus: 'operational'
  });
  const [notifications] = useState([
    { id: 1, type: 'critical', message: 'Multi-vehicle accident on I-95', time: '2 min ago' },
    { id: 2, type: 'warning', message: 'Hospital capacity at 85%', time: '5 min ago' },
    { id: 3, type: 'info', message: 'Weather alert: Heavy rain expected', time: '10 min ago' }
  ]);

  const navigationItems = [
    {
      label: 'Emergency Dashboard',
      path: '/emergency-dashboard',
      icon: 'LayoutDashboard',
      priority: 'high'
    },
    {
      label: 'Incident Management',
      path: '/incident-management',
      icon: 'AlertCircle',
      priority: 'high'
    },
    {
      label: 'Call Processing',
      path: '/emergency-call-processing',
      icon: 'Phone',
      priority: 'high'
    },
    {
      label: 'Vehicle Tracking',
      path: '/vehicle-tracking',
      icon: 'Truck',
      priority: 'medium'
    },
    {
      label: 'Hospital Coordination',
      path: '/hospital-coordination',
      icon: 'Building2',
      priority: 'medium'
    },
    {
      label: 'Analytics',
      path: '/analytics-dashboard',
      icon: 'BarChart3',
      priority: 'low'
    }
  ];

  const quickActions = [
    { label: 'Create Incident', icon: 'Plus', action: 'create-incident', variant: 'default' },
    { label: 'Emergency Alert', icon: 'Siren', action: 'emergency-alert', variant: 'destructive' }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-success';
      case 'warning': return 'text-warning';
      case 'critical': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'critical': return 'bg-primary';
      case 'warning': return 'bg-warning';
      case 'info': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  return (
    <aside className={`fixed left-0 top-header bottom-0 bg-card border-r border-border z-sidebar transition-all duration-200 ${
      isCollapsed ? 'w-16' : 'w-sidebar'
    }`}>
      <div className="flex flex-col h-full">
        {/* Emergency Status Indicator */}
        <div className="p-4 border-b border-border">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-emergency-sm font-semibold text-foreground">System Status</h3>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(emergencyStatus?.systemStatus)} bg-current`} />
              </div>
              <div className="grid grid-cols-2 gap-3 text-emergency-xs">
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="font-mono text-emergency-lg font-bold text-primary">
                    {emergencyStatus?.activeIncidents}
                  </div>
                  <div className="text-muted-foreground">Active</div>
                </div>
                <div className="text-center p-2 bg-muted/50 rounded">
                  <div className="font-mono text-emergency-lg font-bold text-destructive">
                    {emergencyStatus?.criticalAlerts}
                  </div>
                  <div className="text-muted-foreground">Critical</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-3 h-3 rounded-full ${getStatusColor(emergencyStatus?.systemStatus)} bg-current`} />
              <div className="text-emergency-xs font-mono font-bold text-primary">
                {emergencyStatus?.activeIncidents}
              </div>
            </div>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => {
            const isActive = location?.pathname === item?.path;
            return (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 text-left ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-emergency'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item?.label : undefined}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={item?.priority === 'high' && !isActive ? 'text-accent' : undefined}
                />
                {!isCollapsed && (
                  <span className="text-emergency-sm font-medium">{item?.label}</span>
                )}
                {!isCollapsed && item?.priority === 'high' && !isActive && (
                  <div className="w-2 h-2 bg-accent rounded-full ml-auto" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Quick Action Panel */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="space-y-3">
              <h4 className="text-emergency-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Quick Actions
              </h4>
              <div className="space-y-2">
                {quickActions?.map((action) => (
                  <Button
                    key={action?.action}
                    variant={action?.variant}
                    size="sm"
                    onClick={() => handleQuickAction(action?.action)}
                    iconName={action?.icon}
                    iconPosition="left"
                    fullWidth
                    className={action?.variant === 'destructive' ? 'animate-emergency-pulse' : ''}
                  >
                    {action?.label}
                  </Button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              {quickActions?.map((action) => (
                <Button
                  key={action?.action}
                  variant={action?.variant}
                  size="icon"
                  onClick={() => handleQuickAction(action?.action)}
                  title={action?.label}
                  className={action?.variant === 'destructive' ? 'animate-emergency-pulse' : ''}
                >
                  <Icon name={action?.icon} size={16} />
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* Real-time Notification Center */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-emergency-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  Live Updates
                </h4>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
                  <span className="text-emergency-xs text-success">Live</span>
                </div>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {notifications?.slice(0, 3)?.map((notification) => (
                  <div key={notification?.id} className="flex items-start space-x-2 p-2 bg-muted/30 rounded text-emergency-xs">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${getNotificationColor(notification?.type)}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground truncate">{notification?.message}</p>
                      <p className="text-muted-foreground">{notification?.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="relative">
                <Icon name="Bell" size={16} className="text-muted-foreground" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full" />
              </div>
              <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
            </div>
          )}
        </div>

        {/* User Context Display */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-emergency-sm font-medium text-foreground truncate">
                  Sarah Johnson
                </p>
                <p className="text-emergency-xs text-muted-foreground truncate">
                  Emergency Dispatcher
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span className="text-emergency-xs text-success">On Duty</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={14} color="white" />
              </div>
              <div className="w-2 h-2 bg-success rounded-full" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;