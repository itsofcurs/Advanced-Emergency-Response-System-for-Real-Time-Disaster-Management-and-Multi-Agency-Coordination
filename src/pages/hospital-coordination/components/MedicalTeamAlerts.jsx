import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MedicalTeamAlerts = ({ teams, onAlertTeam, onEscalateAlert }) => {
  const [selectedTeam, setSelectedTeam] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertPriority, setAlertPriority] = useState('normal');

  const priorityOptions = [
    { value: 'normal', label: 'Normal Priority' },
    { value: 'urgent', label: 'Urgent Priority' },
    { value: 'critical', label: 'Critical Priority' }
  ];

  const teamOptions = teams?.map(team => ({
    value: team?.id,
    label: `${team?.specialty} - ${team?.name}`,
    description: `${team?.members?.length} members • ${team?.status}`
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'busy': return 'text-warning';
      case 'unavailable': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status) => {
    switch (status) {
      case 'available': return 'bg-success/10';
      case 'busy': return 'bg-warning/10';
      case 'unavailable': return 'bg-destructive/10';
      default: return 'bg-muted/10';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-destructive';
      case 'urgent': return 'text-warning';
      default: return 'text-foreground';
    }
  };

  const handleSendAlert = () => {
    if (selectedTeam && alertMessage?.trim()) {
      onAlertTeam({
        teamId: selectedTeam,
        message: alertMessage,
        priority: alertPriority,
        timestamp: new Date()?.toISOString()
      });
      setAlertMessage('');
      setSelectedTeam('');
      setAlertPriority('normal');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} color="black" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Medical Team Alerts</h3>
            <p className="text-sm text-muted-foreground">Instant team notification system</p>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        {/* Alert Composition */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Select Team"
              options={teamOptions}
              value={selectedTeam}
              onChange={setSelectedTeam}
              placeholder="Choose medical team"
              searchable
            />
            <Select
              label="Priority Level"
              options={priorityOptions}
              value={alertPriority}
              onChange={setAlertPriority}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Alert Message
            </label>
            <textarea
              value={alertMessage}
              onChange={(e) => setAlertMessage(e?.target?.value)}
              placeholder="Enter alert message for medical team..."
              className="w-full h-24 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="flex space-x-3">
            <Button
              variant="default"
              onClick={handleSendAlert}
              disabled={!selectedTeam || !alertMessage?.trim()}
              iconName="Send"
              iconPosition="left"
            >
              Send Alert
            </Button>
            <Button
              variant="destructive"
              onClick={() => onEscalateAlert({ priority: 'critical', message: alertMessage })}
              iconName="AlertTriangle"
              iconPosition="left"
              className="animate-emergency-pulse"
            >
              Emergency Escalation
            </Button>
          </div>
        </div>

        {/* Team Status Overview */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Team Status Overview</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teams?.map((team) => (
              <div key={team?.id} className="p-4 border border-border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-medium text-foreground">{team?.specialty}</h5>
                    <p className="text-sm text-muted-foreground">{team?.name}</p>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusBg(team?.status)} ${getStatusColor(team?.status)}`}>
                    {team?.status?.charAt(0)?.toUpperCase() + team?.status?.slice(1)}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Team Members:</span>
                    <span className="font-medium text-foreground">{team?.members?.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Active Cases:</span>
                    <span className="font-medium text-foreground">{team?.activeCases}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Response Time:</span>
                    <span className="font-medium text-foreground">{team?.avgResponseTime} min</span>
                  </div>
                </div>

                {team?.currentLocation && (
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-muted-foreground">{team?.currentLocation}</span>
                  </div>
                )}

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onAlertTeam({ teamId: team?.id, priority: 'urgent' })}
                    iconName="Bell"
                    iconPosition="left"
                    disabled={team?.status === 'unavailable'}
                  >
                    Quick Alert
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="MessageSquare"
                    iconPosition="left"
                  >
                    Message
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Recent Alerts</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {teams?.flatMap(team => team?.recentAlerts || [])?.slice(0, 5)?.map((alert, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded">
                <Icon 
                  name={alert?.priority === 'critical' ? 'AlertTriangle' : 'Bell'} 
                  size={16} 
                  className={getPriorityColor(alert?.priority)} 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-foreground">{alert?.teamName}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      alert?.priority === 'critical' ? 'bg-destructive/10 text-destructive' :
                      alert?.priority === 'urgent'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                    }`}>
                      {alert?.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{alert?.message}</p>
                  <p className="text-xs text-muted-foreground">{alert?.timestamp}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${
                  alert?.status === 'acknowledged' ? 'bg-success' :
                  alert?.status === 'read'? 'bg-warning' : 'bg-destructive'
                }`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalTeamAlerts;