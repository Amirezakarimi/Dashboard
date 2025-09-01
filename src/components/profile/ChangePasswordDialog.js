import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

const ChangePasswordDialog = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>تغییر رمز عبور</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 2 }}>
          <TextField
            fullWidth
            label="رمز عبور فعلی"
            type={showPassword ? 'text' : 'password'}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              ),
            }}
          />
          <TextField
            fullWidth
            label="رمز عبور جدید"
            type="password"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="تکرار رمز عبور جدید"
            type="password"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>
        <Button variant="contained" onClick={onClose}>
          تغییر رمز
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordDialog;
