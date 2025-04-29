import { useMeditationStore, MeditationSession } from '../../stores/meditationStore';
import { useBreathingStore } from '../../stores/breathingStore';
import { motion } from 'framer-motion';

const SessionHistory = () => {
  const { sessions } = useMeditationStore();
  const { patterns } = useBreathingStore();
  
  // Sort sessions by date (most recent first)
  const sortedSessions = [...sessions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  const getPatternName = (patternId: string) => {
    const pattern = patterns.find(p => p.id === patternId);
    return pattern ? pattern.name : 'Custom Pattern';
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
  
  if (sessions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          You haven't completed any meditation sessions yet.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
        Session History
      </h2>
      
      <div className="overflow-hidden bg-white dark:bg-gray-800 shadow-sm rounded-lg border border-gray-200 dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortedSessions.map((session, index) => (
            <motion.li
              key={session.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {formatDate(session.date)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Pattern: {getPatternName(session.patternId)}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {session.duration} minutes
                  </span>
                  <div className="mt-1">
                    {session.completed ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400">
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400">
                        Incomplete
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SessionHistory;