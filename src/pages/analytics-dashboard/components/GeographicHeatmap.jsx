import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GeographicHeatmap = () => {
  const [selectedMetric, setSelectedMetric] = useState('incidents');
  const [timeRange, setTimeRange] = useState('24h');

  const regionData = [
    {
      id: 1,
      name: "Downtown District",
      coordinates: { lat: 40.7589, lng: -73.9851 },
      incidents: 45,
      responseTime: 3.2,
      severity: "high",
      population: 125000,
      coverage: 95
    },
    {
      id: 2,
      name: "Residential North",
      coordinates: { lat: 40.7831, lng: -73.9712 },
      incidents: 28,
      responseTime: 4.1,
      severity: "medium",
      population: 89000,
      coverage: 88
    },
    {
      id: 3,
      name: "Industrial East",
      coordinates: { lat: 40.7505, lng: -73.9934 },
      incidents: 32,
      responseTime: 3.8,
      severity: "high",
      population: 45000,
      coverage: 92
    },
    {
      id: 4,
      name: "Suburban West",
      coordinates: { lat: 40.7282, lng: -73.9942 },
      incidents: 18,
      responseTime: 5.2,
      severity: "low",
      population: 67000,
      coverage: 85
    },
    {
      id: 5,
      name: "Commercial South",
      coordinates: { lat: 40.7282, lng: -73.9942 },
      incidents: 38,
      responseTime: 3.5,
      severity: "medium",
      population: 98000,
      coverage: 90
    },
    {
      id: 6,
      name: "Harbor District",
      coordinates: { lat: 40.7061, lng: -74.0087 },
      incidents: 22,
      responseTime: 4.8,
      severity: "medium",
      population: 34000,
      coverage: 78
    }
  ];

  const metrics = [
    { key: 'incidents', label: 'Incident Volume', unit: 'incidents', icon: 'AlertCircle' },
    { key: 'responseTime', label: 'Response Time', unit: 'minutes', icon: 'Clock' },
    { key: 'coverage', label: 'Coverage Area', unit: '%', icon: 'Shield' }
  ];

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-destructive text-destructive-foreground';
      case 'medium': return 'bg-warning text-warning-foreground';
      case 'low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getMetricValue = (region, metric) => {
    switch (metric) {
      case 'incidents': return region?.incidents;
      case 'responseTime': return region?.responseTime;
      case 'coverage': return region?.coverage;
      default: return 0;
    }
  };

  const getMetricColor = (value, metric) => {
    if (metric === 'incidents') {
      if (value >= 40) return 'bg-destructive';
      if (value >= 25) return 'bg-warning';
      return 'bg-success';
    }
    if (metric === 'responseTime') {
      if (value >= 5) return 'bg-destructive';
      if (value >= 4) return 'bg-warning';
      return 'bg-success';
    }
    if (metric === 'coverage') {
      if (value >= 90) return 'bg-success';
      if (value >= 80) return 'bg-warning';
      return 'bg-destructive';
    }
    return 'bg-muted';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-success/10 rounded-lg">
            <Icon name="Map" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Geographic Analysis</h3>
            <p className="text-sm text-muted-foreground">Regional emergency response patterns and coverage</p>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          {timeRanges?.map((range) => (
            <Button
              key={range?.value}
              variant={timeRange === range?.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange(range?.value)}
            >
              {range?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {metrics?.map((metric) => (
            <Button
              key={metric?.key}
              variant={selectedMetric === metric?.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedMetric(metric?.key)}
              iconName={metric?.icon}
              iconPosition="left"
            >
              {metric?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Interactive Map Placeholder */}
        <div className="bg-muted/30 rounded-lg p-4 h-96 flex items-center justify-center">
          <div className="text-center">
            <Icon name="Map" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">Interactive Map</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Geographic visualization of {metrics?.find(m => m?.key === selectedMetric)?.label?.toLowerCase()}
            </p>
            <iframe
              width="100%"
              height="300"
              loading="lazy"
              title="Emergency Response Coverage Map"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=40.7589,-73.9851&z=12&output=embed"
              className="rounded border border-border"
            />
          </div>
        </div>

        {/* Regional Data */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">Regional Breakdown</h4>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>Showing: {metrics?.find(m => m?.key === selectedMetric)?.label}</span>
            </div>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {regionData?.sort((a, b) => getMetricValue(b, selectedMetric) - getMetricValue(a, selectedMetric))?.map((region) => {
                const metricValue = getMetricValue(region, selectedMetric);
                const metricUnit = metrics?.find(m => m?.key === selectedMetric)?.unit;
                
                return (
                  <div key={region?.id} className="bg-muted/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getMetricColor(metricValue, selectedMetric)}`} />
                        <span className="font-medium text-foreground">{region?.name}</span>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityColor(region?.severity)}`}>
                        {region?.severity?.toUpperCase()}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          {metrics?.find(m => m?.key === selectedMetric)?.label}:
                        </span>
                        <span className="ml-2 font-medium text-foreground">
                          {metricValue} {metricUnit}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Population:</span>
                        <span className="ml-2 font-medium text-foreground">
                          {region?.population?.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center p-2 bg-background/50 rounded">
                        <div className="font-medium text-primary">{region?.incidents}</div>
                        <div className="text-muted-foreground">Incidents</div>
                      </div>
                      <div className="text-center p-2 bg-background/50 rounded">
                        <div className="font-medium text-warning">{region?.responseTime}m</div>
                        <div className="text-muted-foreground">Response</div>
                      </div>
                      <div className="text-center p-2 bg-background/50 rounded">
                        <div className="font-medium text-success">{region?.coverage}%</div>
                        <div className="text-muted-foreground">Coverage</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicHeatmap;