import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIAssistancePanel = ({ incidentType, onRecommendationAccept }) => {
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [falseAlarmProbability, setFalseAlarmProbability] = useState(0);

  // Mock AI analysis data
  const mockAnalysisData = {
    severity: 'HIGH',
    confidence: 0.92,
    urgencyScore: 8.5,
    keyFactors: [
      'Multiple vehicles involved',
      'Smoke/fire reported',
      'Potential injuries',
      'Highway location - traffic impact'
    ],
    riskAssessment: {
      fireRisk: 'HIGH',
      trafficRisk: 'HIGH',
      medicalRisk: 'MEDIUM',
      environmentalRisk: 'LOW'
    },
    estimatedResponseTime: '6-8 minutes',
    resourceRequirements: {
      fire: 2,
      medical: 1,
      police: 1,
      traffic: 1
    }
  };

  const mockRecommendations = [
    {
      id: 1,
      type: 'IMMEDIATE',
      priority: 'CRITICAL',
      action: 'Dispatch Fire & Rescue',
      description: 'Deploy 2 fire trucks with hazmat capability due to smoke/fire risk',
      estimatedTime: '2 minutes',
      confidence: 0.95,
      accepted: false
    },
    {
      id: 2,
      type: 'IMMEDIATE',
      priority: 'HIGH',
      action: 'Dispatch Ambulance',
      description: 'Send 1 ALS ambulance for potential injuries, consider helicopter if severe',
      estimatedTime: '3 minutes',
      confidence: 0.88,
      accepted: false
    },
    {
      id: 3,
      type: 'IMMEDIATE',
      priority: 'HIGH',
      action: 'Police Response',
      description: 'Deploy traffic control unit to manage highway closure and rerouting',
      estimatedTime: '4 minutes',
      confidence: 0.91,
      accepted: false
    },
    {
      id: 4,
      type: 'SECONDARY',
      priority: 'MEDIUM',
      action: 'Hospital Alert',
      description: 'Notify Springfield General ER of potential multi-trauma incoming',
      estimatedTime: '1 minute',
      confidence: 0.82,
      accepted: false
    },
    {
      id: 5,
      type: 'SECONDARY',
      priority: 'MEDIUM',
      action: 'Traffic Management',
      description: 'Activate highway message boards for alternate route guidance',
      estimatedTime: '2 minutes',
      confidence: 0.79,
      accepted: false
    }
  ];

  useEffect(() => {
    if (incidentType) {
      setIsAnalyzing(true);
      
      // Simulate AI analysis
      setTimeout(() => {
        setAnalysis(mockAnalysisData);
        setRecommendations(mockRecommendations);
        setFalseAlarmProbability(0.15);
        setIsAnalyzing(false);
      }, 2000);
    }
  }, [incidentType]);

  const handleAcceptRecommendation = (recommendationId) => {
    setRecommendations(prev => 
      prev?.map(rec => 
        rec?.id === recommendationId 
          ? { ...rec, accepted: true }
          : rec
      )
    );
    
    const recommendation = recommendations?.find(r => r?.id === recommendationId);
    onRecommendationAccept(recommendation);
  };

  const handleAcceptAllCritical = () => {
    const criticalRecs = recommendations?.filter(r => r?.priority === 'CRITICAL');
    criticalRecs?.forEach(rec => handleAcceptRecommendation(rec?.id));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'text-primary';
      case 'HIGH': return 'text-warning';
      case 'MEDIUM': return 'text-accent';
      case 'LOW': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBg = (priority) => {
    switch (priority) {
      case 'CRITICAL': return 'bg-primary/20';
      case 'HIGH': return 'bg-warning/20';
      case 'MEDIUM': return 'bg-accent/20';
      case 'LOW': return 'bg-success/20';
      default: return 'bg-muted/20';
    }
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'HIGH': return 'text-primary';
      case 'MEDIUM': return 'text-warning';
      case 'LOW': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Brain" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">AI Emergency Assistant</h3>
          {isAnalyzing && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-accent border-t-transparent rounded-full" />
              <span className="text-sm text-accent">Analyzing...</span>
            </div>
          )}
        </div>
        
        {analysis && (
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Confidence:</span>
            <span className="font-mono font-bold text-success">
              {(analysis?.confidence * 100)?.toFixed(0)}%
            </span>
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        {!analysis ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Icon name="Brain" size={48} className="mx-auto mb-4 text-muted-foreground opacity-50" />
              <p className="text-lg font-medium text-muted-foreground">AI Analysis Ready</p>
              <p className="text-sm text-muted-foreground">Waiting for call data to analyze...</p>
            </div>
          </div>
        ) : (
          <div className="p-4 space-y-6">
            {/* Incident Analysis */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-foreground">Incident Analysis</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Severity</span>
                    <span className={`font-bold ${getPriorityColor(analysis?.severity)}`}>
                      {analysis?.severity}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Urgency Score</span>
                    <span className="font-mono font-bold text-primary">
                      {analysis?.urgencyScore}/10
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">False Alarm Probability</span>
                  <span className="font-mono font-bold text-success">
                    {(falseAlarmProbability * 100)?.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(1 - falseAlarmProbability) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Key Factors */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Key Factors Identified</h4>
              <div className="space-y-2">
                {analysis?.keyFactors?.map((factor, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-accent/10 rounded">
                    <Icon name="CheckCircle" size={14} className="text-accent" />
                    <span className="text-sm text-foreground">{factor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Risk Assessment</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(analysis?.riskAssessment)?.map(([risk, level]) => (
                  <div key={risk} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                    <span className="text-sm text-muted-foreground capitalize">
                      {risk?.replace('Risk', '')}
                    </span>
                    <span className={`text-sm font-medium ${getRiskColor(level)}`}>
                      {level}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold text-foreground">AI Recommendations</h4>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAcceptAllCritical}
                  iconName="Zap"
                  iconPosition="left"
                >
                  Accept All Critical
                </Button>
              </div>
              
              <div className="space-y-3">
                {recommendations?.map((rec) => (
                  <div 
                    key={rec?.id} 
                    className={`p-4 border rounded-lg ${
                      rec?.accepted ? 'border-success bg-success/10' : 'border-border'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getPriorityBg(rec?.priority)} ${getPriorityColor(rec?.priority)}`}>
                          {rec?.priority}
                        </div>
                        <span className="font-medium text-foreground">{rec?.action}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-muted-foreground">
                          {(rec?.confidence * 100)?.toFixed(0)}%
                        </span>
                        {!rec?.accepted ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAcceptRecommendation(rec?.id)}
                            iconName="Check"
                          />
                        ) : (
                          <Icon name="CheckCircle" size={20} className="text-success" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{rec?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={12} />
                        <span>ETA: {rec?.estimatedTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Target" size={12} />
                        <span>{rec?.type}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resource Requirements */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Recommended Resources</h4>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(analysis?.resourceRequirements)?.map(([resource, count]) => (
                  <div key={resource} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Icon 
                        name={
                          resource === 'fire' ? 'Flame' :
                          resource === 'medical' ? 'Heart' :
                          resource === 'police'? 'Shield' : 'Car'
                        } 
                        size={16} 
                        className="text-accent" 
                      />
                      <span className="text-sm text-foreground capitalize">{resource}</span>
                    </div>
                    <span className="font-mono font-bold text-primary">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistancePanel;