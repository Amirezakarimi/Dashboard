import React from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

const UserDialog = ({ open, onClose, editingUser, formData, onInputChange, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {editingUser ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
          <TextField
            label="نام کامل"
            value={formData.name}
            onChange={onInputChange('name')}
            fullWidth
            required
            InputLabelProps={{
              required: true,
              sx: { '& .MuiFormLabel-asterisk': { color: 'red' } }
            }}
          />
          <TextField
            label="ایمیل"
            type="email"
            value={formData.email}
            onChange={onInputChange('email')}
            fullWidth
            required
            InputLabelProps={{
              required: true,
              sx: { '& .MuiFormLabel-asterisk': { color: 'red' } }
            }}
          />
          <FormControl fullWidth required>
            <InputLabel sx={{ '& .MuiFormLabel-asterisk': { color: 'red' } }}>
              نقش
            </InputLabel>
            <Select
              value={formData.role}
              label="نقش"
              onChange={onInputChange('role')}
            >
              <MenuItem value="user">کاربر</MenuItem>
              <MenuItem value="moderator">ناظر</MenuItem>
              <MenuItem value="admin">مدیر</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>وضعیت</InputLabel>
            <Select
              value={formData.status}
              label="وضعیت"
              onChange={onInputChange('status')}
            >
              <MenuItem value="active">فعال</MenuItem>
              <MenuItem value="inactive">غیرفعال</MenuItem>
              <MenuItem value="pending">در انتظار</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>انصراف</Button>
        <Button onClick={onSubmit} variant="contained">
          {editingUser ? 'به‌روزرسانی' : 'افزودن'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
