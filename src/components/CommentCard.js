import React from 'react';
import {
  TableRow,
  TableCell,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Button,
  ButtonGroup,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbDown as ThumbDownIcon,
  Reply as ReplyIcon,
  Delete as DeleteIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
} from '@mui/icons-material';

const CommentCard = ({ comment, index = 0, onApprove, onReject, onReply, onDelete }) => {
  // داده‌های نمونه کامنت‌ها
  const sampleComments = [
    {
      id: 1,
      author: 'علی محمدی',
      avatar: 'AM',
      content: 'مقاله بسیار مفید و کاربردی بود. ممنون از اشتراک‌گذاری تجربیاتتون',
      contentTitle: 'راهنمای کامل React برای مبتدیان',
      status: 'approved',
      date: '1402/08/20',
      likes: 12,
      dislikes: 2,
      isReplied: true,
      reply: 'ممنون از نظر شما. خوشحالم که مفید بوده',
      replyDate: '1402/08/21',
    },
    {
      id: 2,
      author: 'فاطمه احمدی',
      avatar: 'FA',
      content: 'لطفاً مثال‌های بیشتری اضافه کنید. برای مبتدیان کمی سخت بود',
      contentTitle: 'آموزش TypeScript در 10 روز',
      status: 'pending',
      date: '1402/08/19',
      likes: 8,
      dislikes: 1,
      isReplied: false,
    },
    {
      id: 3,
      author: 'محمد رضایی',
      avatar: 'MR',
      content: 'عالی بود! دقیقاً همون چیزی بود که دنبالش می‌گشتم',
      contentTitle: 'CSS Grid: راهنمای کامل',
      status: 'approved',
      date: '1402/08/18',
      likes: 15,
      dislikes: 0,
      isReplied: false,
    },
    {
      id: 4,
      author: 'زهرا کریمی',
      avatar: 'ZK',
      content: 'ممنون از آموزش کاملتون. لطفاً بخش‌های بیشتری اضافه کنید',
      contentTitle: 'JavaScript ES6+ Features',
      status: 'rejected',
      date: '1402/08/17',
      likes: 5,
      dislikes: 3,
      isReplied: true,
      reply: 'در حال آماده‌سازی بخش‌های جدید هستیم',
      replyDate: '1402/08/18',
    },
    {
      id: 5,
      author: 'حسین نوری',
      avatar: 'HN',
      content: 'خیلی عالی بود! مخصوصاً بخش‌های عملی',
      contentTitle: 'طراحی UI/UX مدرن',
      status: 'approved',
      date: '1402/08/16',
      likes: 20,
      dislikes: 1,
      isReplied: false,
    },
    {
      id: 6,
      author: 'مریم صادقی',
      avatar: 'MS',
      content: 'لطفاً منابع بیشتری معرفی کنید',
      contentTitle: 'Node.js برای توسعه‌دهندگان',
      status: 'pending',
      date: '1402/08/15',
      likes: 3,
      dislikes: 0,
      isReplied: false,
    },
  ];

  // اگر comment prop داده نشده، از داده‌های نمونه استفاده کن
  const displayComment = comment || sampleComments[index];
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved':
        return 'تایید شده';
      case 'pending':
        return 'در انتظار';
      case 'rejected':
        return 'رد شده';
      default:
        return 'نامشخص';
    }
  };

  return (
    <TableRow hover sx={{
      transition: 'all 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(102, 126, 234, 0.02)',
      }
    }}>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
          <Avatar sx={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
            mt: 0.5
          }}>
            {displayComment.avatar}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
              {displayComment.author}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              {displayComment.content}
            </Typography>
            {displayComment.isReplied && (
              <Box sx={{
                backgroundColor: 'grey.100',
                p: 1,
                borderRadius: 1,
                border: '1px solid',
                borderColor: 'grey.300'
              }}>
                <Typography variant="caption" sx={{ fontWeight: 500, display: 'block', mb: 0.5 }}>
                  پاسخ:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {displayComment.reply}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </TableCell>
      <TableCell>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {displayComment.contentTitle}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip
          label={getStatusLabel(displayComment.status)}
          color={getStatusColor(displayComment.status)}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="text.secondary">
          {displayComment.date}
        </Typography>
      </TableCell>
      <TableCell>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ThumbUpIcon sx={{ fontSize: 16, color: 'success.main' }} />
            <Typography variant="caption" color="text.secondary">
              {displayComment.likes}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <ThumbDownIcon sx={{ fontSize: 16, color: 'error.main' }} />
            <Typography variant="caption" color="text.secondary">
              {displayComment.dislikes}
            </Typography>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          {displayComment.status === 'pending' && (
            <>
              <IconButton
                size="small"
                color="success"
                onClick={() => onApprove(displayComment.id)}
              >
                <ApproveIcon />
              </IconButton>
              <IconButton
                size="small"
                color="error"
                onClick={() => onReject(displayComment.id)}
              >
                <RejectIcon />
              </IconButton>
            </>
          )}
          <IconButton
            size="small"
            color="primary"
            onClick={() => onReply(displayComment)}
          >
            <ReplyIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => onDelete(displayComment.id)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
};

export default CommentCard;
