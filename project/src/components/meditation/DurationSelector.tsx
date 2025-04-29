import { useState } from 'react';
import { useMeditationStore } from '../../stores/meditationStore';
import { RadioGroup } from '@headlessui/react';

const durations = [
  { value: 5, label: '5 min' },
  { value: 10, label: '10 min' },
  { value: 15, label: '15 min' },
  { value: 20, label: '20 min' },
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '60 min' },
];

const DurationSelector = () => {
  const { sessionDuration, setSessionDuration } = useMeditationStore();
  const [selectedDuration, setSelectedDuration] = useState(sessionDuration);
  
  const handleChange = (value: number) => {
    setSelectedDuration(value);
    setSessionDuration(value);
  };
  
  return (
    <div>
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
        Session Duration
      </h2>
      
      <RadioGroup value={selectedDuration} onChange={handleChange}>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {durations.map((option) => (
            <RadioGroup.Option
              key={option.value}
              value={option.value}
              className={({ active, checked }) => `
                ${
                  checked
                    ? 'bg-primary-100 border-primary-500 text-primary-700 dark:bg-primary-900/30 dark:border-primary-400 dark:text-primary-300'
                    : 'bg-white border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }
                relative rounded-lg shadow-sm border px-4 py-3 cursor-pointer flex justify-center items-center transition-all duration-200 focus:outline-none
              `}
            >
              <RadioGroup.Label as="p" className="font-medium">
                {option.label}
              </RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default DurationSelector;