import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PerformanceMetrics = ({ vehicles, responseData, onExportData, onViewDetails }) => {
  const [timeRange, setTimeRange] = useState('today');
  const [metricType, setMetricType] = useState('response-times');

  const timeRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' }
  ];

  const metricTypeOptions = [
    { value: 'response-times', label: 'Response Times' },
    { value: 'fuel-usage', label: 'Fuel Usage' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'utilization', label: 'Vehicle Utilization' }
  ];

  // Mock performance data
  const performanceData = {
    'response-times': {
      average: '6.2 min',
      target: '8.0 min',
      improvement: '+12%',
      trend: 'improving',
      details: [
        { vehicle: 'AMB-01', avgTime: '5.8 min', calls: 12, status: 'excellent' },
        { vehicle: 'FIRE-03', avgTime: '4.2 min', calls: 8, status: 'excellent' },
        { vehicle: 'POL-07', avgTime: '7.1 min', calls: 15, status: 'good' },
        { vehicle: 'AMB-04', avgTime: '8.9 min', calls: 9, status: 'needs-improvement' }
      ]
    },
    'fuel-usage': {
      average: '12.4 mpg',
      target: '11.0 mpg',
      improvement: '+8%',
      trend: 'stable',
      details: [
        { vehicle: 'AMB-01', usage: '13.2 mpg', cost: '$89', status: 'excellent' },
        { vehicle: 'FIRE-03', usage: '8.1 mpg', cost: '$156', status: 'good' },
        { vehicle: 'POL-07', usage: '15.8 mpg', cost: '$67', status: 'excellent' },
        { vehicle: 'AMB-04', usage: '11.9 mpg', cost: '$94', status: 'good' }
      ]
    },
    'maintenance': {
      average: '98.2%',
      target: '95.0%',
      improvement: '+3%',
      trend: 'improving',
      details: [
        { vehicle: 'AMB-01', uptime: '99.1%', nextService: '2 days', status: 'excellent' },
        { vehicle: 'FIRE-03', uptime: '97.8%', nextService: '1 week', status: 'good' },
        { vehicle: 'POL-07', uptime: '98.9%', nextService: '5 days', status: 'excellent' },
        { vehicle: 'AMB-04', uptime: '96.9%', nextService: 'overdue', status: 'needs-improvement' }
      ]
    },
    'utilization': {
      average: '76.3%',
      target: '70.0%',
      improvement: '+9%',
      trend: 'improving',
      details: [
        { vehicle: 'AMB-01', utilization: '82.1%', hours: '19.7h', status: 'excellent' },
        { vehicle: 'FIRE-03', utilization: '68.4%', hours: '16.4h', status: 'good' },
        { vehicle: 'POL-07', utilization: '79.8%', hours: '19.2h', status: 'excellent' },
        { vehicle: 'AMB-04', utilization: '74.9%', hours: '18.0h', status: 'good' }
      ]
    }
  };

  const currentData = performanceData?.[metricType];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-success bg-success/10';
      case 'good': return 'text-secondary bg-secondary/10';
      case 'needs-improvement': return 'text-warning bg-warning/10';
      case 'critical': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return 'CheckCircle';
      case 'good': return 'Circle';
      case 'needs-improvement': return 'AlertCircle';
      case 'critical': return 'AlertTriangle';
      default: return 'Minus';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return 'TrendingUp';
      case 'declining': return 'TrendingDown';
      case 'stable': return 'Minus';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'improving': return 'text-success';
      case 'declining': return 'text-destructive';
      case 'stable': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Performance Metrics</h3>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onExportData}
              iconName="Download"
              iconPosition="left"
            >
              Export
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="RefreshCw"
              title="Refresh data"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Select
            options={metricTypeOptions}
            value={metricType}
            onChange={setMetricType}
            placeholder="Select metric type"
          />
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            placeholder="Select time range"
          />
        </div>
      </div>
      {/* Key Metrics Summary */}
      <div className="p-4 border-b border-border bg-muted/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{currentData?.average}</div>
            <div className="text-sm text-muted-foreground">Current Average</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-2xl font-bold text-secondary">{currentData?.target}</div>
            <div className="text-sm text-muted-foreground">Target</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className={`text-2xl font-bold ${getTrendColor(currentData?.trend)}`}>
              {currentData?.improvement}
            </div>
            <div className="text-sm text-muted-foreground">vs Last Period</div>
          </div>
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="flex items-center justify-center space-x-1">
              <Icon name={getTrendIcon(currentData?.trend)} size={20} className={getTrendColor(currentData?.trend)} />
              <span className={`text-lg font-bold ${getTrendColor(currentData?.trend)}`}>
                {currentData?.trend?.charAt(0)?.toUpperCase() + currentData?.trend?.slice(1)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Trend</div>
          </div>
        </div>
      </div>
      {/* Detailed Metrics */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {currentData?.details?.map((item, index) => (
            <div
              key={index}
              className="p-4 bg-muted/20 rounded-lg border border-border hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-secondary/20 rounded-lg">
                    <Icon name="Car" size={20} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{item?.vehicle}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item?.status)}`}>
                        <Icon name={getStatusIcon(item?.status)} size={12} className="inline mr-1" />
                        {item?.status?.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(item?.vehicle)}
                  iconName="ExternalLink"
                  title="View details"
                />
              </div>

              {/* Metric-specific data */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {metricType === 'response-times' && (
                  <>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-foreground">{item?.avgTime}</div>
                      <div className="text-xs text-muted-foreground">Avg Response</div>
                    </div>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-primary">{item?.calls}</div>
                      <div className="text-xs text-muted-foreground">Total Calls</div>
                    </div>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-success">
                        {item?.avgTime < '6.0 min' ? '🏆' : item?.avgTime < '8.0 min' ? '✅' : '⚠️'}
                      </div>
                      <div className="text-xs text-muted-foreground">Performance</div>
                    </div>
                  </>
                )}

                {metricType === 'fuel-usage' && (
                  <>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-foreground">{item?.usage}</div>
                      <div className="text-xs text-muted-foreground">Fuel Efficiency</div>
                    </div>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-warning">{item?.cost}</div>
                      <div className="text-xs text-muted-foreground">Monthly Cost</div>
                    </div>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-success">
                        {parseFloat(item?.usage) > 13 ? '🏆' : parseFloat(item?.usage) > 10 ? '✅' : '⚠️'}
                      </div>
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                    </div>
                  </>
                )}

                {metricType === 'maintenance' && (
                  <>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-foreground">{item?.uptime}</div>
                      <div className="text-xs text-muted-foreground">Uptime</div>
                    </div>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className={`text-lg font-bold ${item?.nextService === 'overdue' ? 'text-destructive' : 'text-success'}`}>
                        {item?.nextService}
                      </div>
                      <div className="text-xs text-muted-foreground">Next Service</div>
                    </div>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-success">
                        {parseFloat(item?.uptime) > 98 ? '🏆' : parseFloat(item?.uptime) > 95 ? '✅' : '⚠️'}
                      </div>
                      <div className="text-xs text-muted-foreground">Health</div>
                    </div>
                  </>
                )}

                {metricType === 'utilization' && (
                  <>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-foreground">{item?.utilization}</div>
                      <div className="text-xs text-muted-foreground">Utilization</div>
                    </div>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-primary">{item?.hours}</div>
                      <div className="text-xs text-muted-foreground">Active Hours</div>
                    </div>
                    <div className="text-center p-2 bg-background/30 rounded">
                      <div className="text-lg font-bold text-success">
                        {parseFloat(item?.utilization) > 80 ? '🏆' : parseFloat(item?.utilization) > 70 ? '✅' : '⚠️'}
                      </div>
                      <div className="text-xs text-muted-foreground">Efficiency</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Performance Alerts */}
      <div className="p-4 border-t border-border bg-muted/10">
        <h4 className="text-sm font-semibold text-foreground mb-3">Performance Alerts</h4>
        <div className="space-y-2">
          <div className="flex items-center space-x-2 p-2 bg-warning/10 rounded border border-warning/20">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm text-foreground">AMB-04 maintenance overdue</span>
            <Button variant="ghost" size="sm" className="ml-auto">
              Schedule
            </Button>
          </div>
          <div className="flex items-center space-x-2 p-2 bg-success/10 rounded border border-success/20">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-foreground">All response times within target</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;