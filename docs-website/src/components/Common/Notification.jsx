import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCopy } from 'react-icons/fi';
import PropTypes from 'prop-types';

const Notification = ({ message, isSuccess = true, onClose, isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div
            className={`
              px-6 py-3 rounded-xl shadow-lg
              backdrop-blur-xl flex items-center gap-3
              border border-white/20
              ${isSuccess 
                ? 'bg-green-500/20 text-green-500 dark:text-green-400' 
                : 'bg-red-500/20 text-red-500 dark:text-red-400'
              }
            `}
          >
            <div className={`
              w-8 h-8 rounded-full flex items-center justify-center
              ${isSuccess 
                ? 'bg-green-500/10' 
                : 'bg-red-500/10'
              }
            `}>
              {isSuccess ? <FiCopy className="w-4 h-4" /> : <FiX className="w-4 h-4" />}
            </div>

            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {isSuccess ? 'Copied!' : 'Error'}
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {message}
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="ml-2 p-1 hover:bg-gray-500/10 rounded-full"
            >
              <FiX className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  isSuccess: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default Notification;
