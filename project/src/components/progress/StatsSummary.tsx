import { useMeditationStore } from '../../stores/meditationStore';
import { motion } from 'framer-motion';
import { 
  ClockIcon, 
  SparklesIcon, 
  CalendarIcon, 
  TrophyIcon 
} from '@heroicons/react/24/outline';

const StatsSummary = () => {
  const { sessions } = useMeditationStore();
  
  // Calculate total minutes meditated
  const totalMinutes = sessions.reduce((total, session) => {
    return total + (session.completed ? session.duration : 0);
  }, 0);
  
  // Calculate total sessions
  const totalSessions = sessions.length;
  
  // Calculate completion rate
  const completedSessions = sessions.filter(session => session.completed).length;
  const completionRate = totalSessions > 0 
    ? Math.round((completedSessions / totalSessions) * 100) 
    : 0;
  
  // Calculate streak (assuming sessions are sorted by date)
  const calculateStreak = () => {
    if (sessions.length === 0) return 0;
    
    // Sort sessions by date
    const sortedSessions = [...sessions]
      .filter(session => session.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (sortedSessions.length === 0) return 0;
    
    // Get today's date with time set to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Get the date of the most recent session
    const mostRecentDate = new Date(sortedSessions[0].date);
    mostRecentDate.setHours(0, 0, 0, 0);
    
    // If the most recent session is not from today or yesterday, streak is 0
    if ((today.getTime() - mostRecentDate.getTime()) > 24 * 60 * 60 * 1000) {
      return 0;
    }
    
    // Count consecutive days
    let streak = 1;
    let currentDate = mostRecentDate;
    
    for (let i = 1; i < sortedSessions.length; i++) {
      const sessionDate = new Date(sortedSessions[i].date);
      sessionDate.setHours(0, 0, 0, 0);
      
      // Check if this session is from the previous day
      const expectedPrevDate = new Date(currentDate);
      expectedPrevDate.setDate(expectedPrevDate.getDate() - 1);
      
      if (sessionDate.getTime() === expectedPrevDate.getTime()) {
        streak++;
        currentDate = sessionDate;
      } else {
        break;
      }
    }
    
    return streak;
  };
  
  const currentStreak = calculateStreak();
  
  const stats = [
    {
      title: 'Total Minutes',
      value: totalMinutes,
      icon: <ClockIcon className="h-6 w-6" />,
      color: 'from-primary-400 to-primary-500',
    },
    {
      title: 'Sessions',
      value: totalSessions,
      icon: <CalendarIcon className="h-6 w-6" />,
      color: 'from-secondary-400 to-secondary-500',
    },
    {
      title: 'Completion Rate',
      value: `${completionRate}%`,
      icon: <SparklesIcon className="h-6 w-6" />,
      color: 'from-emerald-400 to-emerald-500',
    },
    {
      title: 'Current Streak',
      value: currentStreak,
      icon: <TrophyIcon className="h-6 w-6" />,
      color: 'from-amber-400 to-amber-500',
    },
  ];
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-4">
        Your Progress
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className={`p-4 bg-gradient-to-r ${stat.color} text-white`}>
              {stat.icon}
            </div>
            <div className="p-4">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-gray-100 mt-1">
                {stat.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
      
      {totalSessions === 0 && (
        <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-800">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Begin your meditation journey now. Start a session to track your progress and build mindfulness habits.
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsSummary;