import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import CommentCard from '../components/CommentCard';


const Comments = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [replyText, setReplyText] = useState('');

  // داده‌های نمونه نظرات
  // داده‌های کامنت‌ها از کامپوننت CommentCard استفاده می‌شود

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setPage(0);
  };


  const handleOpenReplyDialog = (comment) => {
    setSelectedComment(comment);
    setReplyText(comment.reply || '');
    setOpenReplyDialog(true);
  };

  const handleCloseReplyDialog = () => {
    setOpenReplyDialog(false);
    setSelectedComment(null);
    setReplyText('');
  };

  const handleSubmitReply = () => {
    console.log('Reply submitted:', replyText);
    handleCloseReplyDialog();
  };

  const handleApproveComment = (commentId) => {
    console.log('Comment approved:', commentId);
  };

  const handleRejectComment = (commentId) => {
    console.log('Comment rejected:', commentId);
  };

  const handleDeleteComment = (commentId) => {
    console.log('Comment deleted:', commentId);
  };

  const getStatusLabel = (status) => {
    const statuses = {
      approved: { label: 'تایید شده', color: 'success' },
      pending: { label: 'در انتظار', color: 'warning' },
      rejected: { label: 'رد شده', color: 'error' },
    };
    return statuses[status] || { label: 'نامشخص', color: 'default' };
  };

  // داده‌های نمونه کامنت‌ها برای آمار
  const sampleComments = [
    { status: 'approved' },
    { status: 'pending' },
    { status: 'approved' },
    { status: 'rejected' },
    { status: 'approved' },
    { status: 'pending' },
  ];

  // فیلتر کردن کامنت‌ها بر اساس وضعیت
  const filteredComments = sampleComments.filter(comment => {
    return selectedStatus === 'all' || comment.status === selectedStatus;
  });

  // آمار نظرات
  const stats = [
    { label: 'کل نظرات', value: sampleComments.length, color: 'primary.main' },
    { label: 'تایید شده', value: sampleComments.filter(c => c.status === 'approved').length, color: 'success.main' },
    { label: 'در انتظار', value: sampleComments.filter(c => c.status === 'pending').length, color: 'warning.main' },
    { label: 'رد شده', value: sampleComments.filter(c => c.status === 'rejected').length, color: 'error.main' },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{
        mb: 3,
        fontWeight: 700,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2.2rem'
      }}>
        مدیریت نظرات
      </Typography>

             {/* آمار کلی */}
       <Grid container spacing={3} sx={{ mb: 4 }}>
         {stats.map((stat, index) => (
           <Grid item xs={12} sm={6} md={3} key={index}>
             <Card sx={{ height: '100%' }}>
               <CardContent sx={{ textAlign: 'center' }}>
                 <Typography variant="h4" component="div" sx={{ fontWeight: 600, color: stat.color }}>
                   {stat.value}
                 </Typography>
                 <Typography color="text.secondary" variant="body2">
                   {stat.label}
                 </Typography>
               </CardContent>
             </Card>
           </Grid>
         ))}
       </Grid>

       {/* فیلتر وضعیت */}
       <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
         <FormControl sx={{ minWidth: 200 }}>
           <InputLabel>فیلتر بر اساس وضعیت</InputLabel>
           <Select
             value={selectedStatus}
             label="فیلتر بر اساس وضعیت"
             onChange={handleStatusChange}
           >
             <MenuItem value="all">همه نظرات</MenuItem>
             <MenuItem value="approved">تایید شده</MenuItem>
             <MenuItem value="pending">در انتظار</MenuItem>
             <MenuItem value="rejected">رد شده</MenuItem>
           </Select>
         </FormControl>
       </Box>

       {/* جدول نظرات */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>نظر</TableCell>
                <TableCell>محتوا</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell>تاریخ</TableCell>
                <TableCell>واکنش‌ها</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
                         <TableBody>
               {filteredComments.map((comment, index) => (
                 <CommentCard
                   key={index}
                   index={index}
                   onApprove={handleApproveComment}
                   onReject={handleRejectComment}
                   onReply={handleOpenReplyDialog}
                   onDelete={handleDeleteComment}
                 />
               ))}
             </TableBody>
          </Table>
        </TableContainer>

                 <TablePagination
           component="div"
           count={filteredComments.length}
           page={page}
           onPageChange={handleChangePage}
           rowsPerPage={rowsPerPage}
           onRowsPerPageChange={handleChangeRowsPerPage}
           labelRowsPerPage="تعداد ردیف در صفحه:"
           labelDisplayedRows={({ from, to, count }) => `${from}-${to} از ${count}`}
         />
      </Paper>

      {/* دیالوگ پاسخ */}
      <Dialog open={openReplyDialog} onClose={handleCloseReplyDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          پاسخ به نظر {selectedComment?.author}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              نظر: {selectedComment?.content}
            </Typography>
            <TextField
              label="پاسخ شما"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              fullWidth
              multiline
              rows={4}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReplyDialog}>انصراف</Button>
          <Button onClick={handleSubmitReply} variant="contained">
            ارسال پاسخ
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Comments;
