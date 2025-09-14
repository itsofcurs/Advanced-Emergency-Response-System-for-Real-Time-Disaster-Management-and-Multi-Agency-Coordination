import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VehicleMap = ({ vehicles, selectedVehicle, onVehicleSelect, onDispatchVehicle }) => {
  const [mapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // New York City
  const [zoomLevel, setZoomLevel] = useState(12);
  const [showTraffic, setShowTraffic] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');

  const statusColors = {
    available: '#059669', // emerald-600
    dispatched: '#F59E0B', // amber-500
    'on-scene': '#DC2626', // red-600
    returning: '#1E40AF', // blue-700
    'out-of-service': '#6B7280' // gray-500
  };

  const filteredVehicles = vehicles?.filter(vehicle => 
    filterStatus === 'all' || vehicle?.status === filterStatus
  );

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 1, 8));
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'ambulance': return 'Truck';
      case 'fire': return 'Flame';
      case 'police': return 'Shield';
      default: return 'MapPin';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Map Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Live Vehicle Map</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
              <span className="text-sm text-success font-medium">Live GPS</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTraffic(!showTraffic)}
              iconName={showTraffic ? "Eye" : "EyeOff"}
              iconPosition="left"
            >
              Traffic
            </Button>
          </div>
        </div>

        {/* Status Filter */}
        <div className="flex flex-wrap gap-2">
          {['all', 'available', 'dispatched', 'on-scene', 'returning']?.map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                filterStatus === status
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {status === 'all' ? 'All Vehicles' : status?.charAt(0)?.toUpperCase() + status?.slice(1)}
              <span className="ml-1 text-xs">
                ({status === 'all' ? vehicles?.length : vehicles?.filter(v => v?.status === status)?.length})
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Map Container */}
      <div className="flex-1 relative bg-muted/20">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Emergency Vehicle Tracking Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${zoomLevel}&output=embed`}
          className="rounded-b-lg"
        />

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomIn}
            className="bg-card/90 backdrop-blur-sm"
          >
            <Icon name="Plus" size={16} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomOut}
            className="bg-card/90 backdrop-blur-sm"
          >
            <Icon name="Minus" size={16} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="bg-card/90 backdrop-blur-sm"
            title="Center Map"
          >
            <Icon name="Navigation" size={16} />
          </Button>
        </div>

        {/* Vehicle Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {filteredVehicles?.map((vehicle, index) => (
            <div
              key={vehicle?.id}
              className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${20 + (index % 5) * 15}%`,
                top: `${30 + Math.floor(index / 5) * 20}%`
              }}
              onClick={() => onVehicleSelect(vehicle)}
              title={`${vehicle?.callSign} - ${vehicle?.status}`}
            >
              <div className={`relative p-2 rounded-full shadow-lg transition-all hover:scale-110 ${
                selectedVehicle?.id === vehicle?.id ? 'ring-2 ring-primary' : ''
              }`} style={{ backgroundColor: statusColors?.[vehicle?.status] }}>
                <Icon name={getVehicleIcon(vehicle?.type)} size={16} color="white" />
                {vehicle?.priority === 'high' && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full animate-emergency-pulse" />
                )}
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-foreground whitespace-nowrap">
                {vehicle?.callSign}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-2">Vehicle Status</h4>
          <div className="space-y-1">
            {Object.entries(statusColors)?.map(([status, color]) => (
              <div key={status} className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                <span className="text-xs text-muted-foreground capitalize">
                  {status?.replace('-', ' ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Selected Vehicle Info */}
      {selectedVehicle && (
        <div className="p-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full" style={{ backgroundColor: statusColors?.[selectedVehicle?.status] }}>
                <Icon name={getVehicleIcon(selectedVehicle?.type)} size={16} color="white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{selectedVehicle?.callSign}</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedVehicle?.crew?.join(', ')} • {selectedVehicle?.status?.replace('-', ' ')}
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="MessageSquare"
                iconPosition="left"
              >
                Contact
              </Button>
              {selectedVehicle?.status === 'available' && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onDispatchVehicle(selectedVehicle)}
                  iconName="Send"
                  iconPosition="left"
                >
                  Dispatch
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehicleMap;