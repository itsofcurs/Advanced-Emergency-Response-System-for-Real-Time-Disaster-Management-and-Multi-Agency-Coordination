import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMap = ({ incidents, vehicles, onIncidentSelect, onCreateIncident }) => {
  const [mapView, setMapView] = useState('incidents');
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleIncidentClick = (incident) => {
    setSelectedIncident(incident);
    onIncidentSelect(incident);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-destructive';
      case 'high': return 'bg-primary';
      case 'medium': return 'bg-warning';
      case 'low': return 'bg-success';
      default: return 'bg-muted';
    }
  };

  const getVehicleStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'dispatched': return 'bg-warning';
      case 'busy': return 'bg-primary';
      case 'offline': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Map Controls */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold text-foreground">Live Emergency Map</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
              <span className="text-sm text-success">Live Updates</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant={mapView === 'incidents' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('incidents')}
              iconName="AlertCircle"
              iconPosition="left"
            >
              Incidents
            </Button>
            <Button
              variant={mapView === 'vehicles' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setMapView('vehicles')}
              iconName="Truck"
              iconPosition="left"
            >
              Vehicles
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onCreateIncident}
              iconName="Plus"
              iconPosition="left"
              className="animate-emergency-pulse"
            >
              Create Incident
            </Button>
          </div>
        </div>
      </div>
      {/* Map Container */}
      <div className="relative h-96 lg:h-[500px] bg-slate-900">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Emergency Response Map"
          referrerPolicy="no-referrer-when-downgrade"
          src="https://www.google.com/maps?q=40.7128,-74.0060&z=12&output=embed"
          className="w-full h-full"
        />

        {/* Map Overlays */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Incident Markers */}
          {mapView === 'incidents' && incidents?.map((incident, index) => (
            <div
              key={incident?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index * 15) % 60}%`,
                top: `${30 + (index * 10) % 40}%`
              }}
              onClick={() => handleIncidentClick(incident)}
            >
              <div className={`w-6 h-6 rounded-full ${getSeverityColor(incident?.severity)} border-2 border-white shadow-lg flex items-center justify-center animate-emergency-pulse`}>
                <Icon name="AlertCircle" size={12} color="white" />
              </div>
              {selectedIncident?.id === incident?.id && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-3 shadow-lg min-w-48 z-10">
                  <h4 className="font-semibold text-foreground">{incident?.type}</h4>
                  <p className="text-sm text-muted-foreground">{incident?.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {incident?.timeElapsed} • {incident?.severity?.toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Vehicle Markers */}
          {mapView === 'vehicles' && vehicles?.map((vehicle, index) => (
            <div
              key={vehicle?.id}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${25 + (index * 12) % 50}%`,
                top: `${35 + (index * 8) % 30}%`
              }}
            >
              <div className={`w-8 h-8 rounded-lg ${getVehicleStatusColor(vehicle?.status)} border-2 border-white shadow-lg flex items-center justify-center`}>
                <Icon name={vehicle?.type === 'ambulance' ? 'Cross' : vehicle?.type === 'fire' ? 'Flame' : 'Shield'} size={14} color="white" />
              </div>
            </div>
          ))}
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
          <h4 className="text-sm font-semibold text-foreground mb-2">Legend</h4>
          {mapView === 'incidents' ? (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-destructive rounded-full" />
                <span className="text-xs text-foreground">Critical</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-xs text-foreground">High Priority</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded-full" />
                <span className="text-xs text-foreground">Medium</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded-full" />
                <span className="text-xs text-foreground">Low/Resolved</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-success rounded" />
                <span className="text-xs text-foreground">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-warning rounded" />
                <span className="text-xs text-foreground">Dispatched</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded" />
                <span className="text-xs text-foreground">Busy</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-muted rounded" />
                <span className="text-xs text-foreground">Offline</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;