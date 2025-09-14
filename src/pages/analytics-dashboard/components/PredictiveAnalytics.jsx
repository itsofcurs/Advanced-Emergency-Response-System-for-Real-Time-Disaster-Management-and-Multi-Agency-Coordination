import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PredictiveAnalytics = () => {
  const [selectedModel, setSelectedModel] = useState('demand');
  const [timeHorizon, setTimeHorizon] = useState('7d');

  const demandForecast = [
    { date: '2025-09-15', actual: null, predicted: 42, confidence: 85, lower: 38, upper: 46 },
    { date: '2025-09-16', actual: null, predicted: 38, confidence: 82, lower: 34, upper: 42 },
    { date: '2025-09-17', actual: null, predicted: 45, confidence: 88, lower: 41, upper: 49 },
    { date: '2025-09-18', actual: null, predicted: 52, confidence: 79, lower: 47, upper: 57 },
    { date: '2025-09-19', actual: null, predicted: 48, confidence: 84, lower: 44, upper: 52 },
    { date: '2025-09-20', actual: null, predicted: 41, confidence: 86, lower: 37, upper: 45 },
    { date: '2025-09-21', actual: null, predicted: 39, confidence: 83, lower: 35, upper: 43 }
  ];

  const resourceOptimization = [
    { date: '2025-09-15', current: 25, optimal: 28, efficiency: 89, cost: 12500 },
    { date: '2025-09-16', current: 25, optimal: 26, efficiency: 92, cost: 12200 },
    { date: '2025-09-17', current: 25, optimal: 30, efficiency: 83, cost: 13800 },
    { date: '2025-09-18', current: 25, optimal: 32, efficiency: 78, cost: 14500 },
    { date: '2025-09-19', current: 25, optimal: 29, efficiency: 86, cost: 13200 },
    { date: '2025-09-20', current: 25, optimal: 27, efficiency: 90, cost: 12800 },
    { date: '2025-09-21', current: 25, optimal: 26, efficiency: 92, cost: 12400 }
  ];

  const riskAssessment = [
    { date: '2025-09-15', risk: 0.23, severity: 'medium', factors: ['weather', 'traffic'] },
    { date: '2025-09-16', risk: 0.18, severity: 'low', factors: ['traffic'] },
    { date: '2025-09-17', risk: 0.35, severity: 'high', factors: ['weather', 'events', 'traffic'] },
    { date: '2025-09-18', risk: 0.42, severity: 'high', factors: ['weather', 'events'] },
    { date: '2025-09-19', risk: 0.28, severity: 'medium', factors: ['events'] },
    { date: '2025-09-20', risk: 0.15, severity: 'low', factors: [] },
    { date: '2025-09-21', risk: 0.20, severity: 'low', factors: ['traffic'] }
  ];

  const models = [
    {
      key: 'demand',
      label: 'Demand Forecasting',
      description: 'Predict emergency incident volume',
      icon: 'TrendingUp',
      accuracy: 87
    },
    {
      key: 'resource',
      label: 'Resource Optimization',
      description: 'Optimize resource allocation',
      icon: 'Activity',
      accuracy: 92
    },
    {
      key: 'risk',
      label: 'Risk Assessment',
      description: 'Identify high-risk periods',
      icon: 'AlertTriangle',
      accuracy: 84
    }
  ];

  const timeHorizons = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' }
  ];

  const getCurrentData = () => {
    switch (selectedModel) {
      case 'demand': return demandForecast;
      case 'resource': return resourceOptimization;
      case 'risk': return riskAssessment;
      default: return demandForecast;
    }
  };

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
              <span className="font-medium text-foreground">
                {typeof entry?.value === 'number' ? entry?.value?.toFixed(1) : entry?.value}
                {selectedModel === 'risk' && entry?.dataKey === 'risk' ? '%' : ''}
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const insights = [
    {
      type: 'prediction',
      title: 'Peak Demand Expected',
      description: 'Thursday shows 52 predicted incidents, 18% above average',
      severity: 'warning',
      icon: 'TrendingUp'
    },
    {
      type: 'optimization',
      title: 'Resource Efficiency',
      description: 'Current allocation is 89% efficient, optimal would be 92%',
      severity: 'info',
      icon: 'Activity'
    },
    {
      type: 'risk',
      title: 'High Risk Period',
      description: 'Weather and events increase risk by 42% on Thursday',
      severity: 'critical',
      icon: 'AlertTriangle'
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-destructive';
      case 'warning': return 'text-warning';
      case 'info': return 'text-primary';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-secondary/10 rounded-lg">
            <Icon name="Brain" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Predictive Analytics</h3>
            <p className="text-sm text-muted-foreground">AI-powered forecasting and optimization models</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeHorizons?.map((horizon) => (
            <Button
              key={horizon?.value}
              variant={timeHorizon === horizon?.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeHorizon(horizon?.value)}
            >
              {horizon?.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {models?.map((model) => (
            <div
              key={model?.key}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedModel === model?.key
                  ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
              }`}
              onClick={() => setSelectedModel(model?.key)}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={model?.icon} size={20} className="text-primary" />
                <h4 className="font-medium text-foreground">{model?.label}</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{model?.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Accuracy</span>
                <span className="text-sm font-medium text-success">{model?.accuracy}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {selectedModel === 'demand' ? (
                <AreaChart data={getCurrentData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="upper"
                    stackId="1"
                    stroke="none"
                    fill="#DC2626"
                    fillOpacity={0.1}
                    name="Upper Bound"
                  />
                  <Area
                    type="monotone"
                    dataKey="lower"
                    stackId="1"
                    stroke="none"
                    fill="#FFFFFF"
                    fillOpacity={1}
                    name="Lower Bound"
                  />
                  <Line
                    type="monotone"
                    dataKey="predicted"
                    stroke="#DC2626"
                    strokeWidth={3}
                    dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                    name="Predicted"
                  />
                </AreaChart>
              ) : (
                <LineChart data={getCurrentData()} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  {selectedModel === 'resource' && (
                    <>
                      <Line
                        type="monotone"
                        dataKey="current"
                        stroke="#1E40AF"
                        strokeWidth={2}
                        dot={{ fill: '#1E40AF', strokeWidth: 2, r: 3 }}
                        name="Current"
                      />
                      <Line
                        type="monotone"
                        dataKey="optimal"
                        stroke="#059669"
                        strokeWidth={2}
                        dot={{ fill: '#059669', strokeWidth: 2, r: 3 }}
                        name="Optimal"
                      />
                    </>
                  )}
                  {selectedModel === 'risk' && (
                    <Line
                      type="monotone"
                      dataKey="risk"
                      stroke="#DC2626"
                      strokeWidth={3}
                      dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
                      name="Risk Level"
                    />
                  )}
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">AI Insights</h4>
          {insights?.map((insight, index) => (
            <div key={index} className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon 
                  name={insight?.icon} 
                  size={16} 
                  className={`mt-1 ${getSeverityColor(insight?.severity)}`} 
                />
                <div className="flex-1">
                  <h5 className="font-medium text-foreground mb-1">{insight?.title}</h5>
                  <p className="text-sm text-muted-foreground">{insight?.description}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Lightbulb" size={16} className="text-primary" />
              <h5 className="text-sm font-semibold text-foreground">Recommendations</h5>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Increase staffing by 12% on Thursday</li>
              <li>• Pre-position 3 additional units in downtown</li>
              <li>• Activate weather monitoring protocols</li>
              <li>• Coordinate with traffic management</li>
            </ul>
          </div>

          <div className="bg-muted/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Target" size={16} className="text-success" />
              <h5 className="text-sm font-semibold text-foreground">Model Performance</h5>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-medium text-foreground">
                  {models?.find(m => m?.key === selectedModel)?.accuracy}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-medium text-foreground">2 hours ago</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data Points:</span>
                <span className="font-medium text-foreground">15,847</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;