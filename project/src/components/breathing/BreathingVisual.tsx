import { motion } from 'framer-motion';
import { BreathingPattern } from '../../stores/breathingStore';

interface BreathingVisualProps {
  breathState: 'inhale' | 'hold1' | 'exhale' | 'hold2' | 'paused';
  pattern: BreathingPattern;
}

const BreathingVisual = ({ breathState, pattern }: BreathingVisualProps) => {
  const circleVariants = {
    inhale: {
      scale: 1.5,
      transition: { duration: pattern.inhale, ease: 'easeInOut' }
    },
    hold1: {
      scale: 1.5,
      transition: { duration: pattern.hold1, ease: 'linear' }
    },
    exhale: {
      scale: 1,
      transition: { duration: pattern.exhale, ease: 'easeInOut' }
    },
    hold2: {
      scale: 1,
      transition: { duration: pattern.hold2, ease: 'linear' }
    },
    paused: {
      scale: 1,
      transition: { duration: 0.5 }
    }
  };
  
  // Generate 20 background particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 20 + 5,
    x: Math.random() * 100 - 50,
    y: Math.random() * 100 - 50,
    duration: Math.random() * 10 + 5,
    delay: Math.random() * 5,
  }));
  
  const getAnimationFor = (state: string) => {
    switch (state) {
      case 'inhale':
        return 'animate-breathe-in';
      case 'hold1':
        return 'animate-breathe-hold';
      case 'exhale':
        return 'animate-breathe-out';
      case 'hold2':
        return '';
      default:
        return 'animate-pulse-slow';
    }
  };
  
  const getGradientColors = () => {
    if (breathState === 'inhale' || breathState === 'hold1') {
      return 'from-primary-400 to-secondary-300';
    } else if (breathState === 'exhale' || breathState === 'hold2') {
      return 'from-secondary-400 to-primary-300';
    }
    return 'from-primary-400 to-primary-300';
  };
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-200 dark:bg-primary-800 opacity-20"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            x: [particle.x, -particle.x, particle.x],
            y: [particle.y, -particle.y, particle.y],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: particle.delay,
          }}
        />
      ))}
      
      {/* Outer ring */}
      <motion.div
        className={`absolute w-4/5 h-4/5 rounded-full border-2 border-primary-200 dark:border-primary-700 opacity-30`}
        variants={circleVariants}
        animate={breathState}
      />
      
      {/* Middle ring */}
      <motion.div
        className={`absolute w-3/5 h-3/5 rounded-full border-4 border-primary-300 dark:border-primary-600 opacity-50`}
        variants={circleVariants}
        animate={breathState}
      />
      
      {/* Inner circle */}
      <motion.div
        className={`w-2/5 h-2/5 rounded-full bg-gradient-to-r ${getGradientColors()} shadow-lg`}
        variants={circleVariants}
        animate={breathState}
      />
    </div>
  );
};

export default BreathingVisual;