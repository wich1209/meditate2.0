import { useState } from 'react';
import { useMeditationStore } from '../../stores/meditationStore';
import { Switch } from '@headlessui/react';
import { SpeakerWaveIcon, SpeakerXMarkIcon } from '@heroicons/react/24/outline';

const VoiceSettings = () => {
  const {
    voiceEnabled,
    voiceVolume,
    ambientSoundEnabled,
    ambientSoundVolume,
    toggleVoice,
    setVoiceVolume,
    toggleAmbientSound,
    setAmbientSoundVolume,
  } = useMeditationStore();
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
        Audio Settings
      </h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 space-y-6">
        {/* Voice Guidance */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                Voice Guidance
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Enable voice prompts during meditation sessions
              </p>
            </div>
            <Switch
              checked={voiceEnabled}
              onChange={toggleVoice}
              className={`${
                voiceEnabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2`}
            >
              <span
                className={`${
                  voiceEnabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          
          {voiceEnabled && (
            <div className="mt-4">
              <label htmlFor="voiceVolume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Voice Volume
              </label>
              <div className="flex items-center space-x-2">
                <SpeakerXMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <input
                  type="range"
                  id="voiceVolume"
                  min="0"
                  max="100"
                  value={voiceVolume}
                  onChange={(e) => setVoiceVolume(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <SpeakerWaveIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          )}
        </div>
        
        {/* Ambient Sounds */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-medium text-gray-800 dark:text-gray-100">
                Ambient Sounds
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Play calming background sounds during meditation
              </p>
            </div>
            <Switch
              checked={ambientSoundEnabled}
              onChange={toggleAmbientSound}
              className={`${
                ambientSoundEnabled ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
              } relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2`}
            >
              <span
                className={`${
                  ambientSoundEnabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
              />
            </Switch>
          </div>
          
          {ambientSoundEnabled && (
            <div className="mt-4">
              <label htmlFor="ambientVolume" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Ambient Volume
              </label>
              <div className="flex items-center space-x-2">
                <SpeakerXMarkIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                <input
                  type="range"
                  id="ambientVolume"
                  min="0"
                  max="100"
                  value={ambientSoundVolume}
                  onChange={(e) => setAmbientSoundVolume(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <SpeakerWaveIcon className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceSettings;