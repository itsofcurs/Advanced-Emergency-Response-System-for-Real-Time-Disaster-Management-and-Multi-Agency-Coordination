import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const IncidentDetailsForm = ({ incident, onUpdate, onSave }) => {
  const [formData, setFormData] = useState({
    location: incident?.location || "",
    type: incident?.type || "",
    severity: incident?.severity || "",
    description: incident?.description || "",
    callerName: incident?.callerName || "",
    callerPhone: incident?.callerPhone || "",
    coordinates: incident?.coordinates || ""
  });

  const [aiRecommendations] = useState([
    "Deploy 2 ambulances based on reported injuries",
    "Alert nearby trauma center - Level 1 facility recommended",
    "Request fire department for potential vehicle extraction",
    "Coordinate with traffic control for scene safety"
  ]);

  const incidentTypes = [
    { value: 'medical', label: 'Medical Emergency' },
    { value: 'fire', label: 'Fire Emergency' },
    { value: 'traffic', label: 'Traffic Accident' },
    { value: 'crime', label: 'Criminal Activity' },
    { value: 'natural', label: 'Natural Disaster' },
    { value: 'hazmat', label: 'Hazardous Materials' }
  ];

  const severityLevels = [
    { value: 'critical', label: 'Critical - Life Threatening' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onUpdate?.(updatedData);
  };

  const handleSave = () => {
    onSave?.(formData);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-primary';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="FileText" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-emergency-lg font-semibold text-foreground">Incident Details</h2>
            <p className="text-emergency-sm text-muted-foreground">
              {incident?.id ? `Incident #${incident?.id}` : 'New Incident'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Save">
            Save Draft
          </Button>
          <Button variant="default" size="sm" onClick={handleSave} iconName="Check">
            Save Changes
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-emergency-md font-medium text-foreground mb-4">Basic Information</h3>
          
          <Input
            label="Incident Location"
            type="text"
            placeholder="Enter street address or landmark"
            value={formData?.location}
            onChange={(e) => handleInputChange('location', e?.target?.value)}
            required
          />

          <Input
            label="GPS Coordinates"
            type="text"
            placeholder="Lat, Lng (auto-populated from location)"
            value={formData?.coordinates}
            onChange={(e) => handleInputChange('coordinates', e?.target?.value)}
            description="Automatically extracted from caller location"
          />

          <Select
            label="Incident Type"
            options={incidentTypes}
            value={formData?.type}
            onChange={(value) => handleInputChange('type', value)}
            placeholder="Select incident category"
            required
          />

          <Select
            label="Severity Level"
            options={severityLevels}
            value={formData?.severity}
            onChange={(value) => handleInputChange('severity', value)}
            placeholder="Assess incident priority"
            required
          />
        </div>

        {/* Caller Information */}
        <div className="space-y-4">
          <h3 className="text-emergency-md font-medium text-foreground mb-4">Caller Information</h3>
          
          <Input
            label="Caller Name"
            type="text"
            placeholder="Name of person reporting"
            value={formData?.callerName}
            onChange={(e) => handleInputChange('callerName', e?.target?.value)}
          />

          <Input
            label="Phone Number"
            type="tel"
            placeholder="Callback number"
            value={formData?.callerPhone}
            onChange={(e) => handleInputChange('callerPhone', e?.target?.value)}
          />

          {/* Current Status Display */}
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-emergency-sm font-medium text-foreground">Current Status</span>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-emergency-pulse" />
                <span className="text-emergency-sm text-warning font-medium">In Progress</span>
              </div>
            </div>
            <p className="text-emergency-xs text-muted-foreground">
              Created: {new Date()?.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      {/* Description */}
      <div className="mt-6">
        <label className="block text-emergency-sm font-medium text-foreground mb-2">
          Incident Description
        </label>
        <textarea
          className="w-full h-24 px-3 py-2 bg-input border border-border rounded-md text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
          placeholder="Detailed description of the incident..."
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
        />
      </div>
      {/* AI Recommendations */}
      <div className="mt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Brain" size={20} className="text-accent" />
          <h3 className="text-emergency-md font-medium text-foreground">AI Recommendations</h3>
          <div className="px-2 py-1 bg-accent/10 rounded text-emergency-xs text-accent font-medium">
            Auto-Generated
          </div>
        </div>
        <div className="space-y-2">
          {aiRecommendations?.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-accent/5 border border-accent/20 rounded-lg">
              <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
              <p className="text-emergency-sm text-foreground">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Priority Indicator */}
      {formData?.severity && (
        <div className="mt-6 p-4 border-l-4 border-l-primary bg-primary/5 rounded-r-lg">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={20} className={getSeverityColor(formData?.severity)} />
            <span className="text-emergency-sm font-medium text-foreground">
              Priority Level: 
            </span>
            <span className={`text-emergency-sm font-semibold ${getSeverityColor(formData?.severity)}`}>
              {severityLevels?.find(level => level?.value === formData?.severity)?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default IncidentDetailsForm;