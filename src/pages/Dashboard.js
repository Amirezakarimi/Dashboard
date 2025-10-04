import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  People as PeopleIcon,
  Article as ArticleIcon,
  Comment as CommentIcon,
  TrendingUp as TrendingUpIcon,
  Visibility as VisibilityIcon,
  ThumbUp as ThumbUpIcon,
} from '@mui/icons-material';
import VisitsAreaChart from '../components/charts/VisitsAreaChart';
import NotificationDemo from '../components/NotificationDemo';

const StatCard = ({ title, value, icon, color, change }) => (
  <Card sx={{ 
    height: '100%',
    background: (theme) =>
      theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #0b1220 0%, #111827 100%)'
        : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
    border: (theme) =>
      theme.palette.mode === 'dark'
        ? '1px solid rgba(255, 255, 255, 0.08)'
        : '1px solid rgba(0, 0, 0, 0.05)',
    boxShadow: (theme) =>
      theme.palette.mode === 'dark'
        ? '0 4px 20px rgba(0, 0, 0, 0.45)'
        : '0 4px 20px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: (theme) =>
        theme.palette.mode === 'dark'
          ? '0 8px 30px rgba(0, 0, 0, 0.55)'
          : '0 8px 30px rgba(0, 0, 0, 0.12)',
    }
  }}>
    <CardContent sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography color="textSecondary" gutterBottom variant="body2" sx={{ 
            fontWeight: 500,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontSize: '0.75rem'
          }}>
            {title}
          </Typography>
          <Typography variant="h4" component="div" sx={{ 
            fontWeight: 700,
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1
          }}>
            {value}
          </Typography>
          {change && (
            <Typography variant="body2" color="success.main" sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              mt: 1,
              fontWeight: 500
            }}>
              <TrendingUpIcon sx={{ fontSize: 16, mr: 0.5 }} />
              {change}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
            borderRadius: 3,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 15px ${color}40`,
          }}
        >
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const Dashboard = () => {
  const stats = [
    {
      title: 'کل کاربران',
      value: '2,847',
      icon: <PeopleIcon sx={{ color: 'white', fontSize: 28 }} />,
      color: '#3b82f6',
      change: '+12% از ماه گذشته',
    },
    {
      title: 'کل محتوا',
      value: '1,234',
      icon: <ArticleIcon sx={{ color: 'white', fontSize: 28 }} />,
      color: '#7c3aed',
      change: '+8% از ماه گذشته',
    },
    {
      title: 'کل نظرات',
      value: '5,678',
      icon: <CommentIcon sx={{ color: 'white', fontSize: 28 }} />,
      color: '#10b981',
      change: '+15% از ماه گذشته',
    },
    {
      title: 'بازدید کل',
      value: '45.2K',
      icon: <VisibilityIcon sx={{ color: 'white', fontSize: 28 }} />,
      color: '#f59e0b',
      change: '+22% از ماه گذشته',
    },
  ];

  const recentActivities = [
    { text: 'کاربر جدید "علی محمدی" ثبت نام کرد', time: '2 دقیقه پیش' },
    { text: 'مقاله "راهنمای React" منتشر شد', time: '15 دقیقه پیش' },
    { text: 'نظر جدید روی مقاله "TypeScript" اضافه شد', time: '1 ساعت پیش' },
    { text: 'کاربر "فاطمه احمدی" پروفایل خود را به‌روزرسانی کرد', time: '2 ساعت پیش' },
    { text: 'مقاله "CSS Grid" ویرایش شد', time: '3 ساعت پیش' },
  ];

  const topContent = [
    { title: 'راهنمای کامل React', views: '12.5K', likes: '847' },
    { title: 'آموزش TypeScript', views: '8.9K', likes: '623' },
    { title: 'CSS Grid در عمل', views: '6.7K', likes: '445' },
    { title: 'JavaScript ES6+', views: '5.4K', likes: '389' },
  ];

  const visitsData = [
    { label: 'فروردین', visits: 3200 },
    { label: 'اردیبهشت', visits: 4100 },
    { label: 'خرداد', visits: 3800 },
    { label: 'تیر', visits: 4600 },
    { label: 'مرداد', visits: 5200 },
    { label: 'شهریور', visits: 6100 },
    { label: 'مهر', visits: 5800 },
    { label: 'آبان', visits: 6700 },
    { label: 'آذر', visits: 7400 },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        fontWeight: 700, 
        mb: 4,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2.5rem'
      }}>
        داشبورد
      </Typography>

      {/* آمار کلی */}
      <Grid container spacing={3} sx={{ mb: 4, width: '100%' }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* تست سیستم اعلانات */}
      <NotificationDemo />

      <Grid container spacing={3} sx={{ width: '100%' }}>
        {/* نمودار بازدید کل */}
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 3, 
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #0b1220 0%, #111827 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.08)'
                : '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.45)'
                : '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 8px 30px rgba(0, 0, 0, 0.55)'
                  : '0 8px 30px rgba(0, 0, 0, 0.12)',
            }
          }}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 700, 
              mb: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              روند بازدید کل (ماهانه)
            </Typography>
            <VisitsAreaChart data={visitsData} />
          </Paper>
        </Grid>
        {/* فعالیت‌های اخیر */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #0b1220 0%, #111827 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.08)'
                : '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.45)'
                : '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 8px 30px rgba(0, 0, 0, 0.55)'
                  : '0 8px 30px rgba(0, 0, 0, 0.12)',
            }
          }}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 700, 
              mb: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              فعالیت‌های اخیر
            </Typography>
            <List>
              {recentActivities.map((activity, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          backgroundColor: 'primary.main',
                        }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={activity.text}
                      secondary={activity.time}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                  {index < recentActivities.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* محتوای محبوب */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ 
            p: 3, 
            height: '100%',
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #0b1220 0%, #111827 100%)'
                : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(255, 255, 255, 0.08)'
                : '1px solid rgba(0, 0, 0, 0.05)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0, 0, 0, 0.45)'
                : '0 4px 20px rgba(0, 0, 0, 0.08)',
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 8px 30px rgba(0, 0, 0, 0.55)'
                  : '0 8px 30px rgba(0, 0, 0, 0.12)',
            }
          }}>
            <Typography variant="h6" gutterBottom sx={{ 
              fontWeight: 700, 
              mb: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              محتوای محبوب
            </Typography>
            <List>
              {topContent.map((content, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                        {index + 1}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText
                      primary={content.title}
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <VisibilityIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {content.views}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <ThumbUpIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="caption" color="text.secondary">
                              {content.likes}
                            </Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < topContent.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
