import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import VehicleMap from './components/VehicleMap';
import VehicleRoster from './components/VehicleRoster';
import DispatchQueue from './components/DispatchQueue';
import RouteOptimization from './components/RouteOptimization';
import PerformanceMetrics from './components/PerformanceMetrics';

const VehicleTracking = () => {
  const navigate = useNavigate();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [activeView, setActiveView] = useState('map');
  const [isLoading, setIsLoading] = useState(true);

  // Mock vehicle data
  const [vehicles] = useState([
    {
      id: 'amb-01',
      callSign: 'AMB-01',
      type: 'ambulance',
      status: 'available',
      crew: ['Sarah Johnson', 'Mike Rodriguez'],
      location: 'Station 1',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      assignedIncident: null,
      eta: null,
      priority: 'medium',
      fuelLevel: 85,
      lastUpdate: new Date(Date.now() - 300000), // 5 minutes ago
      estimatedArrival: '4 min'
    },
    {
      id: 'fire-03',
      callSign: 'FIRE-03',
      type: 'fire',
      status: 'dispatched',
      crew: ['Captain Davis', 'Lt. Wilson', 'FF Martinez'],
      location: 'En route to Main St',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      assignedIncident: 'INC-2024-0892',
      eta: '3 minutes',
      priority: 'high',
      fuelLevel: 72,
      lastUpdate: new Date(Date.now() - 120000), // 2 minutes ago
      estimatedArrival: '3 min'
    },
    {
      id: 'pol-07',
      callSign: 'POL-07',
      type: 'police',
      status: 'on-scene',
      crew: ['Officer Thompson', 'Officer Lee'],
      location: '5th Ave & Broadway',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      assignedIncident: 'INC-2024-0891',
      eta: 'On scene',
      priority: 'high',
      fuelLevel: 68,
      lastUpdate: new Date(Date.now() - 600000), // 10 minutes ago
      estimatedArrival: 'On scene'
    },
    {
      id: 'amb-04',
      callSign: 'AMB-04',
      type: 'ambulance',
      status: 'returning',
      crew: ['Dr. Chen', 'Paramedic Brown'],
      location: 'From General Hospital',
      coordinates: { lat: 40.7282, lng: -73.9942 },
      assignedIncident: 'INC-2024-0889',
      eta: '8 minutes to station',
      priority: 'low',
      fuelLevel: 45,
      lastUpdate: new Date(Date.now() - 180000), // 3 minutes ago
      estimatedArrival: '8 min'
    },
    {
      id: 'fire-01',
      callSign: 'FIRE-01',
      type: 'fire',
      status: 'out-of-service',
      crew: ['Captain Smith', 'FF Johnson'],
      location: 'Maintenance Bay',
      coordinates: { lat: 40.7614, lng: -73.9776 },
      assignedIncident: null,
      eta: null,
      priority: 'low',
      fuelLevel: 90,
      lastUpdate: new Date(Date.now() - 1800000), // 30 minutes ago
      estimatedArrival: 'N/A'
    },
    {
      id: 'pol-12',
      callSign: 'POL-12',
      type: 'police',
      status: 'available',
      crew: ['Sergeant Garcia', 'Officer Kim'],
      location: 'Patrol Zone 3',
      coordinates: { lat: 40.7831, lng: -73.9712 },
      assignedIncident: null,
      eta: null,
      priority: 'medium',
      fuelLevel: 78,
      lastUpdate: new Date(Date.now() - 900000), // 15 minutes ago
      estimatedArrival: '6 min'
    }
  ]);

  // Mock dispatch queue data
  const [pendingDispatches] = useState([
    {
      id: 'dispatch-001',
      incidentId: 'INC-2024-0893',
      type: 'medical',
      priority: 'critical',
      description: 'Cardiac arrest, 67-year-old male',
      location: '123 Oak Street, Apt 4B',
      reportedBy: 'Family member',
      timestamp: new Date(Date.now() - 180000), // 3 minutes ago
      requiredVehicleType: 'ambulance'
    },
    {
      id: 'dispatch-002',
      incidentId: 'INC-2024-0894',
      type: 'fire',
      priority: 'high',
      description: 'Structure fire, residential building',
      location: '456 Pine Avenue',
      reportedBy: 'Neighbor',
      timestamp: new Date(Date.now() - 420000), // 7 minutes ago
      requiredVehicleType: 'fire'
    },
    {
      id: 'dispatch-003',
      incidentId: 'INC-2024-0895',
      type: 'accident',
      priority: 'medium',
      description: 'Multi-vehicle accident, minor injuries',
      location: 'Highway 101 & Exit 15',
      reportedBy: 'State Police',
      timestamp: new Date(Date.now() - 600000), // 10 minutes ago
      requiredVehicleType: 'ambulance'
    }
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
  };

  const handleDispatchVehicle = (vehicle) => {
    console.log('Dispatching vehicle:', vehicle?.callSign);
    // Implementation for dispatching vehicle
  };

  const handleStatusUpdate = (vehicleId, newStatus) => {
    console.log('Updating vehicle status:', vehicleId, newStatus);
    // Implementation for status update
  };

  const handleAssignVehicle = (dispatchId, vehicleId) => {
    console.log('Assigning vehicle:', vehicleId, 'to dispatch:', dispatchId);
    // Implementation for vehicle assignment
  };

  const handleUpdatePriority = (dispatchId, newPriority) => {
    console.log('Updating dispatch priority:', dispatchId, newPriority);
    // Implementation for priority update
  };

  const handleRemoveFromQueue = (dispatchId) => {
    console.log('Removing from queue:', dispatchId);
    // Implementation for removing from queue
  };

  const handleRouteSelect = (route) => {
    console.log('Route selected:', route?.name);
    // Implementation for route selection
  };

  const handleNavigationStart = (route) => {
    console.log('Starting navigation:', route?.name);
    // Implementation for navigation start
  };

  const handleExportData = () => {
    console.log('Exporting performance data');
    // Implementation for data export
  };

  const handleViewDetails = (vehicleId) => {
    console.log('Viewing details for:', vehicleId);
    // Implementation for viewing vehicle details
  };

  const viewOptions = [
    { id: 'map', label: 'Live Map', icon: 'Map' },
    { id: 'roster', label: 'Vehicle Roster', icon: 'List' },
    { id: 'dispatch', label: 'Dispatch Queue', icon: 'Clock' },
    { id: 'routes', label: 'Route Optimization', icon: 'Navigation' },
    { id: 'metrics', label: 'Performance', icon: 'BarChart3' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-muted-foreground">Loading vehicle tracking system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <main className={`transition-all duration-200 ${isSidebarCollapsed ? 'ml-16' : 'ml-sidebar'} mt-header`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Vehicle Tracking</h1>
              <p className="text-muted-foreground mt-1">
                Real-time monitoring and coordination of emergency response vehicles
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg border border-success/20">
                <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
                <span className="text-sm text-success font-medium">
                  {vehicles?.filter(v => v?.status !== 'out-of-service')?.length} Active Units
                </span>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/incident-management')}
                iconName="AlertCircle"
                iconPosition="left"
              >
                View Incidents
              </Button>
              <Button
                variant="default"
                onClick={() => handleDispatchVehicle(vehicles?.find(v => v?.status === 'available'))}
                iconName="Send"
                iconPosition="left"
              >
                Quick Dispatch
              </Button>
            </div>
          </div>

          {/* View Selector */}
          <div className="flex items-center space-x-2 mb-6 p-1 bg-muted/20 rounded-lg">
            {viewOptions?.map((option) => (
              <button
                key={option?.id}
                onClick={() => setActiveView(option?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                  activeView === option?.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={option?.icon} size={16} />
                <span className="text-sm font-medium">{option?.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-280px)]">
            {/* Primary View */}
            <div className="lg:col-span-2">
              {activeView === 'map' && (
                <VehicleMap
                  vehicles={vehicles}
                  selectedVehicle={selectedVehicle}
                  onVehicleSelect={handleVehicleSelect}
                  onDispatchVehicle={handleDispatchVehicle}
                />
              )}
              {activeView === 'roster' && (
                <VehicleRoster
                  vehicles={vehicles}
                  onVehicleSelect={handleVehicleSelect}
                  onStatusUpdate={handleStatusUpdate}
                  onDispatchVehicle={handleDispatchVehicle}
                />
              )}
              {activeView === 'dispatch' && (
                <DispatchQueue
                  pendingDispatches={pendingDispatches}
                  availableVehicles={vehicles?.filter(v => v?.status === 'available')}
                  onAssignVehicle={handleAssignVehicle}
                  onUpdatePriority={handleUpdatePriority}
                  onRemoveFromQueue={handleRemoveFromQueue}
                />
              )}
              {activeView === 'routes' && (
                <RouteOptimization
                  selectedVehicle={selectedVehicle}
                  activeRoutes={[]}
                  trafficConditions={[]}
                  onRouteSelect={handleRouteSelect}
                  onNavigationStart={handleNavigationStart}
                />
              )}
              {activeView === 'metrics' && (
                <PerformanceMetrics
                  vehicles={vehicles}
                  responseData={[]}
                  onExportData={handleExportData}
                  onViewDetails={handleViewDetails}
                />
              )}
            </div>

            {/* Secondary Panel */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Fleet Status</h3>
                <div className="space-y-3">
                  {[
                    { status: 'available', count: vehicles?.filter(v => v?.status === 'available')?.length, color: 'text-success', icon: 'CheckCircle' },
                    { status: 'dispatched', count: vehicles?.filter(v => v?.status === 'dispatched')?.length, color: 'text-warning', icon: 'Clock' },
                    { status: 'on-scene', count: vehicles?.filter(v => v?.status === 'on-scene')?.length, color: 'text-primary', icon: 'MapPin' },
                    { status: 'returning', count: vehicles?.filter(v => v?.status === 'returning')?.length, color: 'text-secondary', icon: 'RotateCcw' },
                    { status: 'out-of-service', count: vehicles?.filter(v => v?.status === 'out-of-service')?.length, color: 'text-muted-foreground', icon: 'XCircle' }
                  ]?.map((stat) => (
                    <div key={stat?.status} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                      <div className="flex items-center space-x-2">
                        <Icon name={stat?.icon} size={16} className={stat?.color} />
                        <span className="text-sm text-foreground capitalize">
                          {stat?.status?.replace('-', ' ')}
                        </span>
                      </div>
                      <span className={`text-lg font-bold ${stat?.color}`}>{stat?.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { time: '2 min ago', action: 'FIRE-03 dispatched to Main St fire', type: 'dispatch', icon: 'Send' },
                    { time: '5 min ago', action: 'POL-07 arrived on scene', type: 'arrival', icon: 'MapPin' },
                    { time: '8 min ago', action: 'AMB-04 returning to station', type: 'return', icon: 'RotateCcw' },
                    { time: '12 min ago', action: 'AMB-01 status updated to available', type: 'status', icon: 'CheckCircle' }
                  ]?.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 bg-muted/20 rounded">
                      <div className="p-1 bg-primary/20 rounded">
                        <Icon name={activity?.icon} size={12} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground">{activity?.action}</p>
                        <p className="text-xs text-muted-foreground">{activity?.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Actions */}
              <div className="bg-card rounded-lg border border-border p-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="destructive"
                    fullWidth
                    iconName="AlertTriangle"
                    iconPosition="left"
                    className="animate-emergency-pulse"
                  >
                    Mass Casualty Alert
                  </Button>
                  <Button
                    variant="warning"
                    fullWidth
                    iconName="Radio"
                    iconPosition="left"
                  >
                    All Units Broadcast
                  </Button>
                  <Button
                    variant="outline"
                    fullWidth
                    iconName="Shield"
                    iconPosition="left"
                  >
                    Request Backup
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VehicleTracking;