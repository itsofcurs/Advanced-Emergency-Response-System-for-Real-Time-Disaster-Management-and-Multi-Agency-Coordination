import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CommunicationPanel = ({ messages, onSendMessage, onTranslateMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [messageType, setMessageType] = useState('general');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const recipientOptions = [
    { value: 'all', label: 'All Teams' },
    { value: 'ems', label: 'EMS Crews' },
    { value: 'hospital', label: 'Hospital Staff' },
    { value: 'emergency', label: 'Emergency Coordinators' },
    { value: 'dispatch', label: 'Dispatch Center' }
  ];

  const messageTypeOptions = [
    { value: 'general', label: 'General Update' },
    { value: 'urgent', label: 'Urgent Notice' },
    { value: 'medical', label: 'Medical Alert' },
    { value: 'transfer', label: 'Patient Transfer' },
    { value: 'resource', label: 'Resource Request' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'zh', label: 'Chinese' }
  ];

  const getMessageTypeColor = (type) => {
    switch (type) {
      case 'urgent': return 'text-destructive';
      case 'medical': return 'text-warning';
      case 'transfer': return 'text-secondary';
      case 'resource': return 'text-accent';
      default: return 'text-foreground';
    }
  };

  const getMessageTypeBg = (type) => {
    switch (type) {
      case 'urgent': return 'bg-destructive/10';
      case 'medical': return 'bg-warning/10';
      case 'transfer': return 'bg-secondary/10';
      case 'resource': return 'bg-accent/10';
      default: return 'bg-muted/10';
    }
  };

  const handleSendMessage = () => {
    if (newMessage?.trim() && selectedRecipient) {
      onSendMessage({
        content: newMessage,
        recipient: selectedRecipient,
        type: messageType,
        language: selectedLanguage,
        timestamp: new Date()?.toISOString(),
        sender: 'Sarah Johnson'
      });
      setNewMessage('');
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffMinutes < 1) return 'Just now';
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    if (diffMinutes < 1440) return `${Math.floor(diffMinutes / 60)}h ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="MessageSquare" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Communication Panel</h3>
            <p className="text-sm text-muted-foreground">Secure inter-agency messaging</p>
          </div>
        </div>
      </div>
      {/* Message Composition */}
      <div className="p-6 border-b border-border space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            label="Recipient"
            options={recipientOptions}
            value={selectedRecipient}
            onChange={setSelectedRecipient}
            placeholder="Select recipient"
          />
          <Select
            label="Message Type"
            options={messageTypeOptions}
            value={messageType}
            onChange={setMessageType}
          />
          <Select
            label="Language"
            options={languageOptions}
            value={selectedLanguage}
            onChange={setSelectedLanguage}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message Content
          </label>
          <div className="relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)}
              placeholder="Type your message here..."
              className="w-full h-20 px-3 py-2 bg-input border border-border rounded-lg text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring pr-12"
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              {newMessage?.length}/500
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button
            variant="default"
            onClick={handleSendMessage}
            disabled={!newMessage?.trim() || !selectedRecipient}
            iconName="Send"
            iconPosition="left"
          >
            Send Message
          </Button>
          <Button
            variant="outline"
            onClick={() => onTranslateMessage(newMessage, selectedLanguage)}
            disabled={!newMessage?.trim()}
            iconName="Languages"
            iconPosition="left"
          >
            Translate
          </Button>
        </div>
      </div>
      {/* Message History */}
      <div className="flex-1 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-foreground">Recent Messages</h4>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
              <span className="text-sm text-success">Live</span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 space-y-4 max-h-96 overflow-y-auto">
          {messages?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No messages yet</p>
            </div>
          ) : (
            messages?.map((message) => (
              <div key={message?.id} className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="User" size={14} color="white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-medium text-foreground">{message?.sender}</span>
                      <span className="text-xs text-muted-foreground">to {message?.recipient}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getMessageTypeBg(message?.type)} ${getMessageTypeColor(message?.type)}`}>
                        {message?.type}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatTimestamp(message?.timestamp)}</span>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm text-foreground">{message?.content}</p>
                      {message?.language !== 'en' && (
                        <div className="mt-2 pt-2 border-t border-border">
                          <div className="flex items-center space-x-2 mb-1">
                            <Icon name="Languages" size={12} className="text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              Translated from {languageOptions?.find(l => l?.value === message?.language)?.label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground italic">{message?.originalContent}</p>
                        </div>
                      )}
                    </div>
                    {message?.attachments && message?.attachments?.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message?.attachments?.map((attachment, index) => (
                          <div key={index} className="flex items-center space-x-2 px-2 py-1 bg-muted/50 rounded text-xs">
                            <Icon name="Paperclip" size={12} className="text-muted-foreground" />
                            <span className="text-muted-foreground">{attachment?.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {message?.replies && message?.replies?.length > 0 && (
                  <div className="ml-11 space-y-2">
                    {message?.replies?.map((reply, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <div className="w-6 h-6 bg-muted rounded-full flex items-center justify-center">
                          <Icon name="User" size={10} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-xs font-medium text-foreground">{reply?.sender}</span>
                            <span className="text-xs text-muted-foreground">{formatTimestamp(reply?.timestamp)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground bg-muted/20 p-2 rounded">{reply?.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      {/* Quick Actions */}
      <div className="p-6 border-t border-border">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNewMessage('Patient transfer request - please confirm bed availability')}
            iconName="ArrowRightLeft"
            iconPosition="left"
          >
            Transfer Request
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNewMessage('Medical team needed for incoming critical patient')}
            iconName="Users"
            iconPosition="left"
          >
            Team Alert
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNewMessage('Resource shortage - requesting immediate assistance')}
            iconName="Package"
            iconPosition="left"
          >
            Resource Alert
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPanel;