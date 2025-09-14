import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunicationPanel = ({ incidentId, onSendMessage }) => {
  const [messages] = useState([
    {
      id: 1,
      sender: 'Dispatcher Sarah Johnson',
      role: 'dispatcher',
      message: 'POL-205, respond to traffic accident at 5th & Main. Multiple vehicles involved.',
      timestamp: new Date(Date.now() - 1200000),
      priority: 'high',
      read: true
    },
    {
      id: 2,
      sender: 'Officer Davis (POL-205)',
      role: 'police',
      message: '10-4, en route to location. ETA 2 minutes.',
      timestamp: new Date(Date.now() - 1080000),
      priority: 'medium',
      read: true
    },
    {
      id: 3,
      sender: 'Officer Davis (POL-205)',
      role: 'police',
      message: 'On scene. Confirming 2-vehicle collision, requesting ambulance for 2 injured parties.',
      timestamp: new Date(Date.now() - 900000),
      priority: 'high',
      read: true
    },
    {
      id: 4,
      sender: 'Dispatcher Sarah Johnson',
      role: 'dispatcher',
      message: 'AMB-001 dispatched to your location. ETA 4 minutes. Fire department also en route.',
      timestamp: new Date(Date.now() - 720000),
      priority: 'high',
      read: true
    },
    {
      id: 5,
      sender: 'Paramedic Johnson (AMB-001)',
      role: 'medical',
      message: 'Arriving on scene. Setting up triage area.',
      timestamp: new Date(Date.now() - 480000),
      priority: 'medium',
      read: true
    },
    {
      id: 6,
      sender: 'Fire Chief Rodriguez (FIRE-12)',
      role: 'fire',
      message: 'Scene secured. Vehicle extraction complete. Patients ready for transport.',
      timestamp: new Date(Date.now() - 240000),
      priority: 'medium',
      read: false
    }
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('medium');
  const [activeChannels] = useState([
    { id: 'main', name: 'Main Dispatch', active: true, unread: 0 },
    { id: 'police', name: 'Police Channel', active: true, unread: 2 },
    { id: 'fire', name: 'Fire Department', active: true, unread: 1 },
    { id: 'medical', name: 'EMS Channel', active: true, unread: 0 },
    { id: 'hospital', name: 'Hospital Coord', active: false, unread: 0 }
  ]);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'dispatcher': return 'Headphones';
      case 'police': return 'Shield';
      case 'fire': return 'Flame';
      case 'medical': return 'Heart';
      case 'hospital': return 'Building2';
      default: return 'User';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'dispatcher': return 'text-primary bg-primary/10';
      case 'police': return 'text-secondary bg-secondary/10';
      case 'fire': return 'text-destructive bg-destructive/10';
      case 'medical': return 'text-success bg-success/10';
      case 'hospital': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'border-l-destructive bg-destructive/5';
      case 'high': return 'border-l-primary bg-primary/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-border bg-muted/5';
    }
  };

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      const message = {
        id: Date.now(),
        sender: 'Dispatcher Sarah Johnson',
        role: 'dispatcher',
        message: newMessage,
        timestamp: new Date(),
        priority: selectedPriority,
        read: true
      };
      onSendMessage?.(message);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickMessages = [
    'Request status update',
    'Requesting backup',
    'Scene secured',
    'Patient transported',
    'Incident resolved'
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-emergency-lg font-semibold text-foreground">Communication Center</h2>
            <p className="text-emergency-sm text-muted-foreground">
              Real-time coordination for incident #{incidentId || '2024-001'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Radio">
            Emergency Radio
          </Button>
          <Button variant="outline" size="sm" iconName="Phone">
            Conference Call
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Channel List */}
        <div className="lg:col-span-1">
          <h3 className="text-emergency-sm font-medium text-foreground mb-3">Active Channels</h3>
          <div className="space-y-2">
            {activeChannels?.map((channel) => (
              <div
                key={channel?.id}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  channel?.active 
                    ? 'bg-primary/10 border border-primary/20' :'bg-muted/30 border border-border hover:bg-muted/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-emergency-sm font-medium text-foreground">
                    {channel?.name}
                  </span>
                  {channel?.unread > 0 && (
                    <span className="w-5 h-5 bg-primary text-primary-foreground text-emergency-xs font-bold rounded-full flex items-center justify-center">
                      {channel?.unread}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`w-2 h-2 rounded-full ${channel?.active ? 'bg-success' : 'bg-muted-foreground'}`} />
                  <span className="text-emergency-xs text-muted-foreground">
                    {channel?.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mt-6">
            <h4 className="text-emergency-sm font-medium text-foreground mb-3">Quick Messages</h4>
            <div className="space-y-2">
              {quickMessages?.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => setNewMessage(msg)}
                  className="w-full text-left p-2 text-emergency-xs text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded transition-colors duration-200"
                >
                  {msg}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="lg:col-span-3">
          {/* Messages List */}
          <div className="h-96 overflow-y-auto mb-4 p-4 bg-muted/10 rounded-lg">
            <div className="space-y-4">
              {messages?.map((message) => (
                <div
                  key={message?.id}
                  className={`p-4 rounded-lg border-l-4 ${getPriorityColor(message?.priority)} ${
                    !message?.read ? 'ring-2 ring-primary/20' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${getRoleColor(message?.role)}`}>
                        <Icon name={getRoleIcon(message?.role)} size={12} />
                      </div>
                      <span className="text-emergency-sm font-medium text-foreground">
                        {message?.sender}
                      </span>
                      <span className="text-emergency-xs text-muted-foreground">
                        {formatTime(message?.timestamp)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-emergency-xs font-medium ${
                        message?.priority === 'critical' ? 'bg-destructive/10 text-destructive' :
                        message?.priority === 'high' ? 'bg-primary/10 text-primary' :
                        message?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                      }`}>
                        {message?.priority}
                      </span>
                      {!message?.read && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                  </div>
                  <p className="text-emergency-sm text-foreground">{message?.message}</p>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e?.target?.value)}
                className="px-3 py-2 bg-input border border-border rounded-md text-foreground text-emergency-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="critical">Critical</option>
              </select>
              <div className="flex-1 relative">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e?.target?.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                  className="w-full h-12 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <Button 
                variant="default" 
                onClick={handleSendMessage}
                disabled={!newMessage?.trim()}
                iconName="Send"
              >
                Send
              </Button>
            </div>

            <div className="flex items-center justify-between text-emergency-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  <span>All channels active</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>6 units connected</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="xs" iconName="Paperclip">
                  Attach
                </Button>
                <Button variant="ghost" size="xs" iconName="Mic">
                  Voice
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPanel;