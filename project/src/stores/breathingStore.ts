import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface BreathingPattern {
  id: string;
  name: string;
  description: string;
  inhale: number;
  hold1: number;
  exhale: number;
  hold2: number;
}

interface BreathingState {
  patterns: BreathingPattern[];
  currentPatternId: string;
  customDurations: {
    inhale: number;
    hold1: number;
    exhale: number;
    hold2: number;
  };
  isCustomPattern: boolean;
  setCurrentPattern: (id: string) => void;
  setCustomDurations: (durations: { inhale: number; hold1: number; exhale: number; hold2: number }) => void;
  toggleCustomPattern: () => void;
  getCurrentPattern: () => BreathingPattern;
}

const defaultPatterns: BreathingPattern[] = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Equal duration for all phases. Creates balance and calm.',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
  },
  {
    id: '4-7-8',
    name: '4-7-8 Technique',
    description: 'Promotes relaxation and helps with sleep.',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
  },
  {
    id: 'relaxing',
    name: 'Relaxing Breath',
    description: 'Extended exhale for deep relaxation.',
    inhale: 4,
    hold1: 4,
    exhale: 6,
    hold2: 2,
  },
];

export const useBreathingStore = create<BreathingState>()(
  persist(
    (set, get) => ({
      patterns: defaultPatterns,
      currentPatternId: 'box',
      customDurations: {
        inhale: 4,
        hold1: 4,
        exhale: 6,
        hold2: 0,
      },
      isCustomPattern: false,
      setCurrentPattern: (id) => set({ currentPatternId: id, isCustomPattern: false }),
      setCustomDurations: (durations) => set({ customDurations: durations }),
      toggleCustomPattern: () => set((state) => ({ isCustomPattern: !state.isCustomPattern })),
      getCurrentPattern: () => {
        const { patterns, currentPatternId, customDurations, isCustomPattern } = get();
        
        if (isCustomPattern) {
          return {
            id: 'custom',
            name: 'Custom Pattern',
            description: 'Personalized breathing pattern with custom durations.',
            ...customDurations
          };
        }
        
        return patterns.find(p => p.id === currentPatternId) || patterns[0];
      },
    }),
    {
      name: 'breathing-store',
    }
  )
);