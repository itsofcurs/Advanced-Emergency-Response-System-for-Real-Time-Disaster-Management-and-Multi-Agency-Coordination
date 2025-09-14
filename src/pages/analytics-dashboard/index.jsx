import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsOverview from './components/MetricsOverview';
import ResponseTimeChart from './components/ResponseTimeChart';
import IncidentVolumeChart from './components/IncidentVolumeChart';
import ResourceUtilizationChart from './components/ResourceUtilizationChart';
import GeographicHeatmap from './components/GeographicHeatmap';
import ReportGenerator from './components/ReportGenerator';
import PredictiveAnalytics from './components/PredictiveAnalytics';

const AnalyticsDashboard = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('7d');
  const [refreshing, setRefreshing] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'performance', label: 'Performance', icon: 'TrendingUp' },
    { id: 'geographic', label: 'Geographic', icon: 'Map' },
    { id: 'predictive', label: 'Predictive', icon: 'Brain' },
    { id: 'reports', label: 'Reports', icon: 'FileText' }
  ];

  const dateRanges = [
    { value: '24h', label: '24 Hours' },
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const quickActions = [
    {
      label: 'Generate Report',
      icon: 'Download',
      variant: 'default',
      action: () => setActiveTab('reports')
    },
    {
      label: 'Export Data',
      icon: 'Share',
      variant: 'outline',
      action: () => console.log('Export data')
    },
    {
      label: 'Schedule Analysis',
      icon: 'Calendar',
      variant: 'outline',
      action: () => console.log('Schedule analysis')
    },
    {
      label: 'Share Dashboard',
      icon: 'Users',
      variant: 'outline',
      action: () => console.log('Share dashboard')
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <MetricsOverview />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <ResponseTimeChart />
              <IncidentVolumeChart />
            </div>
            <ResourceUtilizationChart />
          </div>
        );
      case 'performance':
        return (
          <div className="space-y-8">
            <ResponseTimeChart />
            <IncidentVolumeChart />
            <ResourceUtilizationChart />
          </div>
        );
      case 'geographic':
        return (
          <div className="space-y-8">
            <GeographicHeatmap />
            <MetricsOverview />
          </div>
        );
      case 'predictive':
        return (
          <div className="space-y-8">
            <PredictiveAnalytics />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              <ResponseTimeChart />
              <ResourceUtilizationChart />
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-8">
            <ReportGenerator />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        isMenuOpen={!sidebarCollapsed}
      />
      <Sidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <main className={`transition-all duration-200 ${
        sidebarCollapsed ? 'ml-16' : 'ml-sidebar'
      } mt-header min-h-[calc(100vh-4rem)]`}>
        <div className="p-6 max-w-[1600px] mx-auto">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon name="BarChart3" size={28} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
                <p className="text-muted-foreground">
                  Comprehensive emergency response performance metrics and insights
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2">
                {dateRanges?.map((range) => (
                  <Button
                    key={range?.value}
                    variant={dateRange === range?.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setDateRange(range?.value)}
                  >
                    {range?.label}
                  </Button>
                ))}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                loading={refreshing}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              {tabs?.map((tab) => (
                <Button
                  key={tab?.id}
                  variant={activeTab === tab?.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveTab(tab?.id)}
                  iconName={tab?.icon}
                  iconPosition="left"
                >
                  {tab?.label}
                </Button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {quickActions?.map((action, index) => (
                <Button
                  key={index}
                  variant={action?.variant}
                  size="sm"
                  onClick={action?.action}
                  iconName={action?.icon}
                  iconPosition="left"
                >
                  {action?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {renderTabContent()}
          </div>

          {/* Quick Navigation */}
          <div className="mt-12 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Icon name="Navigation" size={20} className="text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Quick Navigation</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate('/emergency-dashboard')}
                iconName="LayoutDashboard"
                iconPosition="left"
                fullWidth
              >
                Dashboard
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate('/incident-management')}
                iconName="AlertCircle"
                iconPosition="left"
                fullWidth
              >
                Incidents
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate('/emergency-call-processing')}
                iconName="Phone"
                iconPosition="left"
                fullWidth
              >
                Call Center
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate('/vehicle-tracking')}
                iconName="Truck"
                iconPosition="left"
                fullWidth
              >
                Vehicles
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigate('/hospital-coordination')}
                iconName="Building2"
                iconPosition="left"
                fullWidth
              >
                Hospitals
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setActiveTab('overview')}
                iconName="BarChart3"
                iconPosition="left"
                fullWidth
              >
                Analytics
              </Button>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-border text-center">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
                  <span className="text-sm text-success font-medium">System Operational</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  Last updated: {new Date()?.toLocaleTimeString()}
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Emergency Response System. All rights reserved.
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsDashboard;