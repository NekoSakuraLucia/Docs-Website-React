import { createContext, useContext, useState } from 'react';
import Notification from '../components/Common/Notification';

const NotificationContext = createContext();

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

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('ต้องใช้ useNotification ภายใน NotificationProvider');
  }
  return context;
};
