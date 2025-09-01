import React, { useState } from 'react';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  Alert,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    // پاک کردن خطا هنگام تایپ
    if (error) setError('');
  };

  const handleCheckboxChange = (event) => {
    setFormData({
      ...formData,
      rememberMe: event.target.checked,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // اعتبارسنجی ساده
    if (!formData.email || !formData.password) {
      setError('لطفاً تمام فیلدها را پر کنید');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('لطفاً ایمیل معتبر وارد کنید');
      return;
    }

    if (formData.password.length < 6) {
      setError('رمز عبور باید حداقل 6 کاراکتر باشد');
      return;
    }

    // شبیه‌سازی ورود موفق
    console.log('Login attempt:', formData);
    
    // در اینجا می‌توانید API call برای ورود اضافه کنید
    // برای مثال:
    // try {
    //   const response = await loginAPI(formData);
    //   if (response.success) {
    //     navigate('/');
    //   }
    // } catch (error) {
    //   setError('خطا در ورود. لطفاً دوباره تلاش کنید');
    // }

    // فعلاً مستقیماً به داشبورد منتقل می‌کنیم
    navigate('/');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}
    >
      <Paper
        elevation={24}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          borderRadius: 3,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        {/* هدر */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'primary.main',
              mx: 'auto',
              mb: 2,
            }}
          >
            <LockIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
            ورود به سیستم
          </Typography>
          <Typography variant="body2" color="text.secondary">
            لطفاً اطلاعات ورود خود را وارد کنید
          </Typography>
        </Box>

        {/* فرم ورود */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TextField
            fullWidth
            label="ایمیل"
            type="email"
            value={formData.email}
            onChange={handleInputChange('email')}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <TextField
            fullWidth
            label="رمز عبور"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleInputChange('password')}
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                    size="small"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.rememberMe}
                  onChange={handleCheckboxChange}
                  color="primary"
                />
              }
              label="مرا به خاطر بسپار"
            />
            <Button
              variant="text"
              size="small"
              sx={{ textDecoration: 'underline' }}
            >
              فراموشی رمز عبور؟
            </Button>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            sx={{
              mt: 3,
              mb: 2,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #5a6fd8 30%, #6a4190 90%)',
              },
            }}
          >
            ورود
          </Button>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              حساب کاربری ندارید؟{' '}
              <Button
                variant="text"
                size="small"
                sx={{ textDecoration: 'underline', fontWeight: 600 }}
              >
                ثبت نام کنید
              </Button>
            </Typography>
          </Box>
        </Box>

        {/* اطلاعات اضافی */}
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            این سیستم برای مدیریت محتوا، کاربران و نظرات طراحی شده است
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
