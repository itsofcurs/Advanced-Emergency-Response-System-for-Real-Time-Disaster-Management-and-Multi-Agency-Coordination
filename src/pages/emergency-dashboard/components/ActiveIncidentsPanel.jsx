import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveIncidentsPanel = ({ incidents, onIncidentSelect, onDispatchOptimize }) => {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  const filterOptions = [
    { value: 'all', label: 'All Incidents', icon: 'List' },
    { value: 'critical', label: 'Critical', icon: 'AlertTriangle' },
    { value: 'medical', label: 'Medical', icon: 'Cross' },
    { value: 'fire', label: 'Fire', icon: 'Flame' },
    { value: 'police', label: 'Police', icon: 'Shield' }
  ];

  const sortOptions = [
    { value: 'priority', label: 'Priority' },
    { value: 'time', label: 'Time' },
    { value: 'location', label: 'Location' }
  ];

  const filteredIncidents = incidents?.filter(incident => {
    if (filter === 'all') return true;
    if (filter === 'critical') return incident?.severity === 'critical';
    return incident?.type?.toLowerCase()?.includes(filter);
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'high': return 'text-primary bg-primary/10 border-primary/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const getStatusIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'medical emergency': return 'Cross';
      case 'fire emergency': return 'Flame';
      case 'traffic accident': return 'Car';
      case 'police incident': return 'Shield';
      case 'natural disaster': return 'CloudRain';
      default: return 'AlertCircle';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Panel Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h3 className="text-lg font-semibold text-foreground">Active Incidents</h3>
            <div className="px-2 py-1 bg-primary/10 text-primary text-sm font-medium rounded">
              {filteredIncidents?.length}
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onDispatchOptimize}
            iconName="Zap"
            iconPosition="left"
          >
            Optimize Dispatch
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-3">
          {filterOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={filter === option?.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(option?.value)}
              iconName={option?.icon}
              iconPosition="left"
            >
              {option?.label}
            </Button>
          ))}
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e?.target?.value)}
            className="bg-input border border-border rounded px-2 py-1 text-sm text-foreground"
          >
            {sortOptions?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* Incidents List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredIncidents?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Active Incidents</h4>
            <p className="text-muted-foreground">All incidents have been resolved or no incidents match the current filter.</p>
          </div>
        ) : (
          <div className="space-y-2 p-4">
            {filteredIncidents?.map((incident) => (
              <div
                key={incident?.id}
                className="border border-border rounded-lg p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                onClick={() => onIncidentSelect(incident)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`p-2 rounded-lg ${getSeverityColor(incident?.severity)}`}>
                      <Icon name={getStatusIcon(incident?.type)} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-foreground truncate">{incident?.type}</h4>
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getSeverityColor(incident?.severity)}`}>
                          {incident?.severity?.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{incident?.location}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={12} />
                          <span>{incident?.timeElapsed}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={12} />
                          <span>{incident?.assignedUnits} units</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="MapPin" size={12} />
                          <span>{incident?.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-xs text-muted-foreground">
                      ID: {incident?.id}
                    </div>
                    <div className="flex space-x-1">
                      <Button
                        variant="outline"
                        size="xs"
                        iconName="Eye"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onIncidentSelect(incident);
                        }}
                      />
                      <Button
                        variant="outline"
                        size="xs"
                        iconName="Send"
                        onClick={(e) => {
                          e?.stopPropagation();
                          console.log('Dispatch units to incident:', incident?.id);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveIncidentsPanel;