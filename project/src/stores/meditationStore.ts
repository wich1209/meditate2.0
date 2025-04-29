import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MeditationSession {
  id: string;
  date: string;
  duration: number;
  patternId: string;
  completed: boolean;
}

interface MeditationState {
  sessions: MeditationSession[];
  currentSession: MeditationSession | null;
  sessionDuration: number;
  voiceEnabled: boolean;
  voiceVolume: number;
  ambientSoundEnabled: boolean;
  ambientSoundVolume: number;
  
  startSession: (patternId: string, duration: number) => void;
  completeSession: () => void;
  cancelSession: () => void;
  setSessionDuration: (duration: number) => void;
  toggleVoice: () => void;
  setVoiceVolume: (volume: number) => void;
  toggleAmbientSound: () => void;
  setAmbientSoundVolume: (volume: number) => void;
}

export const useMeditationStore = create<MeditationState>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSession: null,
      sessionDuration: 5,
      voiceEnabled: true,
      voiceVolume: 80,
      ambientSoundEnabled: true,
      ambientSoundVolume: 50,
      
      startSession: (patternId, duration) => {
        const newSession = {
          id: Date.now().toString(),
          date: new Date().toISOString(),
          duration,
          patternId,
          completed: false,
        };
        
        set({ currentSession: newSession });
      },
      
      completeSession: () => {
        const { currentSession, sessions } = get();
        if (!currentSession) return;
        
        const completedSession = { ...currentSession, completed: true };
        set({
          currentSession: null,
          sessions: [...sessions, completedSession],
        });
      },
      
      cancelSession: () => {
        set({ currentSession: null });
      },
      
      setSessionDuration: (duration) => {
        set({ sessionDuration: duration });
      },
      
      toggleVoice: () => {
        set((state) => ({ voiceEnabled: !state.voiceEnabled }));
      },
      
      setVoiceVolume: (volume) => {
        set({ voiceVolume: volume });
      },
      
      toggleAmbientSound: () => {
        set((state) => ({ ambientSoundEnabled: !state.ambientSoundEnabled }));
      },
      
      setAmbientSoundVolume: (volume) => {
        set({ ambientSoundVolume: volume });
      },
    }),
    {
      name: 'meditation-store',
    }
  )
);