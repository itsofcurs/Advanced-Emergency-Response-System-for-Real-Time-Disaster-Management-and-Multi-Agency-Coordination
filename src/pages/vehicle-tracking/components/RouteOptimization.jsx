import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RouteOptimization = ({ selectedVehicle, activeRoutes, trafficConditions, onRouteSelect, onNavigationStart }) => {
  const [showTrafficLayer, setShowTrafficLayer] = useState(true);
  const [routePreference, setRoutePreference] = useState('fastest');

  const routeOptions = [
    {
      id: 'route-1',
      name: 'Primary Route',
      distance: '3.2 miles',
      estimatedTime: '8 minutes',
      trafficDelay: '2 minutes',
      conditions: 'Heavy traffic on Main St',
      type: 'fastest',
      waypoints: ['Start', 'Main St', 'Highway 101', 'Destination'],
      trafficSignals: 4,
      preemptionEnabled: true
    },
    {
      id: 'route-2',
      name: 'Alternative Route',
      distance: '4.1 miles',
      estimatedTime: '7 minutes',
      trafficDelay: '1 minute',
      conditions: 'Clear roads via Oak Ave',
      type: 'alternative',
      waypoints: ['Start', 'Oak Ave', 'Park Blvd', 'Destination'],
      trafficSignals: 6,
      preemptionEnabled: true
    },
    {
      id: 'route-3',
      name: 'Emergency Bypass',
      distance: '2.8 miles',
      estimatedTime: '6 minutes',
      trafficDelay: '0 minutes',
      conditions: 'Emergency lanes available',
      type: 'emergency',
      waypoints: ['Start', 'Emergency Lane', 'Direct Path', 'Destination'],
      trafficSignals: 2,
      preemptionEnabled: true
    }
  ];

  const getRouteColor = (type) => {
    switch (type) {
      case 'fastest': return 'border-success bg-success/10';
      case 'alternative': return 'border-warning bg-warning/10';
      case 'emergency': return 'border-primary bg-primary/10';
      default: return 'border-border bg-muted/10';
    }
  };

  const getRouteIcon = (type) => {
    switch (type) {
      case 'fastest': return 'Zap';
      case 'alternative': return 'Route';
      case 'emergency': return 'Siren';
      default: return 'Navigation';
    }
  };

  const getTrafficColor = (level) => {
    switch (level) {
      case 'heavy': return 'text-destructive';
      case 'moderate': return 'text-warning';
      case 'light': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Route Optimization</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTrafficLayer(!showTrafficLayer)}
              iconName={showTrafficLayer ? "Eye" : "EyeOff"}
              iconPosition="left"
            >
              Traffic
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              title="Refresh routes"
            />
          </div>
        </div>

        {selectedVehicle && (
          <div className="flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
            <div className="p-2 bg-secondary rounded-lg">
              <Icon name="Car" size={20} color="white" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{selectedVehicle?.callSign}</h4>
              <p className="text-sm text-muted-foreground">
                {selectedVehicle?.location} → {selectedVehicle?.destination || 'Incident Location'}
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Route Options */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {routeOptions?.map((route) => (
            <div
              key={route?.id}
              className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${getRouteColor(route?.type)}`}
              onClick={() => onRouteSelect(route)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-background/50 rounded-lg">
                    <Icon name={getRouteIcon(route?.type)} size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{route?.name}</h4>
                    <p className="text-sm text-muted-foreground">{route?.conditions}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e?.stopPropagation();
                    onNavigationStart(route);
                  }}
                  iconName="Navigation"
                  iconPosition="left"
                >
                  Navigate
                </Button>
              </div>

              {/* Route Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                <div className="text-center p-2 bg-background/30 rounded">
                  <div className="text-lg font-bold text-foreground">{route?.distance}</div>
                  <div className="text-xs text-muted-foreground">Distance</div>
                </div>
                <div className="text-center p-2 bg-background/30 rounded">
                  <div className="text-lg font-bold text-success">{route?.estimatedTime}</div>
                  <div className="text-xs text-muted-foreground">ETA</div>
                </div>
                <div className="text-center p-2 bg-background/30 rounded">
                  <div className={`text-lg font-bold ${route?.trafficDelay === '0 minutes' ? 'text-success' : 'text-warning'}`}>
                    {route?.trafficDelay}
                  </div>
                  <div className="text-xs text-muted-foreground">Delay</div>
                </div>
                <div className="text-center p-2 bg-background/30 rounded">
                  <div className="text-lg font-bold text-primary">{route?.trafficSignals}</div>
                  <div className="text-xs text-muted-foreground">Signals</div>
                </div>
              </div>

              {/* Route Features */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm">
                  {route?.preemptionEnabled && (
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Zap" size={14} />
                      <span>Signal Preemption</span>
                    </div>
                  )}
                  {route?.type === 'emergency' && (
                    <div className="flex items-center space-x-1 text-primary">
                      <Icon name="Siren" size={14} />
                      <span>Emergency Lane</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MapPin"
                    title="View on map"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Share"
                    title="Share route"
                  />
                </div>
              </div>

              {/* Waypoints */}
              <div className="mt-3 pt-3 border-t border-border/50">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Icon name="Route" size={12} />
                  <span>Route: {route?.waypoints?.join(' → ')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Traffic Conditions Panel */}
      {showTrafficLayer && (
        <div className="p-4 border-t border-border bg-muted/10">
          <h4 className="text-sm font-semibold text-foreground mb-3">Current Traffic Conditions</h4>
          <div className="space-y-2">
            {[
              { location: 'Main St & 1st Ave', level: 'heavy', delay: '5-8 min' },
              { location: 'Highway 101 North', level: 'moderate', delay: '2-3 min' },
              { location: 'Oak Ave Corridor', level: 'light', delay: '< 1 min' },
              { location: 'Emergency Lanes', level: 'clear', delay: '0 min' }
            ]?.map((condition, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-background/50 rounded">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    condition?.level === 'heavy' ? 'bg-destructive' :
                    condition?.level === 'moderate' ? 'bg-warning' :
                    condition?.level === 'light' ? 'bg-success' : 'bg-muted-foreground'
                  }`} />
                  <span className="text-sm text-foreground">{condition?.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${getTrafficColor(condition?.level)}`}>
                    {condition?.level?.charAt(0)?.toUpperCase() + condition?.level?.slice(1)}
                  </span>
                  <span className="text-xs text-muted-foreground">+{condition?.delay}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Navigation Controls */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Navigation" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Navigation Active</span>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Volume2"
              title="Voice guidance"
            />
            <Button
              variant="outline"
              size="sm"
              iconName="Phone"
              title="Contact dispatch"
            />
            <Button
              variant="destructive"
              size="sm"
              iconName="Square"
              title="End navigation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouteOptimization;