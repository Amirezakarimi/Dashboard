import React, { useEffect, useMemo, useState } from 'react';
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

const LANGUAGE_OPTIONS = [
  { code: 'fa', label: 'فارسی' },
  { code: 'en', label: 'English' },
  { code: 'ar', label: 'العربية' },
];

const TIMEZONE_OPTIONS = [
  'Asia/Tehran',
  'UTC',
  'Europe/Berlin',
  'Europe/London',
  'America/New_York',
  'Asia/Dubai',
  'Asia/Istanbul',
];

const LanguageTimezoneDialog = ({ open, onClose, value, onChange }) => {
  const [localLang, setLocalLang] = useState(value?.language || 'fa');
  const [localTz, setLocalTz] = useState(value?.timezone || 'Asia/Tehran');

  useEffect(() => {
    if (!open) return;
    setLocalLang(value?.language || 'fa');
    setLocalTz(value?.timezone || 'Asia/Tehran');
  }, [open, value]);

  const handleSave = () => {
    onChange?.({ language: localLang, timezone: localTz });
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>زبان و منطقه زمانی</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>زبان</InputLabel>
            <Select value={localLang} label="زبان" onChange={(e) => setLocalLang(e.target.value)}>
              {LANGUAGE_OPTIONS.map((opt) => (
                <MenuItem key={opt.code} value={opt.code}>
                  {opt.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>منطقه زمانی</InputLabel>
            <Select value={localTz} label="منطقه زمانی" onChange={(e) => setLocalTz(e.target.value)}>
              {TIMEZONE_OPTIONS.map((tz) => (
                <MenuItem key={tz} value={tz}>
                  {tz}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>
        <Button variant="contained" onClick={handleSave}>
          ذخیره تنظیمات
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LanguageTimezoneDialog;
