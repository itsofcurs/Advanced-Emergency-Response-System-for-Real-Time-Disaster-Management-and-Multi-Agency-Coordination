import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallTranscriptPanel = ({ isCallActive, onLocationExtracted, onIncidentTypeDetected }) => {
  const [transcript, setTranscript] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const transcriptRef = useRef(null);

  // Mock real-time transcript data
  const mockTranscriptSegments = [
    { timestamp: '14:22:47', speaker: 'Caller', text: `Help! There's been a car accident on Highway 95 near Exit 12. Two cars are involved and I can see smoke coming from one of them.` },
    { timestamp: '14:22:52', speaker: 'Operator', text: `I'm dispatching emergency services to your location. Can you tell me if anyone appears to be injured?` },
    { timestamp: '14:22:58', speaker: 'Caller', text: `Yes, I can see someone in the first car isn't moving. The driver of the second car is out and walking around but seems hurt.` },
    { timestamp: '14:23:05', speaker: 'Operator', text: `Emergency units are en route. Please stay on the line and keep yourself safe. Do not approach the vehicles.` },
    { timestamp: '14:23:12', speaker: 'Caller', text: `Okay, I'm staying back. The smoke is getting worse from the first car. Should I try to help?` }
  ];

  useEffect(() => {
    if (isCallActive && isRecording) {
      // Simulate real-time transcript updates
      const interval = setInterval(() => {
        const randomSegment = mockTranscriptSegments?.[Math.floor(Math.random() * mockTranscriptSegments?.length)];
        setTranscript(prev => prev + `\n[${randomSegment?.timestamp}] ${randomSegment?.speaker}: ${randomSegment?.text}`);
        
        // Simulate AI analysis
        if (randomSegment?.text?.includes('Highway 95') || randomSegment?.text?.includes('Exit 12')) {
          onLocationExtracted('Highway 95, Exit 12, Mile Marker 45.2');
        }
        if (randomSegment?.text?.includes('car accident') || randomSegment?.text?.includes('smoke')) {
          onIncidentTypeDetected('Vehicle Accident - Multi-Vehicle with Fire Risk');
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isCallActive, isRecording, onLocationExtracted, onIncidentTypeDetected]);

  useEffect(() => {
    // Auto-scroll to bottom of transcript
    if (transcriptRef?.current) {
      transcriptRef.current.scrollTop = transcriptRef?.current?.scrollHeight;
    }
  }, [transcript]);

  const handleStartRecording = () => {
    setIsRecording(true);
    setTranscript(`[${new Date()?.toLocaleTimeString()}] Call Recording Started\n`);
    
    // Simulate AI analysis results
    setTimeout(() => {
      setAiAnalysis({
        confidence: 0.94,
        urgency: 'HIGH',
        keywords: ['accident', 'smoke', 'injured', 'highway'],
        location: 'Highway 95, Exit 12',
        incidentType: 'Vehicle Accident'
      });
    }, 2000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    setTranscript(prev => prev + `\n[${new Date()?.toLocaleTimeString()}] Call Recording Stopped`);
  };

  const handleClearTranscript = () => {
    setTranscript('');
    setAiAnalysis(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Mic" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Live Call Transcript</h3>
          {isRecording && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-emergency-pulse" />
              <span className="text-sm text-primary font-medium">Recording</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {!isRecording ? (
            <Button
              variant="default"
              size="sm"
              onClick={handleStartRecording}
              iconName="Play"
              iconPosition="left"
              disabled={!isCallActive}
            >
              Start Recording
            </Button>
          ) : (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleStopRecording}
              iconName="Square"
              iconPosition="left"
            >
              Stop Recording
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearTranscript}
            iconName="Trash2"
          />
        </div>
      </div>
      {/* AI Analysis Bar */}
      {aiAnalysis && (
        <div className="p-3 bg-muted/50 border-b border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Brain" size={16} className="text-accent" />
                <span className="text-muted-foreground">AI Confidence:</span>
                <span className="font-mono font-bold text-success">{(aiAnalysis?.confidence * 100)?.toFixed(0)}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-muted-foreground">Urgency:</span>
                <span className={`font-bold ${aiAnalysis?.urgency === 'HIGH' ? 'text-primary' : 'text-warning'}`}>
                  {aiAnalysis?.urgency}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">Keywords:</span>
              <div className="flex space-x-1">
                {aiAnalysis?.keywords?.slice(0, 3)?.map((keyword, index) => (
                  <span key={index} className="px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Transcript Area */}
      <div className="flex-1 p-4">
        <div 
          ref={transcriptRef}
          className="h-full bg-background border border-border rounded-lg p-4 overflow-y-auto font-mono text-sm"
        >
          {transcript ? (
            <pre className="whitespace-pre-wrap text-foreground leading-relaxed">
              {transcript}
            </pre>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              <div className="text-center">
                <Icon name="Mic" size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">Ready to Record</p>
                <p className="text-sm">Click "Start Recording" to begin call transcript</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Real-time Indicators */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isCallActive ? 'bg-success' : 'bg-muted'}`} />
              <span className="text-muted-foreground">Call Status:</span>
              <span className={`font-medium ${isCallActive ? 'text-success' : 'text-muted-foreground'}`}>
                {isCallActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">Duration:</span>
              <span className="font-mono font-medium text-foreground">
                {isCallActive ? '02:35' : '00:00'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Icon name="Volume2" size={16} className="text-muted-foreground" />
            <div className="flex space-x-1">
              {[...Array(5)]?.map((_, i) => (
                <div 
                  key={i} 
                  className={`w-1 h-4 rounded ${i < 3 ? 'bg-success' : 'bg-muted'}`} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallTranscriptPanel;