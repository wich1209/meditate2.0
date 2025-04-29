import { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { motion } from 'framer-motion';
import { useBreathingStore, BreathingPattern } from '../../stores/breathingStore';
import Button from '../common/Button';

const PatternSelector = () => {
  const {
    patterns,
    currentPatternId,
    isCustomPattern,
    customDurations,
    setCurrentPattern,
    setCustomDurations,
    toggleCustomPattern,
  } = useBreathingStore();
  
  const [showCustomForm, setShowCustomForm] = useState(false);
  
  const handleCustomChange = (key: keyof typeof customDurations, value: number) => {
    setCustomDurations({
      ...customDurations,
      [key]: value,
    });
  };
  
  const saveCustomPattern = () => {
    toggleCustomPattern();
    setShowCustomForm(false);
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
        Breathing Pattern
      </h2>
      
      <RadioGroup value={currentPatternId} onChange={setCurrentPattern}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patterns.map((pattern) => (
            <RadioGroup.Option
              key={pattern.id}
              value={pattern.id}
              className={({ checked }) => `
                ${
                  checked
                    ? 'bg-primary-50 border-primary-500 dark:bg-primary-900/30 dark:border-primary-400'
                    : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }
                relative rounded-lg border p-4 flex cursor-pointer transition-all duration-200
              `}
            >
              {({ checked }) => (
                <>
                  <div className="flex flex-col flex-grow">
                    <RadioGroup.Label
                      as="span"
                      className="font-medium text-gray-800 dark:text-gray-100"
                    >
                      {pattern.name}
                    </RadioGroup.Label>
                    <RadioGroup.Description
                      as="span"
                      className="text-sm text-gray-500 dark:text-gray-400 mt-1"
                    >
                      {pattern.description}
                    </RadioGroup.Description>
                    <div className="flex space-x-3 mt-2 text-sm text-gray-600 dark:text-gray-300">
                      <span>{pattern.inhale}s inhale</span>
                      <span>{pattern.hold1}s hold</span>
                      <span>{pattern.exhale}s exhale</span>
                      {pattern.hold2 > 0 && <span>{pattern.hold2}s hold</span>}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        checked
                          ? 'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400'
                          : 'border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      {checked && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          ))}
          
          <div
            className={`
              ${
                isCustomPattern
                  ? 'bg-primary-50 border-primary-500 dark:bg-primary-900/30 dark:border-primary-400'
                  : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }
              relative rounded-lg border p-4 flex cursor-pointer transition-all duration-200
            `}
            onClick={() => setShowCustomForm(true)}
          >
            <div className="flex flex-col flex-grow">
              <span className="font-medium text-gray-800 dark:text-gray-100">
                Custom Pattern
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Create your own breathing pattern with custom durations.
              </span>
              {isCustomPattern && (
                <div className="flex space-x-3 mt-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>{customDurations.inhale}s inhale</span>
                  <span>{customDurations.hold1}s hold</span>
                  <span>{customDurations.exhale}s exhale</span>
                  {customDurations.hold2 > 0 && <span>{customDurations.hold2}s hold</span>}
                </div>
              )}
            </div>
            <div className="flex items-center">
              <div
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  isCustomPattern
                    ? 'border-primary-500 bg-primary-500 dark:border-primary-400 dark:bg-primary-400'
                    : 'border-gray-300 dark:border-gray-600'
                }`}
              >
                {isCustomPattern && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
          </div>
        </div>
      </RadioGroup>
      
      {/* Custom pattern form */}
      {showCustomForm && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
        >
          <h3 className="font-medium text-gray-800 dark:text-gray-100 mb-4">
            Customize Your Breathing Pattern
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="inhale" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Inhale Duration (seconds)
              </label>
              <input
                type="number"
                id="inhale"
                min="1"
                max="10"
                value={customDurations.inhale}
                onChange={(e) => handleCustomChange('inhale', parseInt(e.target.value) || 1)}
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="hold1" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hold After Inhale (seconds)
              </label>
              <input
                type="number"
                id="hold1"
                min="0"
                max="10"
                value={customDurations.hold1}
                onChange={(e) => handleCustomChange('hold1', parseInt(e.target.value) || 0)}
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="exhale" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Exhale Duration (seconds)
              </label>
              <input
                type="number"
                id="exhale"
                min="1"
                max="10"
                value={customDurations.exhale}
                onChange={(e) => handleCustomChange('exhale', parseInt(e.target.value) || 1)}
                className="input"
              />
            </div>
            
            <div>
              <label htmlFor="hold2" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Hold After Exhale (seconds)
              </label>
              <input
                type="number"
                id="hold2"
                min="0"
                max="10"
                value={customDurations.hold2}
                onChange={(e) => handleCustomChange('hold2', parseInt(e.target.value) || 0)}
                className="input"
              />
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-2">
            <Button
              variant="outline"
              onClick={() => setShowCustomForm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={saveCustomPattern}
            >
              Save Pattern
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PatternSelector;