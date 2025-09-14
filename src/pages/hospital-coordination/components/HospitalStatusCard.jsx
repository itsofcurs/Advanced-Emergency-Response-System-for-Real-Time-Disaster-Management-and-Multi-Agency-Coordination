import React from 'react';
import Icon from '../../../components/AppIcon';

const HospitalStatusCard = ({ hospital }) => {
  const getCapacityColor = (percentage) => {
    if (percentage >= 90) return 'text-destructive';
    if (percentage >= 75) return 'text-warning';
    return 'text-success';
  };

  const getCapacityBg = (percentage) => {
    if (percentage >= 90) return 'bg-destructive/10';
    if (percentage >= 75) return 'bg-warning/10';
    return 'bg-success/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
            <Icon name="Building2" size={24} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{hospital?.name}</h3>
            <p className="text-sm text-muted-foreground">{hospital?.address}</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
          hospital?.status === 'operational' ? 'bg-success/10 text-success' :
          hospital?.status === 'limited'? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
        }`}>
          {hospital?.status?.charAt(0)?.toUpperCase() + hospital?.status?.slice(1)}
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-3 rounded-lg ${getCapacityBg(hospital?.edCapacity)}`}>
          <div className="flex items-center justify-between mb-2">
            <Icon name="Activity" size={16} className={getCapacityColor(hospital?.edCapacity)} />
            <span className={`text-xs font-medium ${getCapacityColor(hospital?.edCapacity)}`}>
              {hospital?.edCapacity}%
            </span>
          </div>
          <p className="text-sm font-medium text-foreground">Emergency Dept</p>
          <p className="text-xs text-muted-foreground">{hospital?.edBeds?.available}/{hospital?.edBeds?.total} beds</p>
        </div>

        <div className={`p-3 rounded-lg ${getCapacityBg(hospital?.icuCapacity)}`}>
          <div className="flex items-center justify-between mb-2">
            <Icon name="Heart" size={16} className={getCapacityColor(hospital?.icuCapacity)} />
            <span className={`text-xs font-medium ${getCapacityColor(hospital?.icuCapacity)}`}>
              {hospital?.icuCapacity}%
            </span>
          </div>
          <p className="text-sm font-medium text-foreground">ICU</p>
          <p className="text-xs text-muted-foreground">{hospital?.icuBeds?.available}/{hospital?.icuBeds?.total} beds</p>
        </div>

        <div className={`p-3 rounded-lg ${getCapacityBg(hospital?.traumaCapacity)}`}>
          <div className="flex items-center justify-between mb-2">
            <Icon name="Zap" size={16} className={getCapacityColor(hospital?.traumaCapacity)} />
            <span className={`text-xs font-medium ${getCapacityColor(hospital?.traumaCapacity)}`}>
              {hospital?.traumaCapacity}%
            </span>
          </div>
          <p className="text-sm font-medium text-foreground">Trauma</p>
          <p className="text-xs text-muted-foreground">{hospital?.traumaBeds?.available}/{hospital?.traumaBeds?.total} beds</p>
        </div>

        <div className={`p-3 rounded-lg ${getCapacityBg(hospital?.pediatricCapacity)}`}>
          <div className="flex items-center justify-between mb-2">
            <Icon name="Baby" size={16} className={getCapacityColor(hospital?.pediatricCapacity)} />
            <span className={`text-xs font-medium ${getCapacityColor(hospital?.pediatricCapacity)}`}>
              {hospital?.pediatricCapacity}%
            </span>
          </div>
          <p className="text-sm font-medium text-foreground">Pediatric</p>
          <p className="text-xs text-muted-foreground">{hospital?.pediatricBeds?.available}/{hospital?.pediatricBeds?.total} beds</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-border">
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Staff:</span>
            <span className="font-medium text-foreground">{hospital?.staffCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-muted-foreground" />
            <span className="text-muted-foreground">Avg Wait:</span>
            <span className="font-medium text-foreground">{hospital?.avgWaitTime} min</span>
          </div>
        </div>
        <div className="text-xs text-muted-foreground">
          Updated {hospital?.lastUpdated}
        </div>
      </div>
    </div>
  );
};

export default HospitalStatusCard;