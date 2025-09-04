import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Tabs,
  Tab,
  Button,
  Divider,
  Stack,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import ChangePasswordDialog from '../components/profile/ChangePasswordDialog';
import NotificationsSettingsDialog from '../components/profile/NotificationsSettingsDialog';
import LanguageTimezoneDialog from '../components/profile/LanguageTimezoneDialog';
import { ThemeModeContext } from '../contexts/ThemeModeContext';

const SectionCard = ({ title, icon, children, actions }) => (
  <Card sx={{ mb: 3 }}>
    <CardContent>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {icon}
          <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
        </Stack>
        {actions}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {children}
    </CardContent>
  </Card>
);

const Settings = () => {
  const [tab, setTab] = useState(0);
  const { mode, setMode, effectiveMode } = useContext(ThemeModeContext);

  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showNotificationsDialog, setShowNotificationsDialog] = useState(false);
  const [showLangTzDialog, setShowLangTzDialog] = useState(false);

  const [localeSettings, setLocaleSettings] = useState(() => {
    try {
      const raw = localStorage.getItem('localeSettings');
      return raw ? JSON.parse(raw) : { language: 'fa', timezone: 'Asia/Tehran' };
    } catch {
      return { language: 'fa', timezone: 'Asia/Tehran' };
    }
  });

  useEffect(() => {
    document.documentElement.lang = localeSettings.language;
    if (localeSettings.language === 'fa' || localeSettings.language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [localeSettings]);

  const handleLocaleChange = (next) => {
    setLocaleSettings(next);
    try { localStorage.setItem('localeSettings', JSON.stringify(next)); } catch {}
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 3 }}>
        <SettingsIcon color="primary" />
        <Typography variant="h4" sx={{ fontWeight: 700 }}>تنظیمات</Typography>
      </Stack>

      <Card sx={{ mb: 3 }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          <Tab label="حساب کاربری" icon={<SecurityIcon />} iconPosition="start" />
          <Tab label="اعلانات" icon={<NotificationsIcon />} iconPosition="start" />
          <Tab label="زبان و منطقه زمانی" icon={<LanguageIcon />} iconPosition="start" />
          <Tab label="ظاهر" icon={<PaletteIcon />} iconPosition="start" />
        </Tabs>
      </Card>

      {tab === 0 && (
        <SectionCard
          title="امنیت حساب"
          icon={<SecurityIcon color="primary" />}
          actions={
            <Button variant="outlined" onClick={() => setShowPasswordDialog(true)}>
              تغییر رمز عبور
            </Button>
          }
        >
          <Typography variant="body2" color="text.secondary">
            برای امنیت بیشتر، از رمز عبور قوی و منحصر به‌فرد استفاده کنید.
          </Typography>
        </SectionCard>
      )}

      {tab === 1 && (
        <SectionCard
          title="تنظیمات اعلانات"
          icon={<NotificationsIcon color="primary" />}
          actions={
            <Button variant="outlined" onClick={() => setShowNotificationsDialog(true)}>
              مدیریت اعلانات
            </Button>
          }
        >
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            نحوه دریافت اعلانات را مدیریت کنید.
          </Typography>
          <Chip label="ایمیل: همه" size="small" sx={{ mr: 1 }} />
          <Chip label="سیستم: فعال" size="small" />
        </SectionCard>
      )}

      {tab === 2 && (
        <SectionCard
          title="زبان و منطقه زمانی"
          icon={<LanguageIcon color="primary" />}
          actions={
            <Button variant="outlined" onClick={() => setShowLangTzDialog(true)}>
              تغییر زبان/منطقه زمانی
            </Button>
          }
        >
          <Stack direction="row" spacing={2}>
            <Chip label={`زبان: ${localeSettings.language}`} />
            <Chip label={`منطقه زمانی: ${localeSettings.timezone}`} />
          </Stack>
        </SectionCard>
      )}

      {tab === 3 && (
        <SectionCard
          title="ظاهر و تم"
          icon={<PaletteIcon color="primary" />}
        >
          <Stack spacing={2}>
            <Typography variant="body2" color="text.secondary">
              حالت تم را انتخاب کنید. حالت «سیستمی» مطابق تنظیمات سیستم‌عامل شما تغییر می‌کند.
            </Typography>

            <ToggleButtonGroup
              value={mode}
              exclusive
              onChange={(e, v) => {
                if (v) setMode(v);
              }}
              aria-label="theme mode"
              size="small"
              sx={{ direction: 'ltr' }}
            >
              <ToggleButton value="light" aria-label="light">روشن</ToggleButton>
              <ToggleButton value="dark" aria-label="dark">تاریک</ToggleButton>
              <ToggleButton value="system" aria-label="system">سیستمی</ToggleButton>
            </ToggleButtonGroup>

            <Stack direction="row" spacing={1} alignItems="center">
              <Chip label={`وضعیت فعلی: ${effectiveMode === 'dark' ? 'تاریک' : 'روشن'}`} color={effectiveMode === 'dark' ? 'default' : 'primary'} size="small" />
              <Chip label={`انتخاب شما: ${mode === 'system' ? 'سیستمی' : mode === 'dark' ? 'تاریک' : 'روشن'}`} size="small" />
            </Stack>
          </Stack>
        </SectionCard>
      )}

      {/* Dialogs */}
      <ChangePasswordDialog open={showPasswordDialog} onClose={() => setShowPasswordDialog(false)} />
      <NotificationsSettingsDialog open={showNotificationsDialog} onClose={() => setShowNotificationsDialog(false)} />
      <LanguageTimezoneDialog
        open={showLangTzDialog}
        onClose={() => setShowLangTzDialog(false)}
        value={localeSettings}
        onChange={handleLocaleChange}
      />
    </Box>
  );
};

export default Settings;
