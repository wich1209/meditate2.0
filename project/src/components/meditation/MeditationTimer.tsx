import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useMeditationStore } from '../../stores/meditationStore';
import Button from '../common/Button';
import { 
  PlayIcon, 
  PauseIcon, 
  StopIcon, 
  ArrowPathIcon,
} from '@heroicons/react/24/solid';

interface MeditationTimerProps {
  onComplete: () => void;
}

const MeditationTimer = ({ onComplete }: MeditationTimerProps) => {
  const { sessionDuration, currentSession } = useMeditationStore();
  
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(sessionDuration * 60);
  const [progress, setProgress] = useState(100);
  
  useEffect(() => {
    if (!currentSession) return;
    
    setTimeRemaining(sessionDuration * 60);
    setProgress(100);
  }, [currentSession, sessionDuration]);
  
  useEffect(() => {
    let interval: number | null = null;
    
    if (isRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete();
            if (interval) clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
        
        setProgress((timeRemaining - 1) / (sessionDuration * 60) * 100);
      }, 1000);
    } else if (!isRunning && interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeRemaining, sessionDuration, onComplete]);
  
  const togglePlayPause = () => {
    setIsRunning(!isRunning);
  };
  
  const stopSession = () => {
    setIsRunning(false);
    setTimeRemaining(sessionDuration * 60);
    setProgress(100);
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md relative">
        <svg className="w-full" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E5E7EB"
            className="dark:stroke-gray-700"
            strokeWidth="4"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#2DD4BF"
            className="dark:stroke-primary-500"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="283"
            strokeDashoffset={283 - (283 * progress) / 100}
            initial={{ strokeDashoffset: 283 }}
            animate={{ strokeDashoffset: 283 - (283 * progress) / 100 }}
            transition={{ duration: 0.5 }}
          />
          
          {/* Center text */}
          <text
            x="50"
            y="50"
            dominantBaseline="middle"
            textAnchor="middle"
            className="fill-gray-800 dark:fill-gray-200 text-3xl font-light"
          >
            {formatTime(timeRemaining)}
          </text>
        </svg>
      </div>
      
      <div className="flex space-x-4 mt-8">
        <Button
          variant="outline"
          onClick={togglePlayPause}
          icon={isRunning ? <PauseIcon className="h-5 w-5" /> : <PlayIcon className="h-5 w-5" />}
        >
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        
        <Button
          variant="outline"
          onClick={stopSession}
          icon={<StopIcon className="h-5 w-5" />}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default MeditationTimer;