import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CallTranscriptPanel from './components/CallTranscriptPanel';
import CallerInformationPanel from './components/CallerInformationPanel';
import AIAssistancePanel from './components/AIAssistancePanel';
import CallControlsPanel from './components/CallControlsPanel';
import QuickActionsPanel from './components/QuickActionsPanel';
import MultiLanguagePanel from './components/MultiLanguagePanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const EmergencyCallProcessing = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCallActive, setIsCallActive] = useState(true);
  const [extractedLocation, setExtractedLocation] = useState('');
  const [detectedIncidentType, setDetectedIncidentType] = useState('');
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [callStats, setCallStats] = useState({
    totalCalls: 47,
    activeCalls: 3,
    avgResponseTime: '2.3 min',
    priorityCalls: 2
  });

  // Simulate incoming call
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCallActive(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLocationExtracted = (location) => {
    setExtractedLocation(location);
    console.log('Location extracted:', location);
  };

  const handleIncidentTypeDetected = (incidentType) => {
    setDetectedIncidentType(incidentType);
    console.log('Incident type detected:', incidentType);
  };

  const handleRecommendationAccept = (recommendation) => {
    console.log('Recommendation accepted:', recommendation);
  };

  const handleCallStateChange = (active) => {
    setIsCallActive(active);
  };

  const handleEmergencyEscalation = () => {
    console.log('Emergency escalation triggered');
  };

  const handleIncidentCreate = (incidentData) => {
    console.log('Incident created:', incidentData);
  };

  const handleDispatch = (units) => {
    console.log('Units dispatched:', units);
  };

  const handleHospitalAlert = (hospital) => {
    console.log('Hospital alerted:', hospital);
  };

  const handleLanguageChange = (language) => {
    setActiveLanguage(language);
    console.log('Language changed to:', language);
  };

  const handleTranslationRequest = (translation) => {
    console.log('Translation requested:', translation);
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
      <main className={`pt-header transition-all duration-200 ${
        sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-sidebar'
      }`}>
        {/* Call Processing Header */}
        <div className="p-6 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={24} className="text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Emergency Call Processing</h1>
                  <p className="text-muted-foreground">Real-time call handling with AI assistance</p>
                </div>
              </div>
              
              {isCallActive && (
                <div className="flex items-center space-x-2 px-3 py-2 bg-success/20 text-success rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
                  <span className="font-medium">Call Active</span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-6">
              {/* Call Statistics */}
              <div className="hidden lg:flex items-center space-x-6">
                <div className="text-center">
                  <div className="font-mono text-xl font-bold text-primary">{callStats?.totalCalls}</div>
                  <div className="text-xs text-muted-foreground">Total Today</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-xl font-bold text-warning">{callStats?.activeCalls}</div>
                  <div className="text-xs text-muted-foreground">Active Now</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-xl font-bold text-success">{callStats?.avgResponseTime}</div>
                  <div className="text-xs text-muted-foreground">Avg Response</div>
                </div>
                <div className="text-center">
                  <div className="font-mono text-xl font-bold text-destructive">{callStats?.priorityCalls}</div>
                  <div className="text-xs text-muted-foreground">Priority</div>
                </div>
              </div>

              <Button
                variant="destructive"
                iconName="AlertTriangle"
                iconPosition="left"
                className="animate-emergency-pulse"
              >
                Emergency Override
              </Button>
            </div>
          </div>
        </div>

        {/* Main Call Processing Interface */}
        <div className="p-6">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 h-[calc(100vh-200px)]">
            {/* Left Column - Call Transcript & Caller Info */}
            <div className="xl:col-span-4 space-y-6">
              <div className="h-1/2">
                <CallTranscriptPanel
                  isCallActive={isCallActive}
                  onLocationExtracted={handleLocationExtracted}
                  onIncidentTypeDetected={handleIncidentTypeDetected}
                />
              </div>
              <div className="h-1/2">
                <CallerInformationPanel
                  extractedLocation={extractedLocation}
                  onLocationUpdate={handleLocationExtracted}
                />
              </div>
            </div>

            {/* Center Column - AI Assistant & Call Controls */}
            <div className="xl:col-span-4 space-y-6">
              <div className="h-3/5">
                <AIAssistancePanel
                  incidentType={detectedIncidentType}
                  onRecommendationAccept={handleRecommendationAccept}
                />
              </div>
              <div className="h-2/5">
                <CallControlsPanel
                  isCallActive={isCallActive}
                  onCallStateChange={handleCallStateChange}
                  onEmergencyEscalation={handleEmergencyEscalation}
                />
              </div>
            </div>

            {/* Right Column - Quick Actions & Language Support */}
            <div className="xl:col-span-4 space-y-6">
              <div className="h-3/5">
                <QuickActionsPanel
                  aiRecommendations={aiRecommendations}
                  extractedLocation={extractedLocation}
                  onIncidentCreate={handleIncidentCreate}
                  onDispatch={handleDispatch}
                  onHospitalAlert={handleHospitalAlert}
                />
              </div>
              <div className="h-2/5">
                <MultiLanguagePanel
                  onLanguageChange={handleLanguageChange}
                  onTranslationRequest={handleTranslationRequest}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Call Status Bar */}
        <div className="xl:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {isCallActive ? (
                <>
                  <div className="w-3 h-3 bg-success rounded-full animate-emergency-pulse" />
                  <span className="text-sm font-medium text-success">Call Active - 02:35</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-muted rounded-full" />
                  <span className="text-sm text-muted-foreground">No Active Call</span>
                </>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Phone"
              >
                Answer
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="PhoneOff"
              >
                End
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmergencyCallProcessing;