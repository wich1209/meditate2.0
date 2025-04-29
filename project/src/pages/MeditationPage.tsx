import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeditationStore } from '../stores/meditationStore';
import { useBreathingStore } from '../stores/breathingStore';
import BreathingGuide from '../components/breathing/BreathingGuide';
import PatternSelector from '../components/breathing/PatternSelector';
import DurationSelector from '../components/meditation/DurationSelector';
import MeditationTimer from '../components/meditation/MeditationTimer';
import Button from '../components/common/Button';
import { PlayIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';

enum MeditationStep {
  Setup,
  Session,
  Complete,
}

const MeditationPage = () => {
  const { 
    sessionDuration, 
    startSession, 
    completeSession, 
    cancelSession,
    voiceEnabled,
    voiceVolume,
  } = useMeditationStore();
  
  const { getCurrentPattern } = useBreathingStore();
  const [currentStep, setCurrentStep] = useState<MeditationStep>(MeditationStep.Setup);
  
  const handleStartSession = () => {
    const pattern = getCurrentPattern();
    startSession(pattern.id, sessionDuration);
    setCurrentStep(MeditationStep.Session);
  };
  
  const handleCompleteSession = () => {
    completeSession();
    setCurrentStep(MeditationStep.Complete);
  };
  
  const handleEndSession = () => {
    cancelSession();
    setCurrentStep(MeditationStep.Setup);
  };
  
  const resetSession = () => {
    setCurrentStep(MeditationStep.Setup);
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <AnimatePresence mode="wait">
        {currentStep === MeditationStep.Setup && (
          <motion.div
            key="setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                Prepare for Meditation
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Customize your session settings and start when you're ready.
              </p>
            </div>
            
            <div className="grid md:grid-cols-1 gap-8">
              <div className="card">
                <PatternSelector />
              </div>
              
              <div className="card">
                <DurationSelector />
              </div>
              
              <div className="flex justify-center mt-4">
                <Button
                  onClick={handleStartSession}
                  size="lg"
                  className="px-8"
                  icon={<PlayIcon className="h-5 w-5" />}
                >
                  Start Session
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        
        {currentStep === MeditationStep.Session && (
          <motion.div
            key="session"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="card mb-8">
              <BreathingGuide 
                isActive={true}
                onComplete={handleCompleteSession}
                duration={sessionDuration}
                voiceEnabled={voiceEnabled}
                voiceVolume={voiceVolume}
              />
            </div>
            
            <Button
              variant="outline"
              onClick={handleEndSession}
              icon={<ArrowLeftIcon className="h-5 w-5" />}
            >
              End Session
            </Button>
          </motion.div>
        )}
        
        {currentStep === MeditationStep.Complete && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="card mb-8 py-12">
              <div className="w-20 h-20 mx-auto bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 dark:text-primary-400" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Session Complete
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Congratulations on completing your {sessionDuration}-minute meditation session.
              </p>
              
              <div className="max-w-md mx-auto p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  "Take a moment to notice how you feel. The benefits of meditation build over time with regular practice."
                </p>
              </div>
              
              <div className="mt-8">
                <Button
                  onClick={resetSession}
                  size="lg"
                >
                  New Session
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MeditationPage;