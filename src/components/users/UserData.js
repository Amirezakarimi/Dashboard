import { useState } from 'react';

const useUserData = () => {
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

  const addUser = (userData) => {
    const newUser = {
      id: Math.max(...users.map(u => u.id)) + 1,
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status,
      avatar: userData.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      joinDate: new Date().toLocaleDateString('fa-IR'),
      lastLogin: '-',
    };
    setUsers(prevUsers => [...prevUsers, newUser]);
  };

  const updateUser = (userId, userData) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId 
          ? { ...user, ...userData }
          : user
      )
    );
  };

  const deleteUser = (userId) => {
    setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
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

  return {
    users,
    setUsers,
    addUser,
    updateUser,
    deleteUser,
    getRoleLabel,
    getStatusLabel,
  };
};

export default useUserData;
