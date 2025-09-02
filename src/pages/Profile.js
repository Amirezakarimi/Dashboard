import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Alert,
} from '@mui/material';

// Import Components
import ProfileCard from '../components/profile/ProfileCard';
import PersonalInfoCard from '../components/profile/PersonalInfoCard';
import SettingsCard from '../components/profile/SettingsCard';
import ChangePasswordDialog from '../components/profile/ChangePasswordDialog';
import NotificationsSettingsDialog from '../components/profile/NotificationsSettingsDialog';
import LanguageTimezoneDialog from '../components/profile/LanguageTimezoneDialog';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showLangTzDialog, setShowLangTzDialog] = useState(false);
  const [localeSettings, setLocaleSettings] = useState(() => {
    try {
      const raw = localStorage.getItem('localeSettings');
      return raw ? JSON.parse(raw) : { language: 'fa', timezone: 'Asia/Tehran' };
    } catch {
      return { language: 'fa', timezone: 'Asia/Tehran' };
    }
  });
  const [showAlert, setShowAlert] = useState(false);
  
  // داده‌های نمونه کاربر
  const [userData, setUserData] = useState({
    firstName: 'امیررضا',
    lastName: 'کریمی',
    email: 'Amirreza.karimi@example.com',
    phone: '+98 912 345 6789',
    location: 'ساری، ایران',
    role: 'مدیر سیستم',
    department: 'فناوری اطلاعات',
    joinDate: '1402/01/15',
    avatar: 'AK',
    bio: 'توسعه‌دهنده ارشد با 5 سال تجربه در زمینه React و Node.js',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Docker'],
    status: 'فعال',
  });

  const [formData, setFormData] = useState(userData);

  const handleEdit = () => {
    setFormData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(formData);
    setIsEditing(false);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCancel = () => {
    setFormData(userData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePasswordChange = () => {
    setShowPasswordDialog(true);
  };

  const handleNotificationsSettings = () => {
    setShowSettingsDialog(true);
  };

  const handleLanguageTimezoneSettings = () => {
    setShowLangTzDialog(true);
  };

  const handleLocaleChange = (next) => {
    setLocaleSettings(next);
    try {
      localStorage.setItem('localeSettings', JSON.stringify(next));
    } catch {}
    // اعمال زبان و جهت صفحه
    document.documentElement.lang = next.language;
    if (next.language === 'fa' || next.language === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  };

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" component="h1" sx={{
        mb: 3,
        fontWeight: 700,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2.2rem'
      }}>
        پروفایل کاربر
      </Typography>

      {/* Alert */}
      {showAlert && (
        <Alert severity="success" sx={{ mb: 3 }}>
          اطلاعات پروفایل با موفقیت به‌روزرسانی شد!
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Profile Card */}
        <Grid item xs={12} md={4}>
          <ProfileCard userData={userData} />
        </Grid>

        {/* Details Card */}
        <Grid item xs={12} md={8}>
          <PersonalInfoCard
            userData={userData}
            formData={formData}
            isEditing={isEditing}
            onEdit={handleEdit}
            onSave={handleSave}
            onCancel={handleCancel}
            onInputChange={handleInputChange}
          />
        </Grid>

        {/* Settings Card */}
        <Grid item xs={12}>
          <SettingsCard
            onPasswordChange={handlePasswordChange}
            onNotificationsSettings={handleNotificationsSettings}
            onLanguageTimezoneSettings={handleLanguageTimezoneSettings}
          />
        </Grid>
      </Grid>

      {/* Dialogs */}
      <ChangePasswordDialog
        open={showPasswordDialog}
        onClose={() => setShowPasswordDialog(false)}
      />

      <NotificationsSettingsDialog
        open={showSettingsDialog}
        onClose={() => setShowSettingsDialog(false)}
      />

      <LanguageTimezoneDialog
        open={showLangTzDialog}
        onClose={() => setShowLangTzDialog(false)}
        value={localeSettings}
        onChange={handleLocaleChange}
      />
    </Box>
  );
};

export default Profile;
