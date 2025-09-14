import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IncidentVolumeChart = () => {
  const [viewType, setViewType] = useState('daily');
  const [selectedTypes, setSelectedTypes] = useState(['fire', 'medical', 'police', 'other']);

  const dailyData = [
    { period: '2025-09-07', fire: 12, medical: 28, police: 15, other: 8 },
    { period: '2025-09-08', fire: 18, medical: 32, police: 22, other: 12 },
    { period: '2025-09-09', fire: 8, medical: 24, police: 18, other: 6 },
    { period: '2025-09-10', fire: 22, medical: 38, police: 28, other: 14 },
    { period: '2025-09-11', fire: 15, medical: 30, police: 20, other: 10 },
    { period: '2025-09-12', fire: 10, medical: 26, police: 16, other: 8 },
    { period: '2025-09-13', fire: 14, medical: 29, police: 19, other: 9 },
    { period: '2025-09-14', fire: 16, medical: 31, police: 21, other: 11 }
  ];

  const hourlyData = [
    { period: '00:00', fire: 2, medical: 4, police: 3, other: 1 },
    { period: '04:00', fire: 1, medical: 2, police: 2, other: 1 },
    { period: '08:00', fire: 3, medical: 6, police: 4, other: 2 },
    { period: '12:00', fire: 4, medical: 8, police: 5, other: 3 },
    { period: '16:00', fire: 5, medical: 9, police: 6, other: 3 },
    { period: '20:00', fire: 3, medical: 7, police: 4, other: 2 }
  ];

  const getCurrentData = () => {
    return viewType === 'daily' ? dailyData : hourlyData;
  };

  const incidentTypes = [
    { key: 'fire', label: 'Fire Emergency', color: '#F59E0B' },
    { key: 'medical', label: 'Medical Emergency', color: '#DC2626' },
    { key: 'police', label: 'Police Response', color: '#1E40AF' },
    { key: 'other', label: 'Other Incidents', color: '#059669' }
  ];

  const formatPeriod = (period) => {
    if (viewType === 'daily') {
      const date = new Date(period);
      return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return period;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const total = payload?.reduce((sum, entry) => sum + entry?.value, 0);
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">
            {viewType === 'daily' ? formatPeriod(label) : `${label} - ${parseInt(label?.split(':')?.[0]) + 4}:00`}
          </p>
          <p className="text-xs text-muted-foreground mb-2">Total: {total} incidents</p>
          {payload?.map((entry) => (
            <div key={entry?.dataKey} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground capitalize">
                {incidentTypes?.find(t => t?.key === entry?.dataKey)?.label}:
              </span>
              <span className="font-medium text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="BarChart3" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Incident Volume Analysis</h3>
            <p className="text-sm text-muted-foreground">Emergency incidents by type and time period</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={viewType === 'daily' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType('daily')}
          >
            Daily View
          </Button>
          <Button
            variant={viewType === 'hourly' ? "default" : "outline"}
            size="sm"
            onClick={() => setViewType('hourly')}
          >
            Hourly View
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex flex-wrap gap-4">
          {incidentTypes?.map((type) => (
            <label key={type?.key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypes?.includes(type?.key)}
                onChange={(e) => {
                  if (e?.target?.checked) {
                    setSelectedTypes([...selectedTypes, type?.key]);
                  } else {
                    setSelectedTypes(selectedTypes?.filter(t => t !== type?.key));
                  }
                }}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
              />
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: type?.color }}
                />
                <span className="text-sm text-foreground">{type?.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getCurrentData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="period" 
              tickFormatter={formatPeriod}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Number of Incidents', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedTypes?.includes('fire') && (
              <Bar dataKey="fire" fill="#F59E0B" name="Fire Emergency" />
            )}
            {selectedTypes?.includes('medical') && (
              <Bar dataKey="medical" fill="#DC2626" name="Medical Emergency" />
            )}
            {selectedTypes?.includes('police') && (
              <Bar dataKey="police" fill="#1E40AF" name="Police Response" />
            )}
            {selectedTypes?.includes('other') && (
              <Bar dataKey="other" fill="#059669" name="Other Incidents" />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncidentVolumeChart;