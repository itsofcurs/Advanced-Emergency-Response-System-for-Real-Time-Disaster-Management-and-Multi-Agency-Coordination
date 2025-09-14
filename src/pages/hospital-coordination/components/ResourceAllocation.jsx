import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceAllocation = ({ resources, onUpdateResource, onReserveResource }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Resources', icon: 'Package' },
    { id: 'equipment', label: 'Medical Equipment', icon: 'Stethoscope' },
    { id: 'blood', label: 'Blood Bank', icon: 'Droplets' },
    { id: 'operating', label: 'Operating Rooms', icon: 'Activity' },
    { id: 'pharmacy', label: 'Pharmacy', icon: 'Pill' }
  ];

  const getAvailabilityColor = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage <= 20) return 'text-destructive';
    if (percentage <= 50) return 'text-warning';
    return 'text-success';
  };

  const getAvailabilityBg = (available, total) => {
    const percentage = (available / total) * 100;
    if (percentage <= 20) return 'bg-destructive/10';
    if (percentage <= 50) return 'bg-warning/10';
    return 'bg-success/10';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return 'CheckCircle';
      case 'limited': return 'AlertCircle';
      case 'critical': return 'XCircle';
      case 'maintenance': return 'Wrench';
      default: return 'Circle';
    }
  };

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources?.filter(resource => resource?.category === selectedCategory);

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
              <Icon name="Package" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Resource Allocation</h3>
              <p className="text-sm text-muted-foreground">Medical equipment & facility management</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="RefreshCw"
            iconPosition="left"
            onClick={() => window.location?.reload()}
          >
            Refresh
          </Button>
        </div>
      </div>
      {/* Category Filter */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Resource Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources?.map((resource) => (
            <div key={resource?.id} className="border border-border rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    resource?.category === 'equipment' ? 'bg-secondary' :
                    resource?.category === 'blood' ? 'bg-destructive' :
                    resource?.category === 'operating' ? 'bg-accent' :
                    resource?.category === 'pharmacy'? 'bg-success' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={
                        resource?.category === 'equipment' ? 'Stethoscope' :
                        resource?.category === 'blood' ? 'Droplets' :
                        resource?.category === 'operating' ? 'Activity' :
                        resource?.category === 'pharmacy'? 'Pill' : 'Package'
                      } 
                      size={20} 
                      color="white" 
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{resource?.name}</h4>
                    <p className="text-sm text-muted-foreground">{resource?.location}</p>
                  </div>
                </div>
                <Icon 
                  name={getStatusIcon(resource?.status)} 
                  size={16} 
                  className={getAvailabilityColor(resource?.available, resource?.total)} 
                />
              </div>

              <div className={`p-3 rounded-lg ${getAvailabilityBg(resource?.available, resource?.total)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">Availability</span>
                  <span className={`text-sm font-bold ${getAvailabilityColor(resource?.available, resource?.total)}`}>
                    {resource?.available}/{resource?.total}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      (resource?.available / resource?.total) <= 0.2 ? 'bg-destructive' :
                      (resource?.available / resource?.total) <= 0.5 ? 'bg-warning': 'bg-success'
                    }`}
                    style={{ width: `${(resource?.available / resource?.total) * 100}%` }}
                  />
                </div>
              </div>

              {resource?.details && (
                <div className="space-y-2">
                  {Object.entries(resource?.details)?.map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{key?.replace(/([A-Z])/g, ' $1')}:</span>
                      <span className="font-medium text-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {resource?.nextMaintenance && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  <span>Next maintenance: {resource?.nextMaintenance}</span>
                </div>
              )}

              <div className="flex space-x-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => onReserveResource(resource)}
                  disabled={resource?.available === 0 || resource?.status === 'maintenance'}
                  iconName="Lock"
                  iconPosition="left"
                >
                  Reserve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateResource(resource)}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Update
                </Button>
              </div>

              {resource?.reservations && resource?.reservations?.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs font-medium text-foreground mb-1">Current Reservations:</p>
                  <div className="space-y-1">
                    {resource?.reservations?.slice(0, 2)?.map((reservation, index) => (
                      <div key={index} className="text-xs text-muted-foreground">
                        {reservation?.patient} - {reservation?.time}
                      </div>
                    ))}
                    {resource?.reservations?.length > 2 && (
                      <div className="text-xs text-muted-foreground">
                        +{resource?.reservations?.length - 2} more
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredResources?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No resources found in this category</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourceAllocation;