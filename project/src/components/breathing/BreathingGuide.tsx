import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBreathingStore } from '../../stores/breathingStore';
import { generateSpeech, getDemoAudio } from '../../services/elevenLabsService';
import BreathingVisual from './BreathingVisual';

interface BreathingGuideProps {
  isActive: boolean;
  onComplete?: () => void;
  duration: number;
  voiceEnabled: boolean;
  voiceVolume: number;
}

type BreathState = 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'paused';

const BreathingGuide = ({
  isActive,
  onComplete,
  duration,
  voiceEnabled,
  voiceVolume,
}: BreathingGuideProps) => {
  const { getCurrentPattern } = useBreathingStore();
  const pattern = getCurrentPattern();
  
  const [breathState, setBreathState] = useState<BreathState>('paused');
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [currentCycle, setCurrentCycle] = useState(0);
  
  const breathAudioRef = useRef<HTMLAudioElement | null>(null);
  const voiceAudioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  useEffect(() => {
    // Initialize audio elements
    if (voiceEnabled) {
      breathAudioRef.current = new Audio();
      breathAudioRef.current.volume = voiceVolume / 100;
      
      voiceAudioRef.current = new Audio();
      voiceAudioRef.current.volume = voiceVolume / 100;
      
      // Pre-generate voice prompts
      const generateVoicePrompts = async () => {
        const prompts = {
          inhale: await generateSpeech('Breathe in deeply'),
          hold: await generateSpeech('Hold your breath'),
          exhale: await generateSpeech('Release and exhale'),
        };
        
        if (voiceAudioRef.current && prompts.inhale) {
          voiceAudioRef.current.src = prompts.inhale;
        }
      };
      
      generateVoicePrompts();
    }
    
    return () => {
      if (breathAudioRef.current) {
        breathAudioRef.current.pause();
      }
      if (voiceAudioRef.current) {
        voiceAudioRef.current.pause();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [voiceVolume, voiceEnabled]);
  
  useEffect(() => {
    if (isActive) {
      startBreathingCycle();
      
      // Start the timer
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            if (onComplete) onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathState('paused');
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, onComplete]);
  
  const playAudio = async (type: 'inhale' | 'hold' | 'exhale') => {
    if (!voiceEnabled) return;
    
    // Play sound effect
    if (breathAudioRef.current) {
      breathAudioRef.current.pause();
      breathAudioRef.current.src = getDemoAudio(type);
      breathAudioRef.current.play().catch(error => {
        console.error('Failed to play audio:', error);
      });
    }
    
    // Play voice prompt
    if (voiceAudioRef.current) {
      const voicePrompt = await generateSpeech(
        type === 'inhale' ? 'Breathe in deeply' :
        type === 'hold' ? 'Hold your breath' :
        'Release and exhale'
      );
      
      if (voicePrompt) {
        voiceAudioRef.current.src = voicePrompt;
        voiceAudioRef.current.play().catch(error => {
          console.error('Failed to play voice:', error);
        });
      }
    }
  };
  
  const startBreathingCycle = () => {
    const cycleDuration = 
      pattern.inhale + pattern.hold1 + pattern.exhale + pattern.hold2;
    
    const breatheCycle = async () => {
      // Inhale phase
      playAudio('inhale');
      setBreathState('inhale');
      await new Promise(resolve => setTimeout(resolve, pattern.inhale * 1000));
      
      // Hold phase 1
      if (pattern.hold1 > 0) {
        playAudio('hold');
        setBreathState('hold1');
        await new Promise(resolve => setTimeout(resolve, pattern.hold1 * 1000));
      }
      
      // Exhale phase
      playAudio('exhale');
      setBreathState('exhale');
      await new Promise(resolve => setTimeout(resolve, pattern.exhale * 1000));
      
      // Hold phase 2
      if (pattern.hold2 > 0) {
        playAudio('hold');
        setBreathState('hold2');
        await new Promise(resolve => setTimeout(resolve, pattern.hold2 * 1000));
      }
      
      setCurrentCycle(prev => prev + 1);
      
      // Continue the cycle if still active
      if (isActive && timeRemaining > 0) {
        breatheCycle();
      }
    };
    
    breatheCycle();
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const getBreathText = () => {
    switch (breathState) {
      case 'inhale':
        return 'BREATHE IN';
      case 'hold1':
      case 'hold2':
        return 'HOLD';
      case 'exhale':
        return 'BREATHE OUT';
      default:
        return 'READY';
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="text-center mb-6">
        <span className="text-4xl font-light text-gray-700 dark:text-gray-200">
          {formatTime(timeRemaining)}
        </span>
      </div>
      
      <div className="relative w-full max-w-md aspect-square">
        <BreathingVisual breathState={breathState} pattern={pattern} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={breathState}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <div className="text-3xl md:text-4xl font-bold tracking-wider text-primary-600 dark:text-primary-400">
              {getBreathText()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="mt-6 text-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Current pattern: <span className="font-medium text-gray-700 dark:text-gray-300">{pattern.name}</span>
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Cycles completed: {currentCycle}
        </div>
      </div>
    </div>
  );
};

export default BreathingGuide;