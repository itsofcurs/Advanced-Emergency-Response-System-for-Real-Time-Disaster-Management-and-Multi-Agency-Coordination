import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PatientIntakePanel = ({ patients, onUpdatePatient, onReserveBed }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-destructive';
      case 'urgent': return 'text-warning';
      case 'stable': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-destructive/10';
      case 'urgent': return 'bg-warning/10';
      case 'stable': return 'bg-success/10';
      default: return 'bg-muted/10';
    }
  };

  const getEtaColor = (eta) => {
    if (eta <= 5) return 'text-destructive';
    if (eta <= 15) return 'text-warning';
    return 'text-success';
  };

  const formatEta = (eta) => {
    if (eta < 1) return 'Arriving now';
    return `${eta} min`;
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Ambulance" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Incoming Patients</h3>
              <p className="text-sm text-muted-foreground">Real-time ambulance tracking</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-emergency-pulse" />
            <span className="text-sm text-success font-medium">Live</span>
          </div>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {patients?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="Ambulance" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No incoming patients at this time</p>
          </div>
        ) : (
          <div className="space-y-1">
            {patients?.map((patient) => (
              <div
                key={patient?.id}
                className={`p-4 border-b border-border hover:bg-muted/30 cursor-pointer transition-colors ${
                  selectedPatient?.id === patient?.id ? 'bg-muted/50' : ''
                }`}
                onClick={() => setSelectedPatient(patient)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getSeverityBg(patient?.severity)} ${getSeverityColor(patient?.severity)}`}>
                        {patient?.severity?.toUpperCase()}
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} className={getEtaColor(patient?.eta)} />
                        <span className={`text-sm font-medium ${getEtaColor(patient?.eta)}`}>
                          ETA: {formatEta(patient?.eta)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={14} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{patient?.distance} mi</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <p className="text-sm font-medium text-foreground">Patient Info</p>
                        <p className="text-sm text-muted-foreground">
                          {patient?.age}yr {patient?.gender} • {patient?.condition}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Ambulance</p>
                        <p className="text-sm text-muted-foreground">
                          Unit {patient?.ambulanceId} • {patient?.crew}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm font-medium text-foreground">Medical Requirements</p>
                      <div className="flex flex-wrap gap-2">
                        {patient?.requirements?.map((req, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded"
                          >
                            {req}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted/30 p-3 rounded">
                      <p className="text-sm font-medium text-foreground mb-1">Chief Complaint</p>
                      <p className="text-sm text-muted-foreground">{patient?.complaint}</p>
                    </div>
                  </div>

                  <div className="ml-4 space-y-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onReserveBed(patient);
                      }}
                      iconName="Bed"
                      iconPosition="left"
                    >
                      Reserve Bed
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => {
                        e?.stopPropagation();
                        onUpdatePatient(patient);
                      }}
                      iconName="Edit"
                      iconPosition="left"
                    >
                      Update
                    </Button>
                  </div>
                </div>

                {patient?.vitals && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-sm font-medium text-foreground mb-2">Latest Vitals</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">BP:</span>
                        <span className="ml-1 font-medium text-foreground">{patient?.vitals?.bloodPressure}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">HR:</span>
                        <span className="ml-1 font-medium text-foreground">{patient?.vitals?.heartRate} bpm</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">SpO2:</span>
                        <span className="ml-1 font-medium text-foreground">{patient?.vitals?.oxygenSat}%</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Temp:</span>
                        <span className="ml-1 font-medium text-foreground">{patient?.vitals?.temperature}°F</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientIntakePanel;