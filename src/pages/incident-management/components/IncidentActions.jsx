import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentActions = ({ incident, onDispatchUnits, onUpdateStatus, onRequestBackup, onCloseIncident }) => {
  const [showConfirmClose, setShowConfirmClose] = useState(false);
  const [showStatusUpdate, setShowStatusUpdate] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [statusNote, setStatusNote] = useState('');

  const statusOptions = [
    { value: 'created', label: 'Created', color: 'text-muted-foreground' },
    { value: 'assigned', label: 'Units Assigned', color: 'text-warning' },
    { value: 'dispatched', label: 'Units Dispatched', color: 'text-primary' },
    { value: 'on-scene', label: 'On Scene', color: 'text-accent' },
    { value: 'in-progress', label: 'In Progress', color: 'text-secondary' },
    { value: 'resolved', label: 'Resolved', color: 'text-success' },
    { value: 'closed', label: 'Closed', color: 'text-muted-foreground' }
  ];

  const currentStatus = incident?.status || 'in-progress';
  const currentStatusInfo = statusOptions?.find(s => s?.value === currentStatus);

  const handleDispatchUnits = () => {
    onDispatchUnits?.();
  };

  const handleUpdateStatus = () => {
    if (newStatus && statusNote) {
      onUpdateStatus?.(newStatus, statusNote);
      setShowStatusUpdate(false);
      setNewStatus('');
      setStatusNote('');
    }
  };

  const handleRequestBackup = () => {
    onRequestBackup?.();
  };

  const handleCloseIncident = () => {
    if (showConfirmClose) {
      onCloseIncident?.();
      setShowConfirmClose(false);
    } else {
      setShowConfirmClose(true);
    }
  };

  const getActionAvailability = () => {
    switch (currentStatus) {
      case 'created':
        return {
          dispatch: true,
          update: true,
          backup: false,
          close: false
        };
      case 'assigned':
        return {
          dispatch: true,
          update: true,
          backup: true,
          close: false
        };
      case 'dispatched': case'on-scene': case'in-progress':
        return {
          dispatch: false,
          update: true,
          backup: true,
          close: true
        };
      case 'resolved':
        return {
          dispatch: false,
          update: true,
          backup: false,
          close: true
        };
      default:
        return {
          dispatch: false,
          update: false,
          backup: false,
          close: false
        };
    }
  };

  const actionAvailability = getActionAvailability();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-emergency-lg font-semibold text-foreground">Incident Actions</h2>
            <p className="text-emergency-sm text-muted-foreground">
              Manage incident workflow and status
            </p>
          </div>
        </div>
        
        {/* Current Status Display */}
        <div className="flex items-center space-x-2">
          <span className="text-emergency-sm text-muted-foreground">Status:</span>
          <div className={`px-3 py-1 rounded-full text-emergency-sm font-medium bg-muted/20 ${currentStatusInfo?.color || 'text-muted-foreground'}`}>
            {currentStatusInfo?.label || 'Unknown'}
          </div>
        </div>
      </div>
      {/* Primary Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Button
          variant="default"
          size="lg"
          onClick={handleDispatchUnits}
          disabled={!actionAvailability?.dispatch}
          iconName="Send"
          iconPosition="left"
          fullWidth
          className={actionAvailability?.dispatch ? 'animate-emergency-pulse' : ''}
        >
          Dispatch Units
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => setShowStatusUpdate(true)}
          disabled={!actionAvailability?.update}
          iconName="RefreshCw"
          iconPosition="left"
          fullWidth
        >
          Update Status
        </Button>

        <Button
          variant="warning"
          size="lg"
          onClick={handleRequestBackup}
          disabled={!actionAvailability?.backup}
          iconName="Users"
          iconPosition="left"
          fullWidth
        >
          Request Backup
        </Button>

        <Button
          variant="success"
          size="lg"
          onClick={handleCloseIncident}
          disabled={!actionAvailability?.close}
          iconName="CheckCircle"
          iconPosition="left"
          fullWidth
        >
          {showConfirmClose ? 'Confirm Close' : 'Close Incident'}
        </Button>
      </div>
      {/* Status Update Modal */}
      {showStatusUpdate && (
        <div className="mb-6 p-4 bg-muted/30 border border-border rounded-lg">
          <h3 className="text-emergency-md font-medium text-foreground mb-4">Update Incident Status</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-emergency-sm font-medium text-foreground mb-2">
                New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e?.target?.value)}
                className="w-full px-3 py-2 bg-input border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select new status...</option>
                {statusOptions?.map((status) => (
                  <option key={status?.value} value={status?.value}>
                    {status?.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-emergency-sm font-medium text-foreground mb-2">
                Status Note
              </label>
              <textarea
                value={statusNote}
                onChange={(e) => setStatusNote(e?.target?.value)}
                placeholder="Provide details about the status change..."
                className="w-full h-20 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="default" onClick={handleUpdateStatus}>
                Update Status
              </Button>
              <Button variant="ghost" onClick={() => setShowStatusUpdate(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Close Confirmation */}
      {showConfirmClose && (
        <div className="mb-6 p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="AlertTriangle" size={20} className="text-destructive" />
            <h3 className="text-emergency-md font-medium text-foreground">Confirm Incident Closure</h3>
          </div>
          <p className="text-emergency-sm text-muted-foreground mb-4">
            Are you sure you want to close this incident? This action will mark the incident as resolved and notify all assigned units.
          </p>
          <div className="flex items-center space-x-2">
            <Button variant="destructive" onClick={handleCloseIncident}>
              Yes, Close Incident
            </Button>
            <Button variant="ghost" onClick={() => setShowConfirmClose(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
      {/* Secondary Actions */}
      <div className="border-t border-border pt-6">
        <h3 className="text-emergency-sm font-medium text-foreground mb-4">Additional Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="ghost" size="sm" iconName="FileText" iconPosition="left">
            Generate Report
          </Button>
          <Button variant="ghost" size="sm" iconName="Share" iconPosition="left">
            Share Incident
          </Button>
          <Button variant="ghost" size="sm" iconName="Archive" iconPosition="left">
            Archive
          </Button>
          <Button variant="ghost" size="sm" iconName="Flag" iconPosition="left">
            Flag for Review
          </Button>
          <Button variant="ghost" size="sm" iconName="Copy" iconPosition="left">
            Duplicate
          </Button>
          <Button variant="ghost" size="sm" iconName="Download" iconPosition="left">
            Export Data
          </Button>
          <Button variant="ghost" size="sm" iconName="Printer" iconPosition="left">
            Print Details
          </Button>
          <Button variant="ghost" size="sm" iconName="MoreHorizontal" iconPosition="left">
            More Options
          </Button>
        </div>
      </div>
      {/* Action History */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-emergency-sm font-medium text-foreground mb-4">Recent Actions</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          <div className="flex items-center justify-between p-2 bg-muted/20 rounded text-emergency-xs">
            <div className="flex items-center space-x-2">
              <Icon name="Send" size={12} className="text-primary" />
              <span className="text-foreground">Units dispatched</span>
            </div>
            <span className="text-muted-foreground">2 min ago</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-muted/20 rounded text-emergency-xs">
            <div className="flex items-center space-x-2">
              <Icon name="RefreshCw" size={12} className="text-warning" />
              <span className="text-foreground">Status updated to "In Progress"</span>
            </div>
            <span className="text-muted-foreground">5 min ago</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-muted/20 rounded text-emergency-xs">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={12} className="text-secondary" />
              <span className="text-foreground">Resources assigned</span>
            </div>
            <span className="text-muted-foreground">8 min ago</span>
          </div>
        </div>
      </div>
      {/* Emergency Escalation */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-primary" />
            <span className="text-emergency-sm font-medium text-foreground">Emergency Escalation</span>
          </div>
          <Button variant="destructive" size="sm" iconName="Siren">
            Escalate to Command
          </Button>
        </div>
        <p className="text-emergency-xs text-muted-foreground mt-2">
          Use emergency escalation for critical situations requiring immediate command attention.
        </p>
      </div>
    </div>
  );
};

export default IncidentActions;