import { useState } from 'react';
import Notification from '../components/Common/Notification';
import { NotificationContext } from './NotificationContext';
import PropTypes from 'prop-types';

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    isVisible: false,
    message: '',
    isSuccess: true
  });

  const showNotification = (message, isSuccess = true) => {
    setNotification({ isVisible: true, message, isSuccess });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <Notification
        {...notification}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired
};
