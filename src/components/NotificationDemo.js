import React from 'react';
import { Button, Card, CardContent, Typography, Stack, Box } from '@mui/material';
import { useNotifications } from '../contexts/NotificationContext';
import {
  Notifications as NotificationsIcon,
  Telegram as TelegramIcon,
  Info as InfoIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

const NotificationDemo = () => {
  const { sendSystemNotification, isTelegramEnabled } = useNotifications();

  const handleTestNotification = (type) => {
    const notifications = {
      info: {
        title: 'اطلاعیه سیستم',
        message: 'این یک اعلان اطلاعاتی است که از طریق سیستم و تلگرام ارسال می‌شود.',
        type: 'info'
      },
      success: {
        title: 'عملیات موفق',
        message: 'عملیات با موفقیت انجام شد و اعلان ارسال گردید.',
        type: 'success'
      },
      warning: {
        title: 'هشدار سیستم',
        message: 'لطفاً توجه کنید که این یک اعلان هشدار است.',
        type: 'warning'
      },
      error: {
        title: 'خطای سیستم',
        message: 'خطایی در سیستم رخ داده است. لطفاً با پشتیبانی تماس بگیرید.',
        type: 'error'
      }
    };

    const notification = notifications[type];
    sendSystemNotification(notification.title, notification.message, notification.type);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon color="success" />;
      case 'warning':
        return <WarningIcon color="warning" />;
      case 'error':
        return <ErrorIcon color="error" />;
      default:
        return <InfoIcon color="info" />;
    }
  };

  return (
    <Card sx={{ mb: 3 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
          <NotificationsIcon color="primary" />
          <Typography variant="h6">تست سیستم اعلانات</Typography>
        </Stack>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          برای تست سیستم اعلانات، روی دکمه‌های زیر کلیک کنید. اعلانات از طریق مرورگر و تلگرام (در صورت فعال بودن) ارسال خواهند شد.
        </Typography>

        <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
          <Button
            variant="outlined"
            startIcon={getIcon('info')}
            onClick={() => handleTestNotification('info')}
          >
            اعلان اطلاعاتی
          </Button>
          
          <Button
            variant="outlined"
            startIcon={getIcon('success')}
            onClick={() => handleTestNotification('success')}
            color="success"
          >
            اعلان موفقیت
          </Button>
          
          <Button
            variant="outlined"
            startIcon={getIcon('warning')}
            onClick={() => handleTestNotification('warning')}
            color="warning"
          >
            اعلان هشدار
          </Button>
          
          <Button
            variant="outlined"
            startIcon={getIcon('error')}
            onClick={() => handleTestNotification('error')}
            color="error"
          >
            اعلان خطا
          </Button>
        </Stack>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TelegramIcon color={isTelegramEnabled ? 'success' : 'disabled'} />
            <Typography variant="body2" color="text.secondary">
              وضعیت تلگرام: {isTelegramEnabled ? 'فعال' : 'غیرفعال'}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NotificationDemo;
