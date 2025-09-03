import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Badge,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  AccountCircle as AccountCircleIcon,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import NotificationDrawer from './NotificationDrawer';

const menuItems = [
  { text: 'داشبورد', path: '/' },
  { text: 'کاربران', path: '/users' },
  { text: 'محتوا', path: '/content' },
  { text: 'نظرات', path: '/comments' },
];

const Header = ({ onDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationDrawerOpen, setNotificationDrawerOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const handleNotificationClick = () => {
    setNotificationDrawerOpen(true);
  };

  const handleNotificationClose = () => {
    setNotificationDrawerOpen(false);
  };

  const currentPageTitle = menuItems.find(item => item.path === location.pathname)?.text || 'داشبورد';

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          color: 'text.primary',
          boxShadow: '0 4px 20px 0 rgba(0, 0, 0, 0.08)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton
          
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography 
            variant="h6" 
            noWrap 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 600,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {currentPageTitle}
          </Typography>
          
          <IconButton 
            color="inherit" 
            sx={{ ml: 1 }}
            onClick={handleNotificationClick}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          
          <IconButton
            onClick={handleMenuOpen}
            color="inherit"
            sx={{ ml: 1 }}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32, 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
              }}
            >
              <AccountCircleIcon />
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            sx={{
              '& .MuiPaper-root': {
                borderRadius: 2,
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                border: '1px solid rgba(0, 0, 0, 0.05)',
              },
            }}
          >
            <MenuItem onClick={handleProfileClick}>
              <Typography variant="body2">پروفایل</Typography>
            </MenuItem>
            
            <Divider />
            <MenuItem onClick={handleMenuClose}>
              <Typography variant="body2" color="error.main">خروج</Typography>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <NotificationDrawer 
        open={notificationDrawerOpen}
        onClose={handleNotificationClose}
      />
    </>
  );
};

export default Header;
