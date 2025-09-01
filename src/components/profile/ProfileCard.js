import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
} from '@mui/material';

const ProfileCard = ({ userData }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'فعال':
        return 'success';
      case 'غیرفعال':
        return 'error';
      case 'در انتظار':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ 
      height: 'fit-content',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      position: 'relative',
      overflow: 'visible',
    }}>
      <CardContent sx={{ textAlign: 'center', pt: 4 }}>
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 2 }}>
          <Avatar
            sx={{
              width: 120,
              height: 120,
              fontSize: '2.5rem',
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              border: '4px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
            }}
          >
            {userData.avatar}
          </Avatar>
          <Chip
            label={userData.status}
            color={getStatusColor(userData.status)}
            size="small"
            sx={{
              position: 'absolute',
              bottom: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'white',
              color: 'text.primary',
              fontWeight: 600,
            }}
          />
        </Box>
        
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          {userData.firstName} {userData.lastName}
        </Typography>
        
        <Typography variant="body2" sx={{ opacity: 0.9, mb: 2 }}>
          {userData.role}
        </Typography>
        
        <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
          {userData.bio}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
          {userData.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.3)',
                },
              }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
