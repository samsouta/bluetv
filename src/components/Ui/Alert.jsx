import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

const alertStyles = {
  success: 'bg-[#2b4242] border-[#007c8e]',
  error: 'bg-[#675680] border-[#434d6d]',
  warning: 'bg-[#007c8e] border-[#93a4ab]',
  info: 'bg-[#7d8f8b] border-[#c3c6c3]',
};

const AlertIcon = ({ type }) => {
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info,
  };
  const Icon = icons[type];
  return <Icon className="w-6 h-6 text-white" />;
};

const Alert = ({ type = 'success', title, message, isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed top-4 right-4 z-50 max-w-md w-full"
        >
          <div
            className={`${alertStyles[type]} rounded-lg border-l-4 shadow-lg backdrop-blur-sm bg-opacity-95`}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <AlertIcon type={type} />
                </div>
                <div className="ml-3 w-full">
                  <h3 className="text-lg font-medium text-white mb-1">{title}</h3>
                  <p className="text-[#c3c6c3] text-sm">{message}</p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 inline-flex text-white hover:text-[#c3c6c3] transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5, ease: 'linear' }}
              className="h-1 bg-[#007c8e] origin-left"
              onAnimationComplete={onClose}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Alert);