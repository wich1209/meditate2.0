import { useState, useEffect } from 'react';
import { 
  setApiKey as setElevenLabsApiKey,
  getApiKey as getElevenLabsApiKey
} from '../../services/elevenLabsService';
import {
  setApiKey as setDeepSeekApiKey,
  getApiKey as getDeepSeekApiKey
} from '../../services/deepSeekService';
import Button from '../common/Button';

const ApiKeyForm = () => {
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [deepSeekKey, setDeepSeekKey] = useState('');
  const [saveStatus, setSaveStatus] = useState<{
    elevenLabs: 'idle' | 'success' | 'error';
    deepSeek: 'idle' | 'success' | 'error';
  }>({
    elevenLabs: 'idle',
    deepSeek: 'idle',
  });
  
  useEffect(() => {
    // Retrieve keys from services
    setElevenLabsKey(getElevenLabsApiKey() || '');
    setDeepSeekKey(getDeepSeekApiKey() || '');
  }, []);
  
  const handleSaveElevenLabs = () => {
    try {
      setElevenLabsApiKey(elevenLabsKey);
      setSaveStatus({ ...saveStatus, elevenLabs: 'success' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus((prev) => ({ ...prev, elevenLabs: 'idle' }));
      }, 3000);
    } catch (error) {
      setSaveStatus({ ...saveStatus, elevenLabs: 'error' });
    }
  };
  
  const handleSaveDeepSeek = () => {
    try {
      setDeepSeekApiKey(deepSeekKey);
      setSaveStatus({ ...saveStatus, deepSeek: 'success' });
      
      // Reset status after 3 seconds
      setTimeout(() => {
        setSaveStatus((prev) => ({ ...prev, deepSeek: 'idle' }));
      }, 3000);
    } catch (error) {
      setSaveStatus({ ...saveStatus, deepSeek: 'error' });
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
          API Keys
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Enter your API keys to enable voice synthesis and advanced meditation content.
        </p>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-6">
          {/* ElevenLabs API Key */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="elevenLabsKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                ElevenLabs API Key
              </label>
              <a
                href="https://elevenlabs.io/speech-synthesis"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
              >
                Get an API key
              </a>
            </div>
            <div className="flex space-x-2">
              <input
                type="password"
                id="elevenLabsKey"
                value={elevenLabsKey}
                onChange={(e) => setElevenLabsKey(e.target.value)}
                placeholder="Enter ElevenLabs API key"
                className="input flex-grow"
              />
              <Button
                onClick={handleSaveElevenLabs}
                disabled={!elevenLabsKey}
              >
                Save
              </Button>
            </div>
            {saveStatus.elevenLabs === 'success' && (
              <p className="mt-1 text-xs text-success-500">API key saved successfully</p>
            )}
            {saveStatus.elevenLabs === 'error' && (
              <p className="mt-1 text-xs text-error-500">Failed to save API key</p>
            )}
          </div>
          
          {/* DeepSeek API Key */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="deepSeekKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                DeepSeek API Key
              </label>
              <a
                href="https://deepseek.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
              >
                Get an API key
              </a>
            </div>
            <div className="flex space-x-2">
              <input
                type="password"
                id="deepSeekKey"
                value={deepSeekKey}
                onChange={(e) => setDeepSeekKey(e.target.value)}
                placeholder="Enter DeepSeek API key"
                className="input flex-grow"
              />
              <Button
                onClick={handleSaveDeepSeek}
                disabled={!deepSeekKey}
              >
                Save
              </Button>
            </div>
            {saveStatus.deepSeek === 'success' && (
              <p className="mt-1 text-xs text-success-500">API key saved successfully</p>
            )}
            {saveStatus.deepSeek === 'error' && (
              <p className="mt-1 text-xs text-error-500">Failed to save API key</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800 text-sm text-gray-700 dark:text-gray-300">
        <p className="font-medium text-primary-700 dark:text-primary-300 mb-1">Note:</p>
        <p>
          For this demo, API keys are stored in browser memory and will be lost when you refresh. 
          In a production app, these would be securely stored in your account.
        </p>
        <p className="mt-2">
          You can still use the app without API keys, but some features will use pre-recorded voices 
          and example meditation content instead of personalized content.
        </p>
      </div>
    </div>
  );
};

export default ApiKeyForm;