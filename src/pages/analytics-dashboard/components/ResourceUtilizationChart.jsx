import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceUtilizationChart = () => {
  const [chartType, setChartType] = useState('pie');
  const [selectedResource, setSelectedResource] = useState('vehicles');

  const vehicleUtilization = [
    { name: 'Fire Trucks', value: 78, total: 25, active: 19, color: '#F59E0B' },
    { name: 'Ambulances', value: 85, total: 32, active: 27, color: '#DC2626' },
    { name: 'Police Cars', value: 72, total: 45, active: 32, color: '#1E40AF' },
    { name: 'Rescue Units', value: 65, total: 12, active: 8, color: '#059669' }
  ];

  const staffUtilization = [
    { name: 'Firefighters', value: 82, total: 120, active: 98, color: '#F59E0B' },
    { name: 'Paramedics', value: 89, total: 85, active: 76, color: '#DC2626' },
    { name: 'Police Officers', value: 75, total: 180, active: 135, color: '#1E40AF' },
    { name: 'Dispatchers', value: 95, total: 24, active: 23, color: '#059669' }
  ];

  const hospitalCapacity = [
    { name: 'Emergency Beds', value: 67, total: 150, active: 101, color: '#DC2626' },
    { name: 'ICU Beds', value: 78, total: 45, active: 35, color: '#F59E0B' },
    { name: 'Operating Rooms', value: 45, total: 20, active: 9, color: '#1E40AF' },
    { name: 'Trauma Bays', value: 83, total: 12, active: 10, color: '#059669' }
  ];

  const getCurrentData = () => {
    switch (selectedResource) {
      case 'vehicles': return vehicleUtilization;
      case 'staff': return staffUtilization;
      case 'hospital': return hospitalCapacity;
      default: return vehicleUtilization;
    }
  };

  const resourceTypes = [
    { key: 'vehicles', label: 'Emergency Vehicles', icon: 'Truck' },
    { key: 'staff', label: 'Personnel', icon: 'Users' },
    { key: 'hospital', label: 'Hospital Resources', icon: 'Building2' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{data?.name}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Utilization:</span>
              <span className="font-medium text-foreground">{data?.value}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active:</span>
              <span className="font-medium text-foreground">{data?.active}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total:</span>
              <span className="font-medium text-foreground">{data?.total}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomPieTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-2">{data?.name}</p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Utilization:</span>
              <span className="font-medium text-foreground">{data?.value}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active/Total:</span>
              <span className="font-medium text-foreground">{data?.active}/{data?.total}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-lg">
            <Icon name="Activity" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Resource Utilization</h3>
            <p className="text-sm text-muted-foreground">Real-time resource allocation and capacity monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={chartType === 'pie' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('pie')}
            iconName="PieChart"
            iconPosition="left"
          >
            Pie Chart
          </Button>
          <Button
            variant={chartType === 'bar' ? "default" : "outline"}
            size="sm"
            onClick={() => setChartType('bar')}
            iconName="BarChart3"
            iconPosition="left"
          >
            Bar Chart
          </Button>
        </div>
      </div>
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {resourceTypes?.map((type) => (
            <Button
              key={type?.key}
              variant={selectedResource === type?.key ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedResource(type?.key)}
              iconName={type?.icon}
              iconPosition="left"
            >
              {type?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'pie' ? (
                <PieChart>
                  <Pie
                    data={getCurrentData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {getCurrentData()?.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry?.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                  <Legend />
                </PieChart>
              ) : (
                <BarChart data={getCurrentData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground)"
                    fontSize={12}
                    label={{ value: 'Utilization %', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#DC2626" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Resource Details</h4>
          {getCurrentData()?.map((resource, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">{resource?.name}</span>
                <span className="text-sm font-bold text-primary">{resource?.value}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <div 
                  className="h-2 rounded-full transition-all duration-300" 
                  style={{ 
                    width: `${resource?.value}%`, 
                    backgroundColor: resource?.color 
                  }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Active: {resource?.active}</span>
                <span>Total: {resource?.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceUtilizationChart;