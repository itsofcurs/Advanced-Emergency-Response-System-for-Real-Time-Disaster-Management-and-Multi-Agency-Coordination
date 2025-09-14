import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReportGenerator = () => {
  const [selectedReportType, setSelectedReportType] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [selectedAgencies, setSelectedAgencies] = useState([]);
  const [reportFormat, setReportFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: 'performance',
      name: 'Performance Summary',
      description: 'Response times, resolution rates, and efficiency metrics',
      icon: 'TrendingUp',
      estimatedTime: '2-3 minutes'
    },
    {
      id: 'incident',
      name: 'Incident Analysis',
      description: 'Detailed breakdown of emergency incidents by type and severity',
      icon: 'AlertCircle',
      estimatedTime: '3-5 minutes'
    },
    {
      id: 'resource',
      name: 'Resource Utilization',
      description: 'Vehicle, personnel, and equipment usage statistics',
      icon: 'Activity',
      estimatedTime: '2-4 minutes'
    },
    {
      id: 'compliance',
      name: 'Compliance Report',
      description: 'Regulatory compliance and audit trail documentation',
      icon: 'Shield',
      estimatedTime: '5-7 minutes'
    },
    {
      id: 'budget',
      name: 'Budget Analysis',
      description: 'Cost analysis and budget allocation recommendations',
      icon: 'DollarSign',
      estimatedTime: '3-4 minutes'
    },
    {
      id: 'custom',
      name: 'Custom Report',
      description: 'Build a custom report with specific metrics and filters',
      icon: 'Settings',
      estimatedTime: '5-10 minutes'
    }
  ];

  const agencies = [
    { id: 'fire', name: 'Fire Department', color: 'text-warning' },
    { id: 'police', name: 'Police Department', color: 'text-secondary' },
    { id: 'medical', name: 'Medical Services', color: 'text-destructive' },
    { id: 'emergency', name: 'Emergency Management', color: 'text-primary' }
  ];

  const formats = [
    { value: 'pdf', label: 'PDF Document', icon: 'FileText' },
    { value: 'excel', label: 'Excel Spreadsheet', icon: 'Table' },
    { value: 'csv', label: 'CSV Data', icon: 'Download' }
  ];

  const recentReports = [
    {
      id: 1,
      name: 'Weekly Performance Summary',
      type: 'Performance Summary',
      generatedAt: '2025-09-14 03:15:00',
      size: '2.4 MB',
      format: 'PDF',
      status: 'completed'
    },
    {
      id: 2,
      name: 'September Incident Analysis',
      type: 'Incident Analysis',
      generatedAt: '2025-09-13 14:30:00',
      size: '5.1 MB',
      format: 'Excel',
      status: 'completed'
    },
    {
      id: 3,
      name: 'Resource Utilization Q3',
      type: 'Resource Utilization',
      generatedAt: '2025-09-12 09:45:00',
      size: '1.8 MB',
      format: 'PDF',
      status: 'completed'
    }
  ];

  const handleAgencyToggle = (agencyId) => {
    setSelectedAgencies(prev => 
      prev?.includes(agencyId) 
        ? prev?.filter(id => id !== agencyId)
        : [...prev, agencyId]
    );
  };

  const handleGenerateReport = async () => {
    if (!selectedReportType) return;
    
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      console.log('Report generated:', {
        type: selectedReportType,
        dateRange,
        agencies: selectedAgencies,
        format: reportFormat
      });
    }, 3000);
  };

  const handleDownloadReport = (reportId) => {
    console.log('Downloading report:', reportId);
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Report Generator</h3>
          <p className="text-sm text-muted-foreground">Generate comprehensive emergency response reports</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Report Configuration */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Select Report Type</h4>
            <div className="grid grid-cols-1 gap-3">
              {reportTypes?.map((type) => (
                <div
                  key={type?.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedReportType === type?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-muted-foreground'
                  }`}
                  onClick={() => setSelectedReportType(type?.id)}
                >
                  <div className="flex items-start space-x-3">
                    <Icon name={type?.icon} size={20} className="text-primary mt-1" />
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{type?.name}</h5>
                      <p className="text-sm text-muted-foreground mt-1">{type?.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-muted-foreground">
                        <span>Est. time: {type?.estimatedTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Start Date"
              type="date"
              value={dateRange?.start}
              onChange={(e) => setDateRange(prev => ({ ...prev, start: e?.target?.value }))}
            />
            <Input
              label="End Date"
              type="date"
              value={dateRange?.end}
              onChange={(e) => setDateRange(prev => ({ ...prev, end: e?.target?.value }))}
            />
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Include Agencies</h4>
            <div className="space-y-2">
              {agencies?.map((agency) => (
                <label key={agency?.id} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAgencies?.includes(agency?.id)}
                    onChange={() => handleAgencyToggle(agency?.id)}
                    className="w-4 h-4 text-primary bg-background border-border rounded focus:ring-primary"
                  />
                  <span className={`text-sm font-medium ${agency?.color}`}>{agency?.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">Export Format</h4>
            <div className="flex space-x-2">
              {formats?.map((format) => (
                <Button
                  key={format?.value}
                  variant={reportFormat === format?.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setReportFormat(format?.value)}
                  iconName={format?.icon}
                  iconPosition="left"
                >
                  {format?.label}
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button
              variant="default"
              size="lg"
              onClick={handleGenerateReport}
              disabled={!selectedReportType || isGenerating}
              loading={isGenerating}
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              {isGenerating ? 'Generating Report...' : 'Generate Report'}
            </Button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Recent Reports</h4>
            <div className="space-y-3">
              {recentReports?.map((report) => (
                <div key={report?.id} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{report?.name}</h5>
                      <p className="text-sm text-muted-foreground">{report?.type}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDownloadReport(report?.id)}
                        title="Download Report"
                      >
                        <Icon name="Download" size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-xs text-muted-foreground">
                    <div>
                      <span className="block">Generated</span>
                      <span className="font-medium text-foreground">
                        {formatDateTime(report?.generatedAt)}
                      </span>
                    </div>
                    <div>
                      <span className="block">Size</span>
                      <span className="font-medium text-foreground">{report?.size}</span>
                    </div>
                    <div>
                      <span className="block">Format</span>
                      <span className="font-medium text-foreground">{report?.format}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Icon name="Info" size={16} className="text-primary" />
              <h5 className="text-sm font-semibold text-foreground">Report Guidelines</h5>
            </div>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li>• Reports are generated in real-time with current data</li>
              <li>• Large date ranges may take longer to process</li>
              <li>• Custom reports allow advanced filtering options</li>
              <li>• All reports include audit trail information</li>
              <li>• Compliance reports meet regulatory standards</li>
            </ul>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <h5 className="text-sm font-semibold text-foreground">Scheduled Reports</h5>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Set up automated report generation for regular monitoring
            </p>
            <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
              Schedule Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;