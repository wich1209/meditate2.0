import axios from 'axios';

const API_URL = 'https://api.elevenlabs.io/v1';

// This would normally be in an environment variable
// For demo purposes only - in production use a secure server-side approach
let API_KEY = 'sk_4e3ca8526329401b29e034b3a68f10375cc88920293ab6b5';

export const setApiKey = (key: string) => {
  API_KEY = key;
};

export const getApiKey = () => API_KEY;

export const getVoices = async () => {
  if (!API_KEY) {
    console.error('ElevenLabs API key is not set');
    return [];
  }
  
  try {
    const response = await axios.get(`${API_URL}/voices`, {
      headers: {
        'xi-api-key': API_KEY,
      },
    });
    
    return response.data.voices;
  } catch (error) {
    console.error('Error fetching voices:', error);
    return [];
  }
};

export const generateSpeech = async (
  text: string,
  voiceId: string = 'EXAVITQu4vr4xnSDxMaL',
) => {
  if (!API_KEY) {
    console.error('ElevenLabs API key is not set');
    return null;
  }
  
  try {
    const response = await axios.post(
      `${API_URL}/text-to-speech/${voiceId}`,
      {
        text,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: 0.75,
          similarity_boost: 0.75,
        },
      },
      {
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json',
        },
        responseType: 'blob',
      }
    );
    
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Error generating speech:', error);
    return null;
  }
};

// For demo/development only - use predefined audio files
export const getDemoAudio = (type: 'inhale' | 'hold' | 'exhale') => {
  const audioMap = {
    inhale: 'https://assets.mixkit.co/active_storage/sfx/2010/2010.wav',
    hold: 'https://assets.mixkit.co/active_storage/sfx/209/209.wav',
    exhale: 'https://assets.mixkit.co/active_storage/sfx/2011/2011.wav',
  };
  
  return audioMap[type];
};