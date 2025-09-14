import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const DispatchQueue = ({ pendingDispatches, availableVehicles, onAssignVehicle, onUpdatePriority, onRemoveFromQueue }) => {
  const [sortBy, setSortBy] = useState('priority');
  const [filterPriority, setFilterPriority] = useState('all');

  const sortOptions = [
    { value: 'priority', label: 'Priority' },
    { value: 'timestamp', label: 'Time Created' },
    { value: 'location', label: 'Location' },
    { value: 'type', label: 'Incident Type' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'high': return 'text-primary bg-primary/10 border-primary/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-secondary bg-secondary/10 border-secondary/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'Minus';
      default: return 'Circle';
    }
  };

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'medical': return 'Heart';
      case 'fire': return 'Flame';
      case 'accident': return 'Car';
      case 'crime': return 'Shield';
      case 'natural': return 'Cloud';
      default: return 'AlertCircle';
    }
  };

  const filteredAndSortedDispatches = pendingDispatches?.filter(dispatch => filterPriority === 'all' || dispatch?.priority === filterPriority)?.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
          return priorityOrder?.[a?.priority] - priorityOrder?.[b?.priority];
        case 'timestamp':
          return new Date(a.timestamp) - new Date(b.timestamp);
        case 'location':
          return a?.location?.localeCompare(b?.location);
        case 'type':
          return a?.type?.localeCompare(b?.type);
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
    return `${Math.floor(diffInMinutes / 60)}h ${diffInMinutes % 60}m ago`;
  };

  const getRecommendedVehicles = (dispatch) => {
    return availableVehicles?.filter(vehicle => {
        // Match vehicle type to incident type
        if (dispatch?.type === 'medical' && vehicle?.type !== 'ambulance') return false;
        if (dispatch?.type === 'fire' && vehicle?.type !== 'fire') return false;
        if (dispatch?.type === 'crime' && vehicle?.type !== 'police') return false;
        return vehicle?.status === 'available';
      })?.slice(0, 3); // Show top 3 recommendations
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Dispatch Queue</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              {filteredAndSortedDispatches?.length} pending
            </span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-warning rounded-full animate-emergency-pulse" />
              <span className="text-sm text-warning font-medium">Active</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            options={priorityOptions}
            value={filterPriority}
            onChange={setFilterPriority}
            placeholder="Filter by priority"
          />
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>
      </div>
      {/* Queue List */}
      <div className="flex-1 overflow-y-auto">
        <div className="space-y-3 p-4">
          {filteredAndSortedDispatches?.map((dispatch, index) => {
            const recommendedVehicles = getRecommendedVehicles(dispatch);
            
            return (
              <div
                key={dispatch?.id}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getPriorityColor(dispatch?.priority)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-mono text-muted-foreground">#{index + 1}</span>
                      <div className="p-2 bg-background/50 rounded-lg">
                        <Icon name={getIncidentIcon(dispatch?.type)} size={20} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-foreground">
                          Incident #{dispatch?.incidentId}
                        </h4>
                        <div className="flex items-center space-x-1">
                          <Icon name={getPriorityIcon(dispatch?.priority)} size={14} />
                          <span className="text-sm font-medium capitalize">
                            {dispatch?.priority}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {dispatch?.description}
                      </p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{dispatch?.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{formatTimeAgo(dispatch?.timestamp)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="User" size={12} />
                          <span>{dispatch?.reportedBy}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Priority Controls */}
                  <div className="flex items-center space-x-2">
                    <Select
                      options={[
                        { value: 'critical', label: 'Critical' },
                        { value: 'high', label: 'High' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'low', label: 'Low' }
                      ]}
                      value={dispatch?.priority}
                      onChange={(newPriority) => onUpdatePriority(dispatch?.id, newPriority)}
                      className="w-24"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveFromQueue(dispatch?.id)}
                      iconName="X"
                      title="Remove from queue"
                    />
                  </div>
                </div>
                {/* Recommended Vehicles */}
                {recommendedVehicles?.length > 0 && (
                  <div className="mt-4 p-3 bg-background/30 rounded-lg">
                    <h5 className="text-sm font-medium text-foreground mb-2">
                      Recommended Vehicles ({recommendedVehicles?.length})
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {recommendedVehicles?.map((vehicle) => (
                        <div
                          key={vehicle?.id}
                          className="flex items-center justify-between p-2 bg-background/50 rounded border border-border"
                        >
                          <div className="flex items-center space-x-2">
                            <Icon name={vehicle?.type === 'ambulance' ? 'Truck' : vehicle?.type === 'fire' ? 'Flame' : 'Shield'} size={14} />
                            <span className="text-sm font-medium">{vehicle?.callSign}</span>
                            <span className="text-xs text-muted-foreground">
                              {vehicle?.estimatedArrival}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onAssignVehicle(dispatch?.id, vehicle?.id)}
                            iconName="Send"
                            title="Assign vehicle"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {/* No Available Vehicles */}
                {recommendedVehicles?.length === 0 && (
                  <div className="mt-4 p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} className="text-destructive" />
                      <span className="text-sm text-destructive font-medium">
                        No suitable vehicles available
                      </span>
                    </div>
                    <p className="text-xs text-destructive/80 mt-1">
                      Consider requesting backup or reassigning from nearby units
                    </p>
                  </div>
                )}
                {/* Additional Actions */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>Waiting time: {formatTimeAgo(dispatch?.timestamp)}</span>
                    {dispatch?.priority === 'critical' && (
                      <span className="text-destructive font-medium">• URGENT</span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Phone"
                      title="Contact caller"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MapPin"
                      title="View location"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="FileText"
                      title="View details"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredAndSortedDispatches?.length === 0 && (
          <div className="flex flex-col items-center justify-center h-32 text-muted-foreground">
            <Icon name="CheckCircle" size={32} className="mb-2 text-success" />
            <p>No pending dispatches</p>
            <p className="text-sm">All incidents have been assigned</p>
          </div>
        )}
      </div>
      {/* Queue Statistics */}
      <div className="p-4 border-t border-border bg-muted/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['critical', 'high', 'medium', 'low']?.map((priority) => {
            const count = pendingDispatches?.filter(d => d?.priority === priority)?.length;
            return (
              <div key={priority} className="text-center">
                <div className={`text-lg font-bold ${getPriorityColor(priority)?.split(' ')?.[0]}`}>
                  {count}
                </div>
                <div className="text-xs text-muted-foreground capitalize">
                  {priority}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DispatchQueue;