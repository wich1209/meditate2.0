import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 py-6 mt-12 border-t border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary-400 to-primary-600 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white"></div>
              </div>
              <span className="font-bold text-lg text-primary-600 dark:text-primary-400">
                TranquilBreath
              </span>
            </Link>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Find peace in every breath
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0 items-center">
            <Link to="/meditation" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
              Meditate
            </Link>
            <Link to="/progress" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
              Progress
            </Link>
            <Link to="/settings" className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400">
              Settings
            </Link>
          </div>
          
          <div className="mt-4 md:mt-0 text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} TranquilBreath. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;