import React from 'react';
import {
  Box,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Chip,
  IconButton,
  Divider,
  Button,
  Badge,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  Circle as CircleIcon,
} from '@mui/icons-material';

const notificationDrawerWidth = 400;

// داده‌های نمونه اعلانات
const sampleNotifications = [
  {
    id: 1,
    title: 'کاربر جدید ثبت نام کرد',
    message: 'کاربر "علی محمدی" در سیستم ثبت نام کرد',
    type: 'info',
    time: '2 دقیقه پیش',
    isRead: false,
    avatar: 'AM',
  },
  {
    id: 2,
    title: 'نظر جدید دریافت شد',
    message: 'نظر جدیدی برای مقاله "React برای مبتدیان" ارسال شد',
    type: 'warning',
    time: '15 دقیقه پیش',
    isRead: false,
    avatar: 'NM',
  },
  {
    id: 3,
    title: 'سیستم به‌روزرسانی شد',
    message: 'سیستم با موفقیت به نسخه 2.1.0 به‌روزرسانی شد',
    type: 'success',
    time: '1 ساعت پیش',
    isRead: true,
    avatar: 'SYS',
  },
  {
    id: 4,
    title: 'خطا در سرور',
    message: 'مشکل اتصال به سرور پایگاه داده رفع شد',
    type: 'error',
    time: '2 ساعت پیش',
    isRead: true,
    avatar: 'ERR',
  },
  {
    id: 5,
    title: 'پشتیبان‌گیری خودکار',
    message: 'پشتیبان‌گیری خودکار از پایگاه داده انجام شد',
    type: 'info',
    time: '3 ساعت پیش',
    isRead: true,
    avatar: 'BK',
  },
];

const NotificationDrawer = ({ open, onClose }) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircleIcon sx={{ color: 'success.main' }} />;
      case 'warning':
        return <WarningIcon sx={{ color: 'warning.main' }} />;
      case 'error':
        return <ErrorIcon sx={{ color: 'error.main' }} />;
      case 'info':
      default:
        return <InfoIcon sx={{ color: 'info.main' }} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'error':
        return 'error';
      case 'info':
      default:
        return 'info';
    }
  };

  const unreadCount = sampleNotifications.filter(n => !n.isRead).length;

  const handleNotificationClick = (notification) => {
    console.log('Notification clicked:', notification);
    // اینجا می‌توانید منطق علامت‌گذاری به عنوان خوانده شده را اضافه کنید
  };

  const handleMarkAllAsRead = () => {
    console.log('Mark all as read');
    // اینجا می‌توانید منطق علامت‌گذاری همه به عنوان خوانده شده را اضافه کنید
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: notificationDrawerWidth,
          backgroundColor: 'background.paper',
          boxShadow: '-4px 0 20px 0 rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <NotificationsIcon sx={{ color: 'primary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            اعلانات
          </Typography>
          {unreadCount > 0 && (
            <Badge
              badgeContent={unreadCount}
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.75rem',
                  minWidth: '20px',
                  height: '20px',
                },
              }}
            >
              <CircleIcon sx={{ fontSize: 16, color: 'transparent' }} />
            </Badge>
          )}
        </Box>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Actions */}
      {unreadCount > 0 && (
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="outlined"
            size="small"
            onClick={handleMarkAllAsRead}
            sx={{ width: '100%' }}
          >
            علامت‌گذاری همه به عنوان خوانده شده
          </Button>
        </Box>
      )}

      {/* Notifications List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <List sx={{ p: 0 }}>
          {sampleNotifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              <ListItem
                sx={{
                  px: 2,
                  py: 1.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: notification.isRead ? 'transparent' : 'action.hover',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                }}
                onClick={() => handleNotificationClick(notification)}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: `${getNotificationColor(notification.type)}.light`,
                      color: `${getNotificationColor(notification.type)}.main`,
                      fontSize: '0.875rem',
                      fontWeight: 600,
                    }}
                  >
                    {getNotificationIcon(notification.type)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: notification.isRead ? 400 : 600,
                          color: notification.isRead ? 'text.secondary' : 'text.primary',
                        }}
                      >
                        {notification.title}
                      </Typography>
                      {!notification.isRead && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: 'primary.main',
                          }}
                        />
                      )}
                    </Box>
                  }
                  secondary={
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          mb: 1,
                          lineHeight: 1.4,
                        }}
                      >
                        {notification.message}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography
                          variant="caption"
                          sx={{ color: 'text.disabled' }}
                        >
                          {notification.time}
                        </Typography>
                        <Chip
                          label={notification.type === 'info' ? 'اطلاعات' : 
                                 notification.type === 'success' ? 'موفقیت' :
                                 notification.type === 'warning' ? 'هشدار' : 'خطا'}
                          size="small"
                          color={getNotificationColor(notification.type)}
                          variant="outlined"
                          sx={{ height: 20, fontSize: '0.7rem' }}
                        />
                      </Box>
                    </Box>
                  }
                />
              </ListItem>
              {index < sampleNotifications.length - 1 && (
                <Divider sx={{ mx: 2 }} />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
        }}
      >
        <Button
          variant="text"
          size="small"
          fullWidth
          sx={{ color: 'text.secondary' }}
        >
          مشاهده همه اعلانات
        </Button>
      </Box>
    </Drawer>
  );
};

export default NotificationDrawer;
