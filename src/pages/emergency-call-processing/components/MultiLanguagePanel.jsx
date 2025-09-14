import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const MultiLanguagePanel = ({ onLanguageChange, onTranslationRequest }) => {
  const [detectedLanguage, setDetectedLanguage] = useState('English');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationHistory, setTranslationHistory] = useState([]);
  const [culturalContext, setCulturalContext] = useState(null);

  const supportedLanguages = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Spanish', flag: '🇪🇸' },
    { value: 'fr', label: 'French', flag: '🇫🇷' },
    { value: 'de', label: 'German', flag: '🇩🇪' },
    { value: 'it', label: 'Italian', flag: '🇮🇹' },
    { value: 'pt', label: 'Portuguese', flag: '🇵🇹' },
    { value: 'ru', label: 'Russian', flag: '🇷🇺' },
    { value: 'zh', label: 'Chinese (Mandarin)', flag: '🇨🇳' },
    { value: 'ja', label: 'Japanese', flag: '🇯🇵' },
    { value: 'ko', label: 'Korean', flag: '🇰🇷' },
    { value: 'ar', label: 'Arabic', flag: '🇸🇦' },
    { value: 'hi', label: 'Hindi', flag: '🇮🇳' }
  ];

  const mockTranslations = [
    {
      id: 1,
      timestamp: '14:22:47',
      original: `¡Ayuda! Ha habido un accidente de coche en la autopista 95 cerca de la salida 12.`,
      translated: `Help! There's been a car accident on Highway 95 near Exit 12.`,fromLanguage: 'Spanish',
      confidence: 0.96
    },
    {
      id: 2,
      timestamp: '14:22:52',
      original: `Puedo ver humo saliendo de uno de los coches.`,
      translated: `I can see smoke coming from one of the cars.`,
      fromLanguage: 'Spanish',
      confidence: 0.94
    },
    {
      id: 3,
      timestamp: '14:22:58',
      original: `Sí, puedo ver que alguien en el primer coche no se mueve.`,
      translated: `Yes, I can see someone in the first car isn't moving.`,
      fromLanguage: 'Spanish',
      confidence: 0.92
    }
  ];

  const mockCulturalContext = {
    language: 'Spanish',
    region: 'Latin America',
    emergencyNumber: '911',
    culturalNotes: [
      'Caller may use formal address (usted) when speaking to authorities',
      'Family members often speak for the caller in emergency situations',
      'Religious references may be common during stressful situations'
    ],
    commonPhrases: [
      { phrase: '¡Ayuda!', translation: 'Help!', usage: 'Emergency cry for help' },
      { phrase: 'No puedo respirar', translation: 'I can\'t breathe', usage: 'Medical emergency' },
      { phrase: 'Hay un incendio', translation: 'There\'s a fire', usage: 'Fire emergency' }
    ]
  };

  useEffect(() => {
    // Simulate language detection
    const timer = setTimeout(() => {
      setDetectedLanguage('Spanish');
      setCulturalContext(mockCulturalContext);
      setTranslationHistory(mockTranslations);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    onLanguageChange(language);
  };

  const handleTranslationRequest = async (text) => {
    setIsTranslating(true);
    
    // Simulate translation
    setTimeout(() => {
      const newTranslation = {
        id: Date.now(),
        timestamp: new Date()?.toLocaleTimeString(),
        original: text,
        translated: 'Translated text would appear here',
        fromLanguage: detectedLanguage,
        confidence: 0.95
      };
      
      setTranslationHistory(prev => [...prev, newTranslation]);
      onTranslationRequest(newTranslation);
      setIsTranslating(false);
    }, 1500);
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return 'text-success';
    if (confidence >= 0.8) return 'text-warning';
    return 'text-primary';
  };

  const selectedLangData = supportedLanguages?.find(lang => lang?.value === selectedLanguage);

  return (
    <div className="bg-card border border-border rounded-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Globe" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Language Support</h3>
          {detectedLanguage !== 'English' && (
            <div className="flex items-center space-x-2 px-2 py-1 bg-accent/20 text-accent rounded text-sm">
              <Icon name="Languages" size={14} />
              <span>Detected: {detectedLanguage}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {isTranslating && (
            <div className="flex items-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-accent border-t-transparent rounded-full" />
              <span className="text-sm text-accent">Translating...</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        {/* Language Selection */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Translation Language</h4>
          
          <Select
            options={supportedLanguages}
            value={selectedLanguage}
            onChange={handleLanguageChange}
            placeholder="Select translation language"
            searchable
          />
          
          {selectedLangData && (
            <div className="flex items-center space-x-2 p-3 bg-muted/30 rounded-lg">
              <span className="text-2xl">{selectedLangData?.flag}</span>
              <div>
                <div className="text-sm font-medium text-foreground">{selectedLangData?.label}</div>
                <div className="text-xs text-muted-foreground">Active translation language</div>
              </div>
            </div>
          )}
        </div>

        {/* Real-time Translation */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-foreground">Live Translation</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleTranslationRequest('Sample text for translation')}
              loading={isTranslating}
              iconName="Languages"
              iconPosition="left"
            >
              Translate
            </Button>
          </div>
          
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {translationHistory?.length > 0 ? (
              translationHistory?.map((translation) => (
                <div key={translation?.id} className="p-3 border border-border rounded-lg space-y-2">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{translation?.timestamp}</span>
                    <div className="flex items-center space-x-2">
                      <span>Confidence:</span>
                      <span className={`font-medium ${getConfidenceColor(translation?.confidence)}`}>
                        {(translation?.confidence * 100)?.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="p-2 bg-muted/50 rounded text-sm">
                      <div className="text-xs text-muted-foreground mb-1">Original ({translation?.fromLanguage}):</div>
                      <div className="text-foreground">{translation?.original}</div>
                    </div>
                    
                    <div className="p-2 bg-accent/10 rounded text-sm">
                      <div className="text-xs text-muted-foreground mb-1">Translation (English):</div>
                      <div className="text-foreground font-medium">{translation?.translated}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Languages" size={48} className="mx-auto mb-4 opacity-50" />
                <p className="text-sm">No translations yet</p>
                <p className="text-xs">Translations will appear here automatically</p>
              </div>
            )}
          </div>
        </div>

        {/* Cultural Context */}
        {culturalContext && (
          <div className="space-y-3 border-t border-border pt-4">
            <h4 className="text-sm font-semibold text-foreground">Cultural Context</h4>
            
            <div className="space-y-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="MapPin" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">
                    {culturalContext?.language} - {culturalContext?.region}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Emergency Number: {culturalContext?.emergencyNumber}
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Cultural Notes</h5>
                <div className="space-y-1">
                  {culturalContext?.culturalNotes?.map((note, index) => (
                    <div key={index} className="flex items-start space-x-2 text-sm">
                      <Icon name="Info" size={14} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{note}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h5 className="text-sm font-medium text-foreground mb-2">Common Emergency Phrases</h5>
                <div className="space-y-2">
                  {culturalContext?.commonPhrases?.map((phrase, index) => (
                    <div key={index} className="p-2 bg-muted/20 rounded text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">{phrase?.phrase}</span>
                        <span className="text-accent">{phrase?.translation}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{phrase?.usage}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Translation Tools */}
        <div className="space-y-3 border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground">Translation Tools</h4>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Mic"
              iconPosition="left"
            >
              Voice Input
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Volume2"
              iconPosition="left"
            >
              Text-to-Speech
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="FileText"
              iconPosition="left"
            >
              Save Translation
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
            >
              Share Context
            </Button>
          </div>
        </div>

        {/* Emergency Phrases Quick Access */}
        <div className="space-y-3 border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground">Quick Emergency Phrases</h4>
          
          <div className="space-y-2">
            {[
              { en: 'Stay calm, help is coming', es: 'Mantén la calma, la ayuda viene en camino' },
              { en: 'What is your location?', es: '¿Cuál es tu ubicación?' },
              { en: 'Are you injured?', es: '¿Estás herido?' },
              { en: 'Emergency services are on the way', es: 'Los servicios de emergencia están en camino' }
            ]?.map((phrase, index) => (
              <div key={index} className="p-2 bg-muted/20 rounded text-sm">
                <div className="font-medium text-foreground mb-1">{phrase?.en}</div>
                <div className="text-accent">{phrase?.es}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiLanguagePanel;