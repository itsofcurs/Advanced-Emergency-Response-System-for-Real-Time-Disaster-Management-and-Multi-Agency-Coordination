import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResponseTimeChart = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedAgencies, setSelectedAgencies] = useState(['all']);

  const responseTimeData = [
    { date: '2025-09-07', fire: 3.2, police: 2.8, medical: 4.1, average: 3.4 },
    { date: '2025-09-08', fire: 3.8, police: 3.1, medical: 4.5, average: 3.8 },
    { date: '2025-09-09', fire: 2.9, police: 2.5, medical: 3.8, average: 3.1 },
    { date: '2025-09-10', fire: 4.2, police: 3.4, medical: 4.8, average: 4.1 },
    { date: '2025-09-11', fire: 3.5, police: 2.9, medical: 4.2, average: 3.5 },
    { date: '2025-09-12', fire: 3.1, police: 2.7, medical: 3.9, average: 3.2 },
    { date: '2025-09-13', fire: 2.8, police: 2.4, medical: 3.6, average: 2.9 },
    { date: '2025-09-14', fire: 3.3, police: 2.8, medical: 4.0, average: 3.4 }
  ];

  const timeRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const agencies = [
    { value: 'all', label: 'All Agencies', color: '#DC2626' },
    { value: 'fire', label: 'Fire Department', color: '#F59E0B' },
    { value: 'police', label: 'Police', color: '#1E40AF' },
    { value: 'medical', label: 'Medical Services', color: '#059669' }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">
            {formatDate(label)}
          </p>
          {payload?.map((entry) => (
            <div key={entry?.dataKey} className="flex items-center space-x-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-muted-foreground capitalize">{entry?.dataKey}:</span>
              <span className="font-medium text-foreground">{entry?.value} min</span>
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
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Response Time Trends</h3>
            <p className="text-sm text-muted-foreground">Average emergency response times by agency</p>
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
      <div className="mb-4">
        <div className="flex flex-wrap gap-4">
          {agencies?.map((agency) => (
            <label key={agency?.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAgencies?.includes(agency?.value)}
                onChange={(e) => {
                  if (e?.target?.checked) {
                    setSelectedAgencies([...selectedAgencies, agency?.value]);
                  } else {
                    setSelectedAgencies(selectedAgencies?.filter(a => a !== agency?.value));
                  }
                }}
                className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
              />
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: agency?.color }}
                />
                <span className="text-sm text-foreground">{agency?.label}</span>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={responseTimeData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
              label={{ value: 'Response Time (minutes)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            {selectedAgencies?.includes('average') && (
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#DC2626" 
                strokeWidth={3}
                dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                name="Average"
              />
            )}
            {selectedAgencies?.includes('fire') && (
              <Line 
                type="monotone" 
                dataKey="fire" 
                stroke="#F59E0B" 
                strokeWidth={2}
                dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                name="Fire Department"
              />
            )}
            {selectedAgencies?.includes('police') && (
              <Line 
                type="monotone" 
                dataKey="police" 
                stroke="#1E40AF" 
                strokeWidth={2}
                dot={{ fill: '#1E40AF', strokeWidth: 2, r: 3 }}
                name="Police"
              />
            )}
            {selectedAgencies?.includes('medical') && (
              <Line 
                type="monotone" 
                dataKey="medical" 
                stroke="#059669" 
                strokeWidth={2}
                dot={{ fill: '#059669', strokeWidth: 2, r: 3 }}
                name="Medical Services"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ResponseTimeChart;