import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Grid,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';

const PersonalInfoCard = ({ 
  userData, 
  formData, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onInputChange 
}) => {
  return (
    <Card sx={{ height: 'fit-content' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            اطلاعات شخصی
          </Typography>
          {!isEditing ? (
            <Button
              startIcon={<EditIcon />}
              variant="outlined"
              onClick={onEdit}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  border: 'none',
                },
              }}
            >
              ویرایش
            </Button>
          ) : (
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                startIcon={<SaveIcon />}
                variant="contained"
                onClick={onSave}
                sx={{
                  background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #45a049 0%, #3d8b40 100%)',
                  },
                }}
              >
                ذخیره
              </Button>
              <Button
                startIcon={<CancelIcon />}
                variant="outlined"
                onClick={onCancel}
              >
                انصراف
              </Button>
            </Box>
          )}
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="نام"
              value={isEditing ? formData.firstName : userData.firstName}
              onChange={(e) => onInputChange('firstName', e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="نام خانوادگی"
              value={isEditing ? formData.lastName : userData.lastName}
              onChange={(e) => onInputChange('lastName', e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ایمیل"
              value={isEditing ? formData.email : userData.email}
              onChange={(e) => onInputChange('email', e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="شماره تلفن"
              value={isEditing ? formData.phone : userData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="موقعیت مکانی"
              value={isEditing ? formData.location : userData.location}
              onChange={(e) => onInputChange('location', e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="سمت"
              value={isEditing ? formData.role : userData.role}
              onChange={(e) => onInputChange('role', e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="دپارتمان"
              value={isEditing ? formData.department : userData.department}
              onChange={(e) => onInputChange('department', e.target.value)}
              disabled={!isEditing}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="تاریخ عضویت"
              value={userData.joinDate}
              disabled
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoCard;
