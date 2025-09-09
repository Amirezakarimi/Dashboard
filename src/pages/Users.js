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
  Chip,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import ExportCsvButton from '../components/ExportCsvButton';
import ExportPdfButton from '../components/ExportPdfButton';
import UserDialog from '../components/users/UserDialog';
import useUserData from '../components/users/UserData';

const Users = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    status: 'active',
  });

  // استفاده از کامپوننت مدیریت داده‌ها
  const { users, addUser, updateUser, deleteUser, getRoleLabel, getStatusLabel } = useUserData();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: '',
        status: 'active',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      role: '',
      status: 'active',
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.role) {
      alert('لطفاً تمام فیلدهای ضروری را پر کنید');
      return;
    }

    if (editingUser) {
      // ویرایش کاربر موجود
      updateUser(editingUser.id, formData);
    } else {
      // افزودن کاربر جدید
      addUser(formData);
    }
    
    handleCloseDialog();
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };



  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.2rem'
        }}>
          مدیریت کاربران
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ 
            borderRadius: 3,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
            px: 3,
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 20px rgba(102, 126, 234, 0.6)',
            }
          }}
        >
          افزودن کاربر
        </Button>
      </Box>

      {/* جستجو */}
      <Paper sx={{ 
        p: 3, 
        mb: 4,
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
        borderRadius: 3
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            placeholder="جستجو بر اساس نام یا ایمیل..."
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#667eea' }} />
                </InputAdornment>
              ),
            }}
            sx={{ 
              maxWidth: 500,
              flex: 1,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#667eea',
                  borderWidth: 2,
                },
              }
            }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <ExportCsvButton
              data={filteredUsers}
              columns={[
                { header: 'نام', value: 'name' },
                { header: 'ایمیل', value: 'email' },
                { header: 'نقش', value: (u) => getRoleLabel(u.role).label },
                { header: 'وضعیت', value: (u) => getStatusLabel(u.status).label },
                { header: 'تاریخ عضویت', value: 'joinDate' },
                { header: 'آخرین ورود', value: 'lastLogin' },
              ]}
              filename="users.csv"
              buttonProps={{
                sx: {
                  borderRadius: 2,
                  px: 2.5,
                  color: '#667eea',
                  borderColor: '#667eea',
                  '&:hover': {
                    backgroundColor: 'rgba(102, 126, 234, 0.08)',
                    borderColor: '#667eea',
                  },
                },
              }}
            />
            <ExportPdfButton
              title="گزارش کاربران"
              data={filteredUsers}
              columns={[
                { header: 'نام', value: 'name' },
                { header: 'ایمیل', value: 'email' },
                { header: 'نقش', value: (u) => getRoleLabel(u.role).label },
                { header: 'وضعیت', value: (u) => getStatusLabel(u.status).label },
                { header: 'تاریخ عضویت', value: 'joinDate' },
                { header: 'آخرین ورود', value: 'lastLogin' },
              ]}
              filename="users.pdf"
              orientation="l"
              buttonProps={{
                sx: {
                  borderRadius: 2,
                  px: 2.5,
                },
              }}
            />
          </Box>
        </Box>
      </Paper>

      {/* جدول کاربران */}
      <Paper sx={{
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
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10, 25, 50, 100]}
          labelRowsPerPage="تعداد ردیف در صفحه:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} از ${count}`}
          sx={{ borderBottom: '1px solid rgba(102, 126, 234, 0.1)', py: 1 }}
        />
        <TableContainer>
          <Table sx={{
            '& .MuiTableHead-root': {
              '& .MuiTableCell-root': {
                backgroundColor: 'rgba(102, 126, 234, 0.05)',
                fontWeight: 600,
                color: '#667eea',
                borderBottom: '2px solid rgba(102, 126, 234, 0.1)',
              }
            },
            '& .MuiTableRow-root': {
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: 'rgba(102, 126, 234, 0.02)',
              }
            }
          }}>
            <TableHead>
              <TableRow>
                <TableCell>کاربر</TableCell>
                <TableCell>نقش</TableCell>
                <TableCell>وضعیت</TableCell>
                <TableCell>تاریخ عضویت</TableCell>
                <TableCell>آخرین ورود</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => {
                const roleInfo = getRoleLabel(user.role);
                const statusInfo = getStatusLabel(user.status);
                
                return (
                  <TableRow key={user.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ 
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
                          fontWeight: 600,
                          fontSize: '0.9rem'
                        }}>
                          {user.avatar}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {user.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={roleInfo.label}
                        color={roleInfo.color}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={statusInfo.label}
                        color={statusInfo.color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{user.joinDate}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(user)}
                          sx={{
                            color: '#667eea',
                            '&:hover': {
                              backgroundColor: 'rgba(102, 126, 234, 0.1)',
                              transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            if (window.confirm('آیا از حذف این کاربر اطمینان دارید؟')) {
                              deleteUser(user.id);
                            }
                          }}
                          sx={{
                            color: '#e53e3e',
                            '&:hover': {
                              backgroundColor: 'rgba(229, 62, 62, 0.1)',
                              transform: 'scale(1.1)',
                            },
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* دیالوگ افزودن/ویرایش کاربر */}
      <UserDialog
        open={openDialog}
        onClose={handleCloseDialog}
        editingUser={editingUser}
        formData={formData}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};

export default Users;
