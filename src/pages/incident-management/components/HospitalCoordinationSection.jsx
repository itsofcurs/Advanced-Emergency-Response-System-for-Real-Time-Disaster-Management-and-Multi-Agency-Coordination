import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HospitalCoordinationSection = ({ onAlertHospital, onRequestBeds }) => {
  const [nearbyHospitals] = useState([
    {
      id: 'GH-001',
      name: 'General Hospital',
      distance: '2.3 miles',
      eta: '8 min',
      traumaLevel: 'Level 1',
      bedAvailability: {
        emergency: 12,
        icu: 3,
        trauma: 2
      },
      specialties: ['Trauma', 'Cardiology', 'Neurology'],
      status: 'available',
      contact: '555-0100',
      alertStatus: 'notified'
    },
    {
      id: 'SMH-002',
      name: 'St. Mary\'s Hospital',
      distance: '3.7 miles',
      eta: '12 min',
      traumaLevel: 'Level 2',
      bedAvailability: {
        emergency: 8,
        icu: 1,
        trauma: 0
      },
      specialties: ['Emergency', 'Orthopedics', 'Surgery'],
      status: 'limited',
      contact: '555-0200',
      alertStatus: 'pending'
    },
    {
      id: 'CMC-003',
      name: 'City Medical Center',
      distance: '5.1 miles',
      eta: '15 min',
      traumaLevel: 'Level 3',
      bedAvailability: {
        emergency: 15,
        icu: 5,
        trauma: 1
      },
      specialties: ['Emergency', 'Pediatrics', 'Internal Medicine'],
      status: 'available',
      contact: '555-0300',
      alertStatus: 'none'
    }
  ]);

  const [selectedHospital, setSelectedHospital] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'text-success bg-success/10';
      case 'limited': return 'text-warning bg-warning/10';
      case 'full': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getAlertStatusColor = (status) => {
    switch (status) {
      case 'notified': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'none': return 'text-muted-foreground bg-muted/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTraumaLevelColor = (level) => {
    switch (level) {
      case 'Level 1': return 'text-primary bg-primary/10';
      case 'Level 2': return 'text-warning bg-warning/10';
      case 'Level 3': return 'text-secondary bg-secondary/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const handleAlertHospital = (hospital) => {
    setSelectedHospital(hospital);
    onAlertHospital?.(hospital);
  };

  const handleRequestBeds = (hospital, bedType) => {
    onRequestBeds?.(hospital, bedType);
  };

  const getTotalBeds = (bedAvailability) => {
    return Object.values(bedAvailability).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Building2" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-emergency-lg font-semibold text-foreground">Hospital Coordination</h2>
            <p className="text-emergency-sm text-muted-foreground">
              Nearby medical facilities and bed availability
            </p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          iconName="RefreshCw"
          iconPosition="left"
        >
          Refresh Status
        </Button>
      </div>

      {/* Hospital List */}
      <div className="space-y-4">
        {nearbyHospitals.map((hospital) => (
          <div key={hospital.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-emergency-md font-semibold text-foreground">{hospital.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-emergency-xs font-medium ${getTraumaLevelColor(hospital.traumaLevel)}`}>
                    {hospital.traumaLevel}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-emergency-xs font-medium ${getStatusColor(hospital.status)}`}>
                    {hospital.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-emergency-xs mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">{hospital.distance}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">ETA: {hospital.eta}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Phone" size={14} className="text-muted-foreground" />
                    <span className="text-foreground">{hospital.contact}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Bell" size={14} className="text-muted-foreground" />
                    <span className={`font-medium ${getAlertStatusColor(hospital.alertStatus).split(' ')[0]}`}>
                      {hospital.alertStatus}
                    </span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {hospital.specialties.map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-muted/30 rounded text-emergency-xs text-muted-foreground">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleAlertHospital(hospital)}
                  iconName="Bell"
                  disabled={hospital.alertStatus === 'notified'}
                >
                  {hospital.alertStatus === 'notified' ? 'Alerted' : 'Alert'}
                </Button>
                <Button 
                  variant="default" 
                  size="sm" 
                  iconName="Phone"
                >
                  Contact
                </Button>
              </div>
            </div>

            {/* Bed Availability */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="text-emergency-sm font-medium text-foreground mb-3">Bed Availability</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-emergency-lg font-bold text-success">{hospital.bedAvailability.emergency}</div>
                  <div className="text-emergency-xs text-muted-foreground">Emergency</div>
                  <Button 
                    variant="ghost" 
                    size="xs" 
                    className="mt-1"
                    onClick={() => handleRequestBeds(hospital, 'emergency')}
                  >
                    Request
                  </Button>
                </div>
                <div className="text-center">
                  <div className="text-emergency-lg font-bold text-warning">{hospital.bedAvailability.icu}</div>
                  <div className="text-emergency-xs text-muted-foreground">ICU</div>
                  <Button 
                    variant="ghost" 
                    size="xs" 
                    className="mt-1"
                    onClick={() => handleRequestBeds(hospital, 'icu')}
                    disabled={hospital.bedAvailability.icu === 0}
                  >
                    Request
                  </Button>
                </div>
                <div className="text-center">
                  <div className="text-emergency-lg font-bold text-primary">{hospital.bedAvailability.trauma}</div>
                  <div className="text-emergency-xs text-muted-foreground">Trauma</div>
                  <Button 
                    variant="ghost" 
                    size="xs" 
                    className="mt-1"
                    onClick={() => handleRequestBeds(hospital, 'trauma')}
                    disabled={hospital.bedAvailability.trauma === 0}
                  >
                    Request
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
        <h3 className="text-emergency-sm font-medium text-foreground mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button variant="outline" size="sm" iconName="AlertTriangle" iconPosition="left">
            Mass Casualty Alert
          </Button>
          <Button variant="outline" size="sm" iconName="Users" iconPosition="left">
            Request Trauma Team
          </Button>
          <Button variant="outline" size="sm" iconName="Truck" iconPosition="left">
            Ambulance Diversion
          </Button>
          <Button variant="outline" size="sm" iconName="Radio" iconPosition="left">
            Emergency Broadcast
          </Button>
        </div>
      </div>

      {/* Regional Status Overview */}
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-emergency-sm font-medium text-foreground mb-4">Regional Hospital Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-success/5 border border-success/20 rounded-lg">
            <div className="text-emergency-lg font-bold text-success">
              {nearbyHospitals.reduce((sum, h) => sum + getTotalBeds(h.bedAvailability), 0)}
            </div>
            <div className="text-emergency-xs text-muted-foreground">Total Beds Available</div>
          </div>
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="text-emergency-lg font-bold text-primary">
              {nearbyHospitals.filter(h => h.traumaLevel === 'Level 1').length}
            </div>
            <div className="text-emergency-xs text-muted-foreground">Level 1 Trauma Centers</div>
          </div>
          <div className="p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="text-emergency-lg font-bold text-warning">
              {nearbyHospitals.filter(h => h.alertStatus === 'notified').length}
            </div>
            <div className="text-emergency-xs text-muted-foreground">Hospitals Alerted</div>
          </div>
          <div className="p-3 bg-accent/5 border border-accent/20 rounded-lg">
            <div className="text-emergency-lg font-bold text-accent">8m</div>
            <div className="text-emergency-xs text-muted-foreground">Average ETA</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalCoordinationSection;