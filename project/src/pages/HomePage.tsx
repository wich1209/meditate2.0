import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import { 
  ArrowRightIcon, 
  HeartIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { useThemeStore } from '../stores/themeStore';

const HomePage = () => {
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  
  const features = [
    {
      title: 'Guided Breathing',
      description: 'Follow visual and audio cues to establish a calm breathing rhythm.',
      icon: <motion.div 
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 dark:text-primary-400" />
          <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 dark:text-primary-400" />
          <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600 dark:text-primary-400" />
        </svg>
      </motion.div>,
    },
    {
      title: 'Voice Guidance',
      description: 'Natural voice instructions guide you through each meditation session.',
      icon: <div className="h-12 w-12 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 18.5V19.5C12 20.6046 11.1046 21.5 10 21.5H9C7.89543 21.5 7 20.6046 7 19.5V18.5M12 18.5V6.5M12 18.5H16.5M12 6.5V5.5C12 4.39543 12.8954 3.5 14 3.5H15C16.1046 3.5 17 4.39543 17 5.5V6.5M12 6.5H7M17 6.5H19M7 6.5H5M16.5 18.5H19M5 18.5H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary-600 dark:text-secondary-400" />
        </svg>
      </div>,
    },
    {
      title: 'Personalized Experience',
      description: 'Customize breathing patterns, session durations, and voice preferences.',
      icon: <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
        <HeartIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
      </div>,
    },
    {
      title: 'Progress Tracking',
      description: 'Monitor your meditation journey with detailed statistics and insights.',
      icon: <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 21H4.6C4.03995 21 3.75992 21 3.54601 20.891C3.35785 20.7951 3.20487 20.6422 3.10899 20.454C3 20.2401 3 19.9601 3 19.4V3M7 15L11 10L15 13L19 8M19 8V12M19 8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400" />
        </svg>
      </div>,
    },
  ];
  
  return (
    <div className="space-y-12 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-50/80 via-white/40 to-secondary-50/80 dark:from-primary-950/30 dark:via-gray-900/0 dark:to-secondary-950/30"></div>
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 rounded-full bg-primary-200/40 dark:bg-primary-800/10 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 rounded-full bg-secondary-200/40 dark:bg-secondary-800/10 blur-3xl"></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-gray-800 dark:text-white"
          >
            Find Peace in <span className="text-primary-600 dark:text-primary-400">Every Breath</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
          >
            Tranquil moments, anytime, anywhere. Our guided breathing exercises and meditations help you 
            reduce stress, improve focus, and find your center.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button 
              size="lg"
              onClick={() => navigate('/meditation')}
              icon={<ArrowRightIcon className="h-5 w-5" />}
              className="px-8"
            >
              Start Meditating
            </Button>
            <Button 
              variant="outline"
              size="lg" 
              onClick={() => navigate('/progress')}
              className="px-8"
            >
              View Progress
            </Button>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto w-full max-w-4xl aspect-[16/9] rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-primary-600/40 dark:from-primary-600/30 dark:to-primary-800/50"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div 
                  animate={{ 
                    scale: [1, 1.5, 1.5, 1, 1],
                    opacity: [0.7, 0.9, 0.9, 0.7, 0.7],
                  }}
                  transition={{ 
                    duration: 14,
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                  className="w-40 h-40 rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center"
                >
                  <div className="text-xl text-primary-600 dark:text-primary-400 font-light">
                    Breathe
                  </div>
                </motion.div>
              </div>
              
              {/* Small floating elements */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 rounded-full bg-white dark:bg-gray-800 opacity-60"
                  style={{
                    top: `${25 + Math.random() * 50}%`,
                    left: `${25 + Math.random() * 50}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
            Mindfulness Made Simple
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our app combines beautiful design with powerful features to enhance your meditation practice.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
            >
              <div className="mb-4 text-primary-600 dark:text-primary-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-12">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600 rounded-2xl overflow-hidden shadow-lg">
          <div className="px-6 py-12 md:px-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Start Your Meditation Journey Today</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Take a few minutes each day to center yourself, reduce stress, and improve your well-being.
            </p>
            <Button
              onClick={() => navigate('/meditation')}
              className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 text-lg"
            >
              Begin Now
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;