import { motion } from 'framer-motion';
import ApiKeyForm from '../components/settings/ApiKeyForm';
import VoiceSettings from '../components/settings/VoiceSettings';

const SettingsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Customize your meditation experience and manage your preferences.
        </p>
      </div>
      
      <div className="space-y-8">
        <div className="card">
          <VoiceSettings />
        </div>
        
        <div className="card">
          <ApiKeyForm />
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;