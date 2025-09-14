import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallControlsPanel = ({ isCallActive, onCallStateChange, onEmergencyEscalation }) => {
  const [callState, setCallState] = useState({
    isOnHold: false,
    isMuted: false,
    isRecording: true,
    volume: 75,
    callDuration: 155 // seconds
  });
  
  const [transferOptions] = useState([
    { id: 'supervisor', name: 'Supervisor - John Smith', status: 'available', extension: '2001' },
    { id: 'medical', name: 'Medical Dispatch', status: 'available', extension: '3001' },
    { id: 'fire', name: 'Fire Department', status: 'busy', extension: '4001' },
    { id: 'police', name: 'Police Dispatch', status: 'available', extension: '5001' }
  ]);

  const [conferenceParticipants, setConferenceParticipants] = useState([]);

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleHold = () => {
    setCallState(prev => ({ ...prev, isOnHold: !prev?.isOnHold }));
    console.log('Call hold toggled');
  };

  const handleMute = () => {
    setCallState(prev => ({ ...prev, isMuted: !prev?.isMuted }));
    console.log('Call mute toggled');
  };

  const handleEndCall = () => {
    onCallStateChange(false);
    console.log('Call ended');
  };

  const handleTransfer = (transferTo) => {
    console.log(`Transferring call to: ${transferTo?.name}`);
  };

  const handleConference = (participant) => {
    setConferenceParticipants(prev => [...prev, participant]);
    console.log(`Adding ${participant?.name} to conference`);
  };

  const handleEmergencyEscalation = () => {
    onEmergencyEscalation();
    console.log('Emergency escalation triggered');
  };

  const handleVolumeChange = (newVolume) => {
    setCallState(prev => ({ ...prev, volume: newVolume }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success';
      case 'busy': return 'text-warning';
      case 'offline': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Phone" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Call Controls</h3>
          {isCallActive && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
              <span className="text-sm text-success font-medium">Active</span>
            </div>
          )}
        </div>
        
        {isCallActive && (
          <div className="text-right">
            <div className="font-mono text-lg font-bold text-foreground">
              {formatDuration(callState?.callDuration)}
            </div>
            <div className="text-xs text-muted-foreground">Call Duration</div>
          </div>
        )}
      </div>
      <div className="flex-1 p-4 space-y-6">
        {/* Primary Call Controls */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Primary Controls</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={callState?.isOnHold ? "default" : "outline"}
              size="lg"
              onClick={handleHold}
              iconName="Pause"
              iconPosition="left"
              disabled={!isCallActive}
              fullWidth
            >
              {callState?.isOnHold ? 'Resume' : 'Hold'}
            </Button>
            
            <Button
              variant={callState?.isMuted ? "default" : "outline"}
              size="lg"
              onClick={handleMute}
              iconName={callState?.isMuted ? "MicOff" : "Mic"}
              iconPosition="left"
              disabled={!isCallActive}
              fullWidth
            >
              {callState?.isMuted ? 'Unmute' : 'Mute'}
            </Button>
          </div>

          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            iconName="PhoneOff"
            iconPosition="left"
            disabled={!isCallActive}
            fullWidth
          >
            End Call
          </Button>
        </div>

        {/* Volume Control */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Audio Control</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Volume</span>
              <span className="text-sm font-mono text-foreground">{callState?.volume}%</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <Icon name="VolumeX" size={16} className="text-muted-foreground" />
              <div className="flex-1 relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={callState?.volume}
                  onChange={(e) => handleVolumeChange(parseInt(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                  disabled={!isCallActive}
                />
              </div>
              <Icon name="Volume2" size={16} className="text-muted-foreground" />
            </div>
          </div>
        </div>

        {/* Transfer Options */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Transfer Call</h4>
          
          <div className="space-y-2">
            {transferOptions?.map((option) => (
              <div key={option?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    option?.status === 'available' ? 'bg-success' : 
                    option?.status === 'busy' ? 'bg-warning' : 'bg-muted'
                  }`} />
                  <div>
                    <div className="text-sm font-medium text-foreground">{option?.name}</div>
                    <div className="text-xs text-muted-foreground">Ext. {option?.extension}</div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTransfer(option)}
                  disabled={!isCallActive || option?.status !== 'available'}
                  iconName="ArrowRight"
                >
                  Transfer
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Conference Controls */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Conference Call</h4>
          
          {conferenceParticipants?.length > 0 ? (
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground mb-2">Active Participants:</div>
              {conferenceParticipants?.map((participant, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-success/10 rounded">
                  <span className="text-sm text-foreground">{participant?.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="X"
                    onClick={() => setConferenceParticipants(prev => prev?.filter((_, i) => i !== index))}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">No active conference participants</div>
          )}
          
          <div className="grid grid-cols-2 gap-2">
            {transferOptions?.slice(0, 2)?.map((option) => (
              <Button
                key={option?.id}
                variant="outline"
                size="sm"
                onClick={() => handleConference(option)}
                disabled={!isCallActive || option?.status !== 'available'}
                iconName="Users"
              >
                Add {option?.name?.split(' - ')?.[0]}
              </Button>
            ))}
          </div>
        </div>

        {/* Emergency Escalation */}
        <div className="space-y-3 border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground">Emergency Actions</h4>
          
          <div className="space-y-2">
            <Button
              variant="destructive"
              size="lg"
              onClick={handleEmergencyEscalation}
              iconName="AlertTriangle"
              iconPosition="left"
              disabled={!isCallActive}
              fullWidth
              className="animate-emergency-pulse"
            >
              Emergency Escalation
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="warning"
                size="sm"
                iconName="Siren"
                iconPosition="left"
                disabled={!isCallActive}
              >
                Mass Alert
              </Button>
              
              <Button
                variant="secondary"
                size="sm"
                iconName="Radio"
                iconPosition="left"
                disabled={!isCallActive}
              >
                Radio Patch
              </Button>
            </div>
          </div>
        </div>

        {/* Call Statistics */}
        <div className="space-y-3 border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground">Call Statistics</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted/30 rounded-lg text-center">
              <div className="font-mono text-lg font-bold text-primary">
                {callState?.isRecording ? 'REC' : 'OFF'}
              </div>
              <div className="text-xs text-muted-foreground">Recording</div>
            </div>
            
            <div className="p-3 bg-muted/30 rounded-lg text-center">
              <div className="font-mono text-lg font-bold text-success">
                HD
              </div>
              <div className="text-xs text-muted-foreground">Audio Quality</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallControlsPanel;