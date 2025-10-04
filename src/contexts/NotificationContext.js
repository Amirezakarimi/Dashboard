import React, { createContext, useContext, useState, useCallback } from 'react';
import telegramService from '../services/telegramService';

const NotificationContext = createContext({
  sendNotification: () => {},
  sendSystemNotification: () => {},
  isTelegramEnabled: false,
  setTelegramEnabled: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [telegramEnabled, setTelegramEnabled] = useState(() => {
    try {
      const settings = localStorage.getItem('notificationSettings');
      return settings ? JSON.parse(settings).telegram?.enabled : false;
    } catch {
      return false;
    }
  });

  // Request notification permission on mount
  React.useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = useCallback(async (notification) => {
    const { title, message, type = 'info', channels = ['system'] } = notification;
    
    // Send system notification (browser notification)
    if (channels.includes('system')) {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
          body: message,
          icon: '/favicon.ico',
          tag: 'dashboard-notification'
        });
      }
    }

    // Send Telegram notification
    if (channels.includes('telegram') && telegramEnabled && telegramService.isConfigured()) {
      try {
        await telegramService.sendNotification({
          title,
          message,
          type,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Failed to send Telegram notification:', error);
      }
    }
  }, [telegramEnabled]);

  const sendSystemNotification = useCallback(async (title, message, type = 'info') => {
    await sendNotification({ title, message, type, channels: ['system', 'telegram'] });
  }, [sendNotification]);

  const handleSetTelegramEnabled = useCallback((enabled) => {
    setTelegramEnabled(enabled);
    try {
      const settings = JSON.parse(localStorage.getItem('notificationSettings') || '{}');
      settings.telegram = { ...settings.telegram, enabled };
      localStorage.setItem('notificationSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Failed to save Telegram settings:', error);
    }
  }, []);

  const value = {
    sendNotification,
    sendSystemNotification,
    isTelegramEnabled: telegramEnabled,
    setTelegramEnabled: handleSetTelegramEnabled,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
