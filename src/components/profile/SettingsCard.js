import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import {
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Palette as PaletteIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

const SettingsCard = ({ onPasswordChange, onNotificationsSettings }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          تنظیمات حساب کاربری
        </Typography>
        
        <List>
          <ListItem>
            <ListItemIcon>
              <SecurityIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="تغییر رمز عبور"
              secondary="رمز عبور خود را به‌روزرسانی کنید"
            />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
                onClick={onPasswordChange}
              >
                تغییر رمز
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <NotificationsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="تنظیمات اعلانات"
              secondary="مدیریت اعلانات و ایمیل‌ها"
            />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
                onClick={onNotificationsSettings}
              >
                تنظیمات
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <PaletteIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="ظاهر و تم"
              secondary="تغییر رنگ‌ها و تم رابط کاربری"
            />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
              >
                تغییر تم
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
          
          <Divider />
          
          <ListItem>
            <ListItemIcon>
              <LanguageIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="زبان و منطقه زمانی"
              secondary="تنظیم زبان و منطقه زمانی"
            />
            <ListItemSecondaryAction>
              <Button
                variant="outlined"
                size="small"
              >
                تنظیمات
              </Button>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default SettingsCard;
