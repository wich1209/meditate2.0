import { motion } from 'framer-motion';
import StatsSummary from '../components/progress/StatsSummary';
import SessionHistory from '../components/progress/SessionHistory';

const ProgressPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Your Progress
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Track your meditation journey and see your growth over time.
        </p>
      </div>
      
      <StatsSummary />
      
      <div className="card">
        <SessionHistory />
      </div>
    </motion.div>
  );
};

export default ProgressPage;