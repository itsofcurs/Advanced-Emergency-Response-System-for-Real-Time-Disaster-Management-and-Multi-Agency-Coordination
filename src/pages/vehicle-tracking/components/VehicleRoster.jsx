import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const VehicleRoster = ({ vehicles, onVehicleSelect, onStatusUpdate, onDispatchVehicle }) => {
  const [sortBy, setSortBy] = useState('callSign');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const sortOptions = [
    { value: 'callSign', label: 'Call Sign' },
    { value: 'status', label: 'Status' },
    { value: 'type', label: 'Vehicle Type' },
    { value: 'lastUpdate', label: 'Last Update' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'ambulance', label: 'Ambulance' },
    { value: 'fire', label: 'Fire Truck' },
    { value: 'police', label: 'Police Unit' }
  ];

  const statusOptions = [
    { value: 'available', label: 'Available' },
    { value: 'dispatched', label: 'Dispatched' },
    { value: 'on-scene', label: 'On Scene' },
    { value: 'returning', label: 'Returning' },
    { value: 'out-of-service', label: 'Out of Service' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success bg-success/10';
      case 'dispatched': return 'text-warning bg-warning/10';
      case 'on-scene': return 'text-primary bg-primary/10';
      case 'returning': return 'text-secondary bg-secondary/10';
      case 'out-of-service': return 'text-muted-foreground bg-muted/20';
      default: return 'text-muted-foreground bg-muted/20';
    }
  };

  const getVehicleIcon = (type) => {
    switch (type) {
      case 'ambulance': return 'Truck';
      case 'fire': return 'Flame';
      case 'police': return 'Shield';
      default: return 'Car';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Minus';
    }
  };

  const filteredAndSortedVehicles = vehicles?.filter(vehicle => {
      const matchesType = filterType === 'all' || vehicle?.type === filterType;
      const matchesSearch = vehicle?.callSign?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           vehicle?.crew?.some(member => member?.toLowerCase()?.includes(searchTerm?.toLowerCase()));
      return matchesType && matchesSearch;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'callSign':
          return a?.callSign?.localeCompare(b?.callSign);
        case 'status':
          return a?.status?.localeCompare(b?.status);
        case 'type':
          return a?.type?.localeCompare(b?.type);
        case 'lastUpdate':
          return new Date(b.lastUpdate) - new Date(a.lastUpdate);
        default:
          return 0;
      }
    });

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Vehicle Roster</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {filteredAndSortedVehicles?.length} of {vehicles?.length} vehicles
            </span>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              title="Refresh roster"
            />
          </div>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="relative">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search vehicles or crew..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full pl-10 pr-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <Select
            options={typeOptions}
            value={filterType}
            onChange={setFilterType}
            placeholder="Filter by type"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>
      </div>
      {/* Vehicle List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-2 p-4">
          {filteredAndSortedVehicles?.map((vehicle) => (
            <div
              key={vehicle?.id}
              className="p-4 bg-muted/20 rounded-lg border border-border hover:bg-muted/30 transition-colors cursor-pointer"
              onClick={() => onVehicleSelect(vehicle)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <Icon name={getVehicleIcon(vehicle?.type)} size={20} className="text-secondary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-foreground">{vehicle?.callSign}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(vehicle?.status)}`}>
                        {vehicle?.status?.replace('-', ' ')}
                      </span>
                      {vehicle?.priority !== 'low' && (
                        <Icon 
                          name={getPriorityIcon(vehicle?.priority)} 
                          size={14} 
                          className={vehicle?.priority === 'high' ? 'text-destructive' : 'text-warning'} 
                        />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {vehicle?.type?.charAt(0)?.toUpperCase() + vehicle?.type?.slice(1)} • {vehicle?.crew?.join(', ')}
                    </p>
                    {vehicle?.assignedIncident && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Icon name="MapPin" size={14} className="text-primary" />
                        <span className="text-sm text-primary font-medium">
                          Incident #{vehicle?.assignedIncident}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>Updated {formatTimeAgo(vehicle?.lastUpdate)}</span>
                      </div>
                      {vehicle?.eta && (
                        <div className="flex items-center space-x-1">
                          <Icon name="Navigation" size={12} />
                          <span>ETA {vehicle?.eta}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Icon name="Fuel" size={12} />
                        <span>{vehicle?.fuelLevel}%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2">
                  <Select
                    options={statusOptions}
                    value={vehicle?.status}
                    onChange={(newStatus) => onStatusUpdate(vehicle?.id, newStatus)}
                    className="w-32"
                  />
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MessageSquare"
                      title="Contact crew"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MapPin"
                      title="View on map"
                    />
                    {vehicle?.status === 'available' && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onDispatchVehicle(vehicle);
                        }}
                        iconName="Send"
                        title="Dispatch vehicle"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAndSortedVehicles?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Icon name="Search" size={32} className="mb-2" />
            <p>No vehicles found matching your criteria</p>
          </div>
        )}
      </div>
      {/* Quick Stats */}
      <div className="p-4 border-t border-border bg-muted/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['available', 'dispatched', 'on-scene', 'out-of-service']?.map((status) => {
            const count = vehicles?.filter(v => v?.status === status)?.length;
            return (
              <div key={status} className="text-center">
                <div className="text-lg font-bold text-foreground">{count}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {status?.replace('-', ' ')}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VehicleRoster;