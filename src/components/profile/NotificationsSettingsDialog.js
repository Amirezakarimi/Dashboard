import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
  Typography,
  Divider,
  Alert,
  Chip,
  Stack,
} from '@mui/material';
import {
  Telegram as TelegramIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';
import telegramService from '../../services/telegramService';

const NotificationsSettingsDialog = ({ open, onClose }) => {
  const [emailNotifications, setEmailNotifications] = useState('all');
  const [systemNotifications, setSystemNotifications] = useState('enabled');
  const [telegramEnabled, setTelegramEnabled] = useState(false);
  const [telegramBotToken, setTelegramBotToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [telegramConnectionStatus, setTelegramConnectionStatus] = useState('disconnected'); // 'disconnected', 'connecting', 'connected', 'error'
  const [telegramTestMessage, setTelegramTestMessage] = useState('');

  const handleTestTelegram = async () => {
    if (!telegramBotToken || !telegramChatId) {
      setTelegramConnectionStatus('error');
      return;
    }

    setTelegramConnectionStatus('connecting');
    
    try {
      // Initialize the telegram service
      telegramService.initialize(telegramBotToken, telegramChatId);
      
      // Test the connection
      const result = await telegramService.testConnection();
      
      if (result.success) {
        setTelegramConnectionStatus('connected');
      } else {
        setTelegramConnectionStatus('error');
      }
    } catch (error) {
      console.error('Telegram test failed:', error);
      setTelegramConnectionStatus('error');
    }
  };

  const handleSaveSettings = () => {
    // Save all notification settings
    const settings = {
      email: emailNotifications,
      system: systemNotifications,
      telegram: {
        enabled: telegramEnabled,
        botToken: telegramBotToken,
        chatId: telegramChatId,
      }
    };
    
    // In a real implementation, save to backend/localStorage
    console.log('Saving notification settings:', settings);
    onClose();
  };

  const getTelegramStatusIcon = () => {
    switch (telegramConnectionStatus) {
      case 'connected':
        return <CheckCircleIcon color="success" fontSize="small" />;
      case 'error':
        return <ErrorIcon color="error" fontSize="small" />;
      case 'connecting':
        return <Box sx={{ width: 16, height: 16, border: '2px solid #1976d2', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />;
      default:
        return <TelegramIcon color="action" fontSize="small" />;
    }
  };

  const getTelegramStatusText = () => {
    switch (telegramConnectionStatus) {
      case 'connected':
        return 'متصل';
      case 'error':
        return 'خطا در اتصال';
      case 'connecting':
        return 'در حال اتصال...';
      default:
        return 'قطع';
    }
  };

  const getTelegramStatusColor = () => {
    switch (telegramConnectionStatus) {
      case 'connected':
        return 'success';
      case 'error':
        return 'error';
      case 'connecting':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Stack direction="row" alignItems="center" spacing={1}>
          <TelegramIcon color="primary" />
          <Typography variant="h6">تنظیمات اعلانات</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          {/* Email Notifications */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>اعلانات ایمیل</InputLabel>
            <Select 
              value={emailNotifications} 
              onChange={(e) => setEmailNotifications(e.target.value)}
              label="اعلانات ایمیل"
            >
              <MenuItem value="all">همه اعلانات</MenuItem>
              <MenuItem value="important">فقط مهم</MenuItem>
              <MenuItem value="none">هیچ‌کدام</MenuItem>
            </Select>
          </FormControl>
          
          {/* System Notifications */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>اعلانات سیستم</InputLabel>
            <Select 
              value={systemNotifications} 
              onChange={(e) => setSystemNotifications(e.target.value)}
              label="اعلانات سیستم"
            >
              <MenuItem value="enabled">فعال</MenuItem>
              <MenuItem value="disabled">غیرفعال</MenuItem>
            </Select>
          </FormControl>

          <Divider sx={{ my: 3 }}>
            <Chip 
              icon={<TelegramIcon />} 
              label="اعلانات تلگرام" 
              color="primary" 
              variant="outlined"
            />
          </Divider>

          {/* Telegram Settings */}
          <Box sx={{ mb: 3 }}>
            <FormControlLabel
              control={
                <Switch
                  checked={telegramEnabled}
                  onChange={(e) => setTelegramEnabled(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography variant="body1">فعال‌سازی اعلانات تلگرام</Typography>
                  <Chip
                    icon={getTelegramStatusIcon()}
                    label={getTelegramStatusText()}
                    color={getTelegramStatusColor()}
                    size="small"
                    variant="outlined"
                  />
                </Stack>
              }
            />
          </Box>

          {telegramEnabled && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                برای دریافت اعلانات در تلگرام، ابتدا یک ربات تلگرام ایجاد کنید و توکن آن را وارد کنید.
              </Typography>

              <TextField
                fullWidth
                label="توکن ربات تلگرام"
                value={telegramBotToken}
                onChange={(e) => setTelegramBotToken(e.target.value)}
                placeholder="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                sx={{ mb: 2 }}
                helperText="توکن ربات را از @BotFather دریافت کنید"
              />

              <TextField
                fullWidth
                label="شناسه چت"
                value={telegramChatId}
                onChange={(e) => setTelegramChatId(e.target.value)}
                placeholder="@username یا شناسه عددی"
                sx={{ mb: 2 }}
                helperText="شناسه چت یا کانال مقصد را وارد کنید"
              />

              <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<TelegramIcon />}
                  onClick={handleTestTelegram}
                  disabled={!telegramBotToken || !telegramChatId || telegramConnectionStatus === 'connecting'}
                >
                  تست اتصال
                </Button>
                <Button
                  variant="text"
                  onClick={() => {
                    setTelegramBotToken('');
                    setTelegramChatId('');
                    setTelegramConnectionStatus('disconnected');
                  }}
                >
                  پاک کردن
                </Button>
              </Stack>

              {telegramConnectionStatus === 'error' && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  خطا در اتصال به تلگرام. لطفاً توکن و شناسه چت را بررسی کنید.
                </Alert>
              )}

              {telegramConnectionStatus === 'connected' && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  اتصال به تلگرام با موفقیت برقرار شد!
                </Alert>
              )}

              <TextField
                fullWidth
                label="پیام تست"
                value={telegramTestMessage}
                onChange={(e) => setTelegramTestMessage(e.target.value)}
                placeholder="پیام تستی برای ارسال به تلگرام..."
                multiline
                rows={2}
                sx={{ mb: 2 }}
              />

              <Button
                variant="contained"
                startIcon={<TelegramIcon />}
                onClick={async () => {
                  if (telegramTestMessage && telegramConnectionStatus === 'connected') {
                    try {
                      const result = await telegramService.sendMessage(telegramTestMessage);
                      if (result.success) {
                        alert('پیام تست با موفقیت ارسال شد!');
                      } else {
                        alert(`خطا در ارسال پیام: ${result.message}`);
                      }
                    } catch (error) {
                      alert('خطا در ارسال پیام تست');
                    }
                  }
                }}
                disabled={!telegramTestMessage || telegramConnectionStatus !== 'connected'}
                sx={{ mb: 2 }}
              >
                ارسال پیام تست
              </Button>
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>
        <Button variant="contained" onClick={handleSaveSettings}>
          ذخیره تنظیمات
        </Button>
      </DialogActions>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Dialog>
  );
};

export default NotificationsSettingsDialog;
