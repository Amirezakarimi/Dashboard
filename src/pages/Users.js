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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
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

  // داده‌های نمونه کاربران
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'علی محمدی',
      email: 'ali@example.com',
      role: 'admin',
      status: 'active',
      avatar: 'AM',
      joinDate: '1402/01/15',
      lastLogin: '1402/08/20',
    },
    {
      id: 2,
      name: 'فاطمه احمدی',
      email: 'fateme@example.com',
      role: 'user',
      status: 'active',
      avatar: 'FA',
      joinDate: '1402/02/10',
      lastLogin: '1402/08/19',
    },
    {
      id: 3,
      name: 'محمد رضایی',
      email: 'mohammad@example.com',
      role: 'moderator',
      status: 'inactive',
      avatar: 'MR',
      joinDate: '1402/03/05',
      lastLogin: '1402/07/15',
    },
    {
      id: 4,
      name: 'زهرا کریمی',
      email: 'zahra@example.com',
      role: 'user',
      status: 'active',
      avatar: 'ZK',
      joinDate: '1402/04/20',
      lastLogin: '1402/08/18',
    },
    {
      id: 5,
      name: 'حسین نوری',
      email: 'hossein@example.com',
      role: 'user',
      status: 'active',
      avatar: 'HN',
      joinDate: '1402/05/12',
      lastLogin: '1402/08/17',
    },
  ]);

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
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === editingUser.id 
            ? { ...user, ...formData }
            : user
        )
      );
    } else {
      // افزودن کاربر جدید
      const newUser = {
        id: Math.max(...users.map(u => u.id)) + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: formData.status,
        avatar: formData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
        joinDate: new Date().toLocaleDateString('fa-IR'),
        lastLogin: '-',
      };
      setUsers(prevUsers => [...prevUsers, newUser]);
    }
    
    handleCloseDialog();
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const getRoleLabel = (role) => {
    const roles = {
      admin: { label: 'مدیر', color: 'error' },
      moderator: { label: 'ناظر', color: 'warning' },
      user: { label: 'کاربر', color: 'default' },
    };
    return roles[role] || { label: 'نامشخص', color: 'default' };
  };

  const getStatusLabel = (status) => {
    const statuses = {
      active: { label: 'فعال', color: 'success' },
      inactive: { label: 'غیرفعال', color: 'error' },
      pending: { label: 'در انتظار', color: 'warning' },
    };
    return statuses[status] || { label: 'نامشخص', color: 'default' };
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
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        borderRadius: 3
      }}>
        <TextField
          fullWidth
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
      </Paper>

      {/* جدول کاربران */}
      <Paper sx={{
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        borderRadius: 3,
        overflow: 'hidden'
      }}>
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
                              setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
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
        
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="تعداد ردیف در صفحه:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} از ${count}`}
        />
      </Paper>

      {/* دیالوگ افزودن/ویرایش کاربر */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingUser ? 'ویرایش کاربر' : 'افزودن کاربر جدید'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
                         <TextField
               label="نام کامل"
               value={formData.name}
               onChange={handleInputChange('name')}
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
               onChange={handleInputChange('email')}
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
                 onChange={handleInputChange('role')}
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
                onChange={handleInputChange('status')}
              >
                <MenuItem value="active">فعال</MenuItem>
                <MenuItem value="inactive">غیرفعال</MenuItem>
                <MenuItem value="pending">در انتظار</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>انصراف</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingUser ? 'به‌روزرسانی' : 'افزودن'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Users;
