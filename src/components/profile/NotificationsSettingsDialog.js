import React from 'react';
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
} from '@mui/material';

const NotificationsSettingsDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>تنظیمات اعلانات</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>اعلانات ایمیل</InputLabel>
            <Select defaultValue="all" label="اعلانات ایمیل">
              <MenuItem value="all">همه اعلانات</MenuItem>
              <MenuItem value="important">فقط مهم</MenuItem>
              <MenuItem value="none">هیچ‌کدام</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>اعلانات سیستم</InputLabel>
            <Select defaultValue="enabled" label="اعلانات سیستم">
              <MenuItem value="enabled">فعال</MenuItem>
              <MenuItem value="disabled">غیرفعال</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>
        <Button variant="contained" onClick={onClose}>
          ذخیره تنظیمات
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotificationsSettingsDialog;
