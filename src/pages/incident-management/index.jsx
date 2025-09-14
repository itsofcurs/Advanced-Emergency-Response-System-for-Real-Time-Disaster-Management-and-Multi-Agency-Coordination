import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import IncidentDetailsForm from './components/IncidentDetailsForm';
import ResourceAssignmentPanel from './components/ResourceAssignmentPanel';
import IncidentTimeline from './components/IncidentTimeline';
import HospitalCoordinationSection from './components/HospitalCoordinationSection';
import CommunicationPanel from './components/CommunicationPanel';
import IncidentActions from './components/IncidentActions';

const IncidentManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [currentIncident, setCurrentIncident] = useState({
    id: '2024-001',
    location: '5th Street & Main Avenue',
    type: 'traffic',
    severity: 'high',
    status: 'in-progress',
    description: 'Multi-vehicle collision with reported injuries. Two cars involved, blocking traffic in both directions.',
    callerName: 'Jennifer Martinez',
    callerPhone: '555-0123',
    coordinates: '40.7128, -74.0060',
    createdAt: new Date(Date.now() - 1800000),
    assignedUnits: ['POL-205', 'AMB-001', 'FIRE-12']
  });

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleIncidentUpdate = (updatedData) => {
    setCurrentIncident(prev => ({ ...prev, ...updatedData }));
  };

  const handleSaveIncident = (incidentData) => {
    console.log('Saving incident:', incidentData);
    // Save logic here
  };

  const handleAssignResource = (resource) => {
    console.log('Assigning resource:', resource);
    // Resource assignment logic here
  };

  const handleOptimizeDispatch = () => {
    console.log('Optimizing dispatch');
    // Dispatch optimization logic here
  };

  const handleAlertHospital = (hospital) => {
    console.log('Alerting hospital:', hospital);
    // Hospital alert logic here
  };

  const handleRequestBeds = (hospital, bedType) => {
    console.log('Requesting beds:', hospital, bedType);
    // Bed request logic here
  };

  const handleSendMessage = (message) => {
    console.log('Sending message:', message);
    // Message sending logic here
  };

  const handleDispatchUnits = () => {
    console.log('Dispatching units');
    // Unit dispatch logic here
  };

  const handleUpdateStatus = (status, note) => {
    console.log('Updating status:', status, note);
    setCurrentIncident(prev => ({ ...prev, status }));
  };

  const handleRequestBackup = () => {
    console.log('Requesting backup');
    // Backup request logic here
  };

  const handleCloseIncident = () => {
    console.log('Closing incident');
    setCurrentIncident(prev => ({ ...prev, status: 'closed' }));
  };

  const tabs = [
    { id: 'details', label: 'Incident Details', icon: 'FileText' },
    { id: 'resources', label: 'Resources', icon: 'Users' },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' },
    { id: 'hospital', label: 'Hospitals', icon: 'Building2' },
    { id: 'communication', label: 'Communications', icon: 'MessageSquare' },
    { id: 'actions', label: 'Actions', icon: 'Settings' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <IncidentDetailsForm
            incident={currentIncident}
            onUpdate={handleIncidentUpdate}
            onSave={handleSaveIncident}
          />
        );
      case 'resources':
        return (
          <ResourceAssignmentPanel
            onAssignResource={handleAssignResource}
            onOptimizeDispatch={handleOptimizeDispatch}
          />
        );
      case 'timeline':
        return <IncidentTimeline incidentId={currentIncident?.id} />;
      case 'hospital':
        return (
          <HospitalCoordinationSection
            onAlertHospital={handleAlertHospital}
            onRequestBeds={handleRequestBeds}
          />
        );
      case 'communication':
        return (
          <CommunicationPanel
            incidentId={currentIncident?.id}
            onSendMessage={handleSendMessage}
          />
        );
      case 'actions':
        return (
          <IncidentActions
            incident={currentIncident}
            onDispatchUnits={handleDispatchUnits}
            onUpdateStatus={handleUpdateStatus}
            onRequestBackup={handleRequestBackup}
            onCloseIncident={handleCloseIncident}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isMenuOpen={!sidebarCollapsed} />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
      <main className={`pt-header transition-all duration-200 ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-sidebar'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/emergency-dashboard')}
                className="lg:hidden"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-emergency-xl font-bold text-foreground">
                  Incident Management
                </h1>
                <p className="text-emergency-md text-muted-foreground">
                  Coordinate emergency response for incident #{currentIncident?.id}
                </p>
              </div>
            </div>

            {/* Quick Status */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-emergency-sm font-medium text-foreground">
                  {currentIncident?.location}
                </div>
                <div className="text-emergency-xs text-muted-foreground">
                  Created: {currentIncident?.createdAt?.toLocaleString()}
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-emergency-sm font-medium ${
                currentIncident?.severity === 'critical' ? 'bg-destructive/10 text-destructive' :
                currentIncident?.severity === 'high' ? 'bg-primary/10 text-primary' :
                currentIncident?.severity === 'medium'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
              }`}>
                {currentIncident?.severity?.toUpperCase()} PRIORITY
              </div>
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          {isMobile && (
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                      activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span className="text-emergency-sm font-medium">{tab?.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Desktop Layout */}
          {!isMobile ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                <IncidentDetailsForm
                  incident={currentIncident}
                  onUpdate={handleIncidentUpdate}
                  onSave={handleSaveIncident}
                />
                <ResourceAssignmentPanel
                  onAssignResource={handleAssignResource}
                  onOptimizeDispatch={handleOptimizeDispatch}
                />
                <HospitalCoordinationSection
                  onAlertHospital={handleAlertHospital}
                  onRequestBeds={handleRequestBeds}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                <IncidentTimeline incidentId={currentIncident?.id} />
                <CommunicationPanel
                  incidentId={currentIncident?.id}
                  onSendMessage={handleSendMessage}
                />
                <IncidentActions
                  incident={currentIncident}
                  onDispatchUnits={handleDispatchUnits}
                  onUpdateStatus={handleUpdateStatus}
                  onRequestBackup={handleRequestBackup}
                  onCloseIncident={handleCloseIncident}
                />
              </div>
            </div>
          ) : (
            /* Mobile Layout - Single Column with Tabs */
            (<div className="space-y-6">
              {renderTabContent()}
            </div>)
          )}

          {/* Emergency Actions Bar */}
          <div className="fixed bottom-6 right-6 flex items-center space-x-3">
            <Button
              variant="destructive"
              size="lg"
              onClick={() => console.log('Emergency escalation')}
              iconName="Siren"
              className="animate-emergency-pulse shadow-emergency"
            >
              Emergency Escalation
            </Button>
            <Button
              variant="warning"
              size="lg"
              onClick={() => navigate('/vehicle-tracking')}
              iconName="MapPin"
            >
              Track Units
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IncidentManagement;