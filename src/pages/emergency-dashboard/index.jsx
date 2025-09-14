import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import StatusMetrics from './components/StatusMetrics';
import InteractiveMap from './components/InteractiveMap';
import ActiveIncidentsPanel from './components/ActiveIncidentsPanel';
import QuickActions from './components/QuickActions';
import SystemStatus from './components/SystemStatus';

const EmergencyDashboard = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  // Mock real-time metrics data
  const [metrics, setMetrics] = useState({
    activeIncidents: 7,
    availableUnits: 23,
    avgResponseTime: 4.2,
    criticalAlerts: 2
  });

  // Mock incidents data
  const [incidents] = useState([
    {
      id: 'INC-2025-001',
      type: 'Medical Emergency',
      location: '1247 Broadway Ave, Manhattan',
      severity: 'critical',
      timeElapsed: '3m 45s',
      assignedUnits: 2,
      distance: '0.8 mi',
      status: 'active',
      description: 'Cardiac arrest reported, CPR in progress'
    },
    {
      id: 'INC-2025-002',
      type: 'Traffic Accident',
      location: 'I-95 Northbound, Mile Marker 47',
      severity: 'high',
      timeElapsed: '8m 12s',
      assignedUnits: 3,
      distance: '2.1 mi',
      status: 'active',
      description: 'Multi-vehicle collision, possible injuries'
    },
    {
      id: 'INC-2025-003',
      type: 'Fire Emergency',
      location: '892 Oak Street, Brooklyn',
      severity: 'critical',
      timeElapsed: '12m 33s',
      assignedUnits: 4,
      distance: '1.5 mi',
      status: 'active',
      description: 'Structure fire, residents evacuating'
    },
    {
      id: 'INC-2025-004',
      type: 'Police Incident',
      location: 'Central Park, 5th Avenue Entrance',
      severity: 'medium',
      timeElapsed: '15m 07s',
      assignedUnits: 2,
      distance: '0.6 mi',
      status: 'active',
      description: 'Disturbance reported, crowd gathering'
    },
    {
      id: 'INC-2025-005',
      type: 'Medical Emergency',
      location: '456 Pine Street, Queens',
      severity: 'high',
      timeElapsed: '6m 28s',
      assignedUnits: 1,
      distance: '3.2 mi',
      status: 'active',
      description: 'Severe allergic reaction, EpiPen administered'
    }
  ]);

  // Mock vehicles data
  const [vehicles] = useState([
    { id: 'AMB-001', type: 'ambulance', status: 'available', location: 'Station 1' },
    { id: 'AMB-002', type: 'ambulance', status: 'dispatched', location: 'En route to INC-2025-001' },
    { id: 'FIRE-001', type: 'fire', status: 'busy', location: 'INC-2025-003' },
    { id: 'FIRE-002', type: 'fire', status: 'available', location: 'Station 3' },
    { id: 'POL-001', type: 'police', status: 'dispatched', location: 'En route to INC-2025-004' },
    { id: 'POL-002', type: 'police', status: 'available', location: 'Patrol Zone 2' }
  ]);

  // Mock system status data
  const [systemData] = useState({
    systemHealth: 'Operational',
    database: 'Online',
    communication: 'Active',
    gpsTracking: 'Online'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        avgResponseTime: +(Math.random() * 2 + 3)?.toFixed(1)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleIncidentSelect = (incident) => {
    setSelectedIncident(incident);
    console.log('Selected incident:', incident);
  };

  const handleCreateIncident = () => {
    navigate('/incident-management');
  };

  const handleEmergencyAlert = () => {
    console.log('Emergency alert broadcasted system-wide');
    // In real implementation, this would trigger WebSocket broadcast
  };

  const handleDispatchOptimize = () => {
    console.log('AI dispatch optimization initiated');
    // In real implementation, this would call AI optimization service
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={handleSidebarToggle} isMenuOpen={!isSidebarCollapsed} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      <main className={`pt-header transition-all duration-200 ${
        isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-sidebar'
      }`}>
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Emergency Command Center</h1>
              <p className="text-muted-foreground mt-1">
                Real-time incident monitoring and response coordination
              </p>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
              <span>Live Updates Active</span>
              <span>•</span>
              <span>{new Date()?.toLocaleString()}</span>
            </div>
          </div>

          {/* Status Metrics */}
          <StatusMetrics metrics={metrics} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Map and Incidents - Takes 2 columns on xl screens */}
            <div className="xl:col-span-2 space-y-6">
              <InteractiveMap
                incidents={incidents}
                vehicles={vehicles}
                onIncidentSelect={handleIncidentSelect}
                onCreateIncident={handleCreateIncident}
              />
              <ActiveIncidentsPanel
                incidents={incidents}
                onIncidentSelect={handleIncidentSelect}
                onDispatchOptimize={handleDispatchOptimize}
              />
            </div>

            {/* Side Panel - Takes 1 column on xl screens */}
            <div className="space-y-6">
              <QuickActions
                onCreateIncident={handleCreateIncident}
                onEmergencyAlert={handleEmergencyAlert}
                onDispatchOptimize={handleDispatchOptimize}
              />
              <SystemStatus systemData={systemData} />
            </div>
          </div>

          {/* Selected Incident Details */}
          {selectedIncident && (
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Incident Details</h3>
                <button
                  onClick={() => setSelectedIncident(null)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Incident ID</p>
                  <p className="font-medium text-foreground">{selectedIncident?.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Type</p>
                  <p className="font-medium text-foreground">{selectedIncident?.type}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Severity</p>
                  <p className="font-medium text-foreground capitalize">{selectedIncident?.severity}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Time Elapsed</p>
                  <p className="font-medium text-foreground">{selectedIncident?.timeElapsed}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium text-foreground">{selectedIncident?.location}</p>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground">Description</p>
                <p className="text-foreground">{selectedIncident?.description}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EmergencyDashboard;