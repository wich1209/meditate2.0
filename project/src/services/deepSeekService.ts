import axios from 'axios';

const API_URL = 'https://api.deepseek.com/v1';

// This would normally be in an environment variable
// For demo purposes only - in production use a secure server-side approach
let API_KEY = 'sk_4e3ca8526329401b29e034b3a68f10375cc88920293ab6b5';

export const setApiKey = (key: string) => {
  API_KEY = key;
};

export const getApiKey = () => API_KEY;

export interface MeditationTechnique {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
  tags: string[];
}

// Mock data for demo purposes
const mockMeditationTechniques: MeditationTechnique[] = [
  {
    id: '1',
    title: 'Mindful Breathing',
    description: 'Focus on your breath to anchor yourself in the present moment.',
    duration: 10,
    difficulty: 'beginner',
    benefits: ['Reduces stress', 'Improves focus', 'Calms the mind'],
    tags: ['mindfulness', 'breathing', 'focus'],
  },
  {
    id: '2',
    title: 'Body Scan Relaxation',
    description: 'Progressively scan your body to release tension and promote relaxation.',
    duration: 15,
    difficulty: 'beginner',
    benefits: ['Reduces physical tension', 'Improves body awareness', 'Promotes relaxation'],
    tags: ['relaxation', 'body awareness', 'stress relief'],
  },
  {
    id: '3',
    title: 'Loving-Kindness Meditation',
    description: 'Develop feelings of goodwill, kindness, and warmth towards others.',
    duration: 20,
    difficulty: 'intermediate',
    benefits: ['Increases positive emotions', 'Builds compassion', 'Reduces negative feelings'],
    tags: ['compassion', 'positivity', 'kindness'],
  },
  {
    id: '4',
    title: 'Breath-Focused Zen Meditation',
    description: 'Count your breaths and return to counting when the mind wanders.',
    duration: 20,
    difficulty: 'intermediate',
    benefits: ['Improves concentration', 'Calms the mind', 'Develops mindfulness'],
    tags: ['zen', 'counting', 'focus'],
  },
  {
    id: '5',
    title: 'Visualization Meditation',
    description: 'Create a mental image of a peaceful place to induce relaxation.',
    duration: 15,
    difficulty: 'beginner',
    benefits: ['Reduces anxiety', 'Enhances creativity', 'Promotes relaxation'],
    tags: ['visualization', 'relaxation', 'imagery'],
  },
];

// Simulated API calls - these would use the real API in production
export const getTechniques = async (): Promise<MeditationTechnique[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMeditationTechniques;
};

export const getTechniqueById = async (id: string): Promise<MeditationTechnique | undefined> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMeditationTechniques.find(t => t.id === id);
};

export const getPersonalizedRecommendations = async (
  preferences: string[]
): Promise<MeditationTechnique[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  if (preferences.length === 0) {
    return mockMeditationTechniques.slice(0, 3);
  }
  
  // Simple filtering based on tags matching preferences
  return mockMeditationTechniques
    .filter(technique => 
      technique.tags.some(tag => preferences.includes(tag))
    )
    .slice(0, 3);
};

export const generateMeditationScript = async (
  params: {
    duration: number;
    focus: string;
    style: string;
  }
): Promise<string> => {
  // In a real implementation, this would call the DeepSeek API
  // For demo purposes, we'll return a static script
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const scripts = [
    "Begin by finding a comfortable seated position. Allow your spine to be tall but not rigid. Let your shoulders relax away from your ears. Close your eyes or lower your gaze. Take a deep breath in through your nose, filling your lungs completely. Hold for a moment, then exhale slowly through your mouth, releasing any tension. Continue breathing naturally, following the rhythm of your breath. With each inhale, imagine drawing in calm and clarity. With each exhale, let go of stress and distractions. If your mind wanders, gently guide your attention back to your breath without judgment.",
    
    "Find a comfortable position where you can remain alert yet relaxed. Close your eyes and bring awareness to your body. Notice any sensations without trying to change them. Begin to deepen your breath, inhaling fully and exhaling completely. As you breathe, scan your body from head to toe, observing areas of tension or discomfort. With each exhale, imagine releasing that tension, allowing your body to soften. Continue breathing mindfully, knowing that each breath brings you deeper into a state of relaxation.",
    
    "Settle into a comfortable position and gently close your eyes. Take a moment to feel the weight of your body supported beneath you. Begin by taking three deep breaths. Inhale through your nose for a count of four, hold briefly, then exhale through your mouth for a count of six. Now return to your natural breathing rhythm. Focus your attention on the sensation of each breath - the rise and fall of your chest, the air moving through your nostrils. When your mind wanders, as it naturally will, simply notice where it went and guide it back to your breath without criticism."
  ];
  
  return scripts[Math.floor(Math.random() * scripts.length)];
};