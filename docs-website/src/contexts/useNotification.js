import { useContext } from 'react';
import { NotificationContext } from './NotificationContext';

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('ต้องใช้ useNotification ภายใน NotificationProvider');
    }
    
    return context;
};