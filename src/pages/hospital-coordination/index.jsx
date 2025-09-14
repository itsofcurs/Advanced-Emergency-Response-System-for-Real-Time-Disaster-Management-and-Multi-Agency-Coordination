import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import HospitalStatusCard from './components/HospitalStatusCard';
import PatientIntakePanel from './components/PatientIntakePanel';
import MedicalTeamAlerts from './components/MedicalTeamAlerts';
import ResourceAllocation from './components/ResourceAllocation';
import CommunicationPanel from './components/CommunicationPanel';

const HospitalCoordination = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [refreshTime, setRefreshTime] = useState(new Date());

  // Mock data for hospitals
  const [hospitals] = useState([
    {
      id: 1,
      name: "City General Hospital",
      address: "123 Medical Center Dr",
      status: "operational",
      edCapacity: 75,
      icuCapacity: 90,
      traumaCapacity: 60,
      pediatricCapacity: 45,
      edBeds: { available: 8, total: 32 },
      icuBeds: { available: 2, total: 20 },
      traumaBeds: { available: 4, total: 10 },
      pediatricBeds: { available: 11, total: 20 },
      staffCount: 145,
      avgWaitTime: 25,
      lastUpdated: "2 min ago"
    },
    {
      id: 2,
      name: "Regional Medical Center",
      address: "456 Healthcare Blvd",
      status: "limited",
      edCapacity: 95,
      icuCapacity: 85,
      traumaCapacity: 100,
      pediatricCapacity: 70,
      edBeds: { available: 2, total: 40 },
      icuBeds: { available: 3, total: 24 },
      traumaBeds: { available: 0, total: 8 },
      pediatricBeds: { available: 6, total: 18 },
      staffCount: 189,
      avgWaitTime: 45,
      lastUpdated: "1 min ago"
    },
    {
      id: 3,
      name: "Metro Emergency Hospital",
      address: "789 Emergency Way",
      status: "operational",
      edCapacity: 65,
      icuCapacity: 70,
      traumaCapacity: 80,
      pediatricCapacity: 55,
      edBeds: { available: 12, total: 35 },
      icuBeds: { available: 6, total: 18 },
      traumaBeds: { available: 2, total: 12 },
      pediatricBeds: { available: 9, total: 16 },
      staffCount: 167,
      avgWaitTime: 18,
      lastUpdated: "3 min ago"
    }
  ]);

  // Mock data for incoming patients
  const [patients] = useState([
    {
      id: 1,
      age: 45,
      gender: "Male",
      condition: "Chest Pain",
      severity: "critical",
      eta: 3,
      distance: 2.1,
      ambulanceId: "A-101",
      crew: "Paramedic Team Alpha",
      requirements: ["Cardiology", "ICU", "Cardiac Cath Lab"],
      complaint: "Severe chest pain with radiation to left arm, diaphoresis, and shortness of breath. Patient has history of hypertension and diabetes.",
      vitals: {
        bloodPressure: "180/110",
        heartRate: 95,
        oxygenSat: 92,
        temperature: 98.6
      }
    },
    {
      id: 2,
      age: 8,
      gender: "Female",
      condition: "Respiratory Distress",
      severity: "urgent",
      eta: 7,
      distance: 4.3,
      ambulanceId: "A-205",
      crew: "Pediatric Response Team",
      requirements: ["Pediatric ED", "Respiratory Therapy", "Pediatric ICU"],
      complaint: "Child presenting with severe asthma exacerbation, not responding to home nebulizer treatments. Mother reports increased work of breathing.",
      vitals: {
        bloodPressure: "95/60",
        heartRate: 140,
        oxygenSat: 88,
        temperature: 99.2
      }
    },
    {
      id: 3,
      age: 67,
      gender: "Female",
      condition: "Fall Injury",
      severity: "stable",
      eta: 12,
      distance: 6.8,
      ambulanceId: "A-312",
      crew: "Basic Life Support Unit",
      requirements: ["Orthopedics", "Radiology", "General ED"],
      complaint: "Elderly patient fell at home, possible hip fracture. Alert and oriented, stable vital signs. No loss of consciousness reported."
    }
  ]);

  // Mock data for medical teams
  const [medicalTeams] = useState([
    {
      id: 1,
      name: "Emergency Medicine Team A",
      specialty: "Emergency Medicine",
      status: "available",
      members: [
        { name: "Dr. Sarah Chen", role: "Attending Physician" },
        { name: "Dr. Michael Rodriguez", role: "Resident" },
        { name: "Nurse Jennifer Walsh", role: "RN" },
        { name: "Nurse David Kim", role: "RN" }
      ],
      activeCases: 3,
      avgResponseTime: 4,
      currentLocation: "ED Bay 1-4",
      recentAlerts: [
        {
          id: 1,
          teamName: "Emergency Medicine Team A",
          priority: "urgent",
          message: "Incoming trauma patient, ETA 5 minutes",
          timestamp: "2 min ago",
          status: "acknowledged"
        }
      ]
    },
    {
      id: 2,
      name: "Cardiology Response Team",
      specialty: "Cardiology",
      status: "busy",
      members: [
        { name: "Dr. Robert Johnson", role: "Cardiologist" },
        { name: "Dr. Lisa Park", role: "Fellow" },
        { name: "Tech Amanda Foster", role: "Cardiac Tech" }
      ],
      activeCases: 2,
      avgResponseTime: 8,
      currentLocation: "Cardiac Cath Lab",
      recentAlerts: [
        {
          id: 2,
          teamName: "Cardiology Response Team",
          priority: "critical",
          message: "STEMI alert - patient arriving in 3 minutes",
          timestamp: "5 min ago",
          status: "read"
        }
      ]
    },
    {
      id: 3,
      name: "Pediatric Emergency Team",
      specialty: "Pediatrics",
      status: "available",
      members: [
        { name: "Dr. Emily Watson", role: "Pediatric Emergency Physician" },
        { name: "Nurse Maria Santos", role: "Pediatric RN" },
        { name: "Nurse James Wilson", role: "Pediatric RN" }
      ],
      activeCases: 1,
      avgResponseTime: 6,
      currentLocation: "Pediatric ED",
      recentAlerts: []
    },
    {
      id: 4,
      name: "Trauma Surgery Team",
      specialty: "Trauma Surgery",
      status: "available",
      members: [
        { name: "Dr. Mark Thompson", role: "Trauma Surgeon" },
        { name: "Dr. Rachel Green", role: "Surgery Resident" },
        { name: "Nurse Kevin Brown", role: "OR Nurse" },
        { name: "Tech Susan Davis", role: "Surgical Tech" }
      ],
      activeCases: 0,
      avgResponseTime: 12,
      currentLocation: "OR 3",
      recentAlerts: []
    }
  ]);

  // Mock data for resources
  const [resources] = useState([
    {
      id: 1,
      name: "Ventilators",
      category: "equipment",
      available: 8,
      total: 15,
      status: "available",
      location: "ICU Equipment Room",
      details: {
        model: "Hamilton G5",
        lastCalibrated: "2025-01-10",
        batteryStatus: "100%"
      },
      nextMaintenance: "2025-01-20",
      reservations: [
        { patient: "John Doe", time: "14:30" },
        { patient: "Jane Smith", time: "16:00" }
      ]
    },
    {
      id: 2,
      name: "O-Negative Blood",
      category: "blood",
      available: 12,
      total: 25,
      status: "limited",
      location: "Blood Bank",
      details: {
        expirationDate: "2025-01-25",
        donorCount: 8,
        lastDelivery: "2025-01-12"
      },
      nextMaintenance: null,
      reservations: []
    },
    {
      id: 3,
      name: "Operating Room 1",
      category: "operating",
      available: 1,
      total: 1,
      status: "available",
      location: "Surgical Suite",
      details: {
        equipment: "Fully equipped",
        sterileStatus: "Ready",
        lastCleaning: "06:00"
      },
      nextMaintenance: "2025-01-16",
      reservations: [
        { patient: "Emergency Surgery", time: "15:00" }
      ]
    },
    {
      id: 4,
      name: "Cardiac Monitors",
      category: "equipment",
      available: 18,
      total: 24,
      status: "available",
      location: "Cardiac Unit",
      details: {
        model: "Philips IntelliVue",
        connectivity: "Wireless",
        batteryLife: "8 hours"
      },
      nextMaintenance: "2025-01-18",
      reservations: []
    },
    {
      id: 5,
      name: "Morphine 10mg",
      category: "pharmacy",
      available: 45,
      total: 100,
      status: "available",
      location: "Emergency Pharmacy",
      details: {
        dosageForm: "Injectable",
        concentration: "10mg/mL",
        controlledSubstance: "Schedule II"
      },
      nextMaintenance: null,
      reservations: []
    },
    {
      id: 6,
      name: "CT Scanner",
      category: "equipment",
      available: 0,
      total: 1,
      status: "maintenance",
      location: "Radiology Department",
      details: {
        model: "GE Revolution",
        issue: "Calibration required",
        technicianAssigned: "Mike Johnson"
      },
      nextMaintenance: "2025-01-15",
      reservations: []
    }
  ]);

  // Mock data for communication messages
  const [messages] = useState([
    {
      id: 1,
      sender: "Dr. Sarah Chen",
      recipient: "EMS Crews",
      type: "medical",
      content: "Please be advised that our trauma bay is currently at capacity. Consider diverting non-critical trauma cases to Regional Medical Center.",
      timestamp: "2025-01-14T10:15:00Z",
      language: "en",
      attachments: [],
      replies: [
        {
          sender: "Unit A-101",
          content: "Copy that, will divert to Regional for stable trauma patient.",
          timestamp: "2025-01-14T10:17:00Z"
        }
      ]
    },
    {
      id: 2,
      sender: "Dispatch Center",
      recipient: "All Teams",
      type: "urgent",
      content: "Mass casualty incident reported on I-95. Multiple units responding. Hospitals prepare for potential surge.",
      timestamp: "2025-01-14T09:45:00Z",
      language: "en",
      attachments: [
        { name: "incident_map.pdf", size: "2.3MB" }
      ],
      replies: []
    },
    {
      id: 3,
      sender: "Nurse Manager",
      recipient: "Hospital Staff",
      type: "resource",
      content: "Blood bank supplies running low on O-negative. Please use judiciously and consider alternatives when appropriate.",
      timestamp: "2025-01-14T08:30:00Z",
      language: "en",
      attachments: [],
      replies: [
        {
          sender: "Dr. Johnson",
          content: "Understood. Will coordinate with blood bank for emergency delivery.",
          timestamp: "2025-01-14T08:35:00Z"
        }
      ]
    }
  ]);

  const tabs = [
    { id: 'overview', label: 'Hospital Overview', icon: 'Building2' },
    { id: 'patients', label: 'Patient Intake', icon: 'Ambulance' },
    { id: 'teams', label: 'Medical Teams', icon: 'Users' },
    { id: 'resources', label: 'Resources', icon: 'Package' },
    { id: 'communication', label: 'Communication', icon: 'MessageSquare' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshTime(new Date());
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const handleReserveBed = (patient) => {
    console.log('Reserving bed for patient:', patient);
    // Implementation for bed reservation
  };

  const handleUpdatePatient = (patient) => {
    console.log('Updating patient:', patient);
    // Implementation for patient update
  };

  const handleAlertTeam = (alertData) => {
    console.log('Alerting medical team:', alertData);
    // Implementation for team alert
  };

  const handleEscalateAlert = (alertData) => {
    console.log('Escalating alert:', alertData);
    // Implementation for alert escalation
  };

  const handleUpdateResource = (resource) => {
    console.log('Updating resource:', resource);
    // Implementation for resource update
  };

  const handleReserveResource = (resource) => {
    console.log('Reserving resource:', resource);
    // Implementation for resource reservation
  };

  const handleSendMessage = (messageData) => {
    console.log('Sending message:', messageData);
    // Implementation for sending message
  };

  const handleTranslateMessage = (message, language) => {
    console.log('Translating message:', message, 'to', language);
    // Implementation for message translation
  };

  const handleEmergencyAlert = () => {
    console.log('Emergency alert triggered');
    // Implementation for emergency alert
  };

  const handleTransferPatient = () => {
    console.log('Patient transfer initiated');
    // Implementation for patient transfer
  };

  const handleUpdateCapacity = () => {
    console.log('Updating hospital capacity');
    // Implementation for capacity update
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
        <div className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Hospital Coordination</h1>
              <p className="text-muted-foreground">
                Real-time medical facility coordination and patient management
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={16} />
                <span>Last updated: {refreshTime?.toLocaleTimeString()}</span>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="destructive"
                  onClick={handleEmergencyAlert}
                  iconName="AlertTriangle"
                  iconPosition="left"
                  className="animate-emergency-pulse"
                >
                  Emergency Alert
                </Button>
                <Button
                  variant="default"
                  onClick={handleTransferPatient}
                  iconName="ArrowRightLeft"
                  iconPosition="left"
                >
                  Transfer Patient
                </Button>
                <Button
                  variant="outline"
                  onClick={handleUpdateCapacity}
                  iconName="RefreshCw"
                  iconPosition="left"
                >
                  Update Capacity
                </Button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {hospitals?.map((hospital) => (
                    <HospitalStatusCard key={hospital?.id} hospital={hospital} />
                  ))}
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                        <Icon name="Bed" size={24} color="white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {hospitals?.reduce((sum, h) => sum + h?.edBeds?.available, 0)}
                        </p>
                        <p className="text-sm text-muted-foreground">Available ED Beds</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-warning rounded-lg flex items-center justify-center">
                        <Icon name="Heart" size={24} color="white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {hospitals?.reduce((sum, h) => sum + h?.icuBeds?.available, 0)}
                        </p>
                        <p className="text-sm text-muted-foreground">Available ICU Beds</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                        <Icon name="Ambulance" size={24} color="white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">{patients?.length}</p>
                        <p className="text-sm text-muted-foreground">Incoming Patients</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-card border border-border rounded-lg p-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                        <Icon name="Users" size={24} color="white" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground">
                          {medicalTeams?.filter(t => t?.status === 'available')?.length}
                        </p>
                        <p className="text-sm text-muted-foreground">Available Teams</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'patients' && (
              <PatientIntakePanel
                patients={patients}
                onUpdatePatient={handleUpdatePatient}
                onReserveBed={handleReserveBed}
              />
            )}

            {activeTab === 'teams' && (
              <MedicalTeamAlerts
                teams={medicalTeams}
                onAlertTeam={handleAlertTeam}
                onEscalateAlert={handleEscalateAlert}
              />
            )}

            {activeTab === 'resources' && (
              <ResourceAllocation
                resources={resources}
                onUpdateResource={handleUpdateResource}
                onReserveResource={handleReserveResource}
              />
            )}

            {activeTab === 'communication' && (
              <CommunicationPanel
                messages={messages}
                onSendMessage={handleSendMessage}
                onTranslateMessage={handleTranslateMessage}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HospitalCoordination;