import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentTimeline = ({ incidentId }) => {
  const [timelineEvents] = useState([
    {
      id: 1,
      timestamp: new Date(Date.now() - 1800000),
      type: 'created',
      title: 'Incident Created',
      description: 'Emergency call received from 555-0123',
      user: 'Dispatcher Sarah Johnson',
      priority: 'high'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1500000),
      type: 'assigned',
      title: 'Units Assigned',
      description: 'POL-205 assigned as first responder',
      user: 'System Auto-Assignment',
      priority: 'medium'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1200000),
      type: 'dispatch',
      title: 'Unit Dispatched',
      description: 'POL-205 en route to scene, ETA 2 minutes',
      user: 'Dispatcher Sarah Johnson',
      priority: 'high'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 900000),
      type: 'arrival',
      title: 'First Unit On Scene',
      description: 'POL-205 arrived at incident location',
      user: 'Officer Davis',
      priority: 'high'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 600000),
      type: 'update',
      title: 'Status Update',
      description: 'Requesting ambulance - 2 injured parties confirmed',
      user: 'Officer Davis',
      priority: 'critical'
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 300000),
      type: 'assigned',
      title: 'Additional Resources',
      description: 'AMB-001 and FIRE-12 assigned to incident',
      user: 'Dispatcher Sarah Johnson',
      priority: 'high'
    },
    {
      id: 7,
      timestamp: new Date(Date.now() - 120000),
      type: 'communication',
      title: 'Hospital Alert',
      description: 'General Hospital notified - trauma team on standby',
      user: 'System Auto-Alert',
      priority: 'medium'
    }
  ]);

  const [newUpdate, setNewUpdate] = useState('');
  const [showAddUpdate, setShowAddUpdate] = useState(false);

  const getEventIcon = (type) => {
    switch (type) {
      case 'created': return 'Plus';
      case 'assigned': return 'Users';
      case 'dispatch': return 'Send';
      case 'arrival': return 'MapPin';
      case 'update': return 'MessageSquare';
      case 'communication': return 'Phone';
      case 'completed': return 'CheckCircle';
      default: return 'Clock';
    }
  };

  const getEventColor = (type, priority) => {
    if (priority === 'critical') return 'text-destructive border-destructive';
    if (priority === 'high') return 'text-primary border-primary';
    if (priority === 'medium') return 'text-warning border-warning';
    return 'text-muted-foreground border-border';
  };

  const getPriorityBadge = (priority) => {
    const colors = {
      critical: 'bg-destructive/10 text-destructive',
      high: 'bg-primary/10 text-primary',
      medium: 'bg-warning/10 text-warning',
      low: 'bg-success/10 text-success'
    };
    return colors?.[priority] || colors?.low;
  };

  const handleAddUpdate = () => {
    if (newUpdate?.trim()) {
      // Add new update logic here
      setNewUpdate('');
      setShowAddUpdate(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes % 60}m ago`;
    }
    return `${minutes}m ago`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-emergency-lg font-semibold text-foreground">Incident Timeline</h2>
            <p className="text-emergency-sm text-muted-foreground">
              Complete audit trail for incident #{incidentId || '2024-001'}
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowAddUpdate(!showAddUpdate)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Update
        </Button>
      </div>
      {/* Add Update Form */}
      {showAddUpdate && (
        <div className="mb-6 p-4 bg-muted/30 border border-border rounded-lg">
          <h3 className="text-emergency-sm font-medium text-foreground mb-3">Add Timeline Update</h3>
          <div className="space-y-3">
            <textarea
              className="w-full h-20 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="Enter update details..."
              value={newUpdate}
              onChange={(e) => setNewUpdate(e?.target?.value)}
            />
            <div className="flex items-center space-x-2">
              <Button variant="default" size="sm" onClick={handleAddUpdate}>
                Add Update
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowAddUpdate(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        <div className="space-y-6">
          {timelineEvents?.map((event, index) => (
            <div key={event?.id} className="relative flex items-start space-x-4">
              {/* Timeline Dot */}
              <div className={`relative z-10 w-12 h-12 rounded-full border-2 bg-card flex items-center justify-center ${getEventColor(event?.type, event?.priority)}`}>
                <Icon name={getEventIcon(event?.type)} size={16} />
              </div>

              {/* Event Content */}
              <div className="flex-1 min-w-0 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-emergency-sm font-semibold text-foreground">
                        {event?.title}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-emergency-xs font-medium ${getPriorityBadge(event?.priority)}`}>
                        {event?.priority}
                      </span>
                    </div>
                    <p className="text-emergency-sm text-muted-foreground mb-2">
                      {event?.description}
                    </p>
                    <div className="flex items-center space-x-4 text-emergency-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="User" size={12} />
                        <span>{event?.user}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>{formatTimeAgo(event?.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={12} />
                        <span>{event?.timestamp?.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Actions for Recent Events */}
                {index < 2 && (
                  <div className="mt-3 flex items-center space-x-2">
                    <Button variant="ghost" size="xs" iconName="MessageSquare">
                      Comment
                    </Button>
                    <Button variant="ghost" size="xs" iconName="Share">
                      Share
                    </Button>
                    <Button variant="ghost" size="xs" iconName="Flag">
                      Flag
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Timeline Statistics */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-emergency-lg font-bold text-primary">7</div>
            <div className="text-emergency-xs text-muted-foreground">Total Events</div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-emergency-lg font-bold text-warning">30m</div>
            <div className="text-emergency-xs text-muted-foreground">Duration</div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-emergency-lg font-bold text-success">3</div>
            <div className="text-emergency-xs text-muted-foreground">Units Involved</div>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="text-emergency-lg font-bold text-accent">2m</div>
            <div className="text-emergency-xs text-muted-foreground">Response Time</div>
          </div>
        </div>
      </div>
      {/* Export Options */}
      <div className="mt-4 flex items-center justify-end space-x-2">
        <Button variant="ghost" size="sm" iconName="Download">
          Export Timeline
        </Button>
        <Button variant="ghost" size="sm" iconName="Printer">
          Print Report
        </Button>
      </div>
    </div>
  );
};

export default IncidentTimeline;