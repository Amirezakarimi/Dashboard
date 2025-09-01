import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Chip,
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
  TextareaAutosize,
  Avatar,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  ThumbUp as ThumbUpIcon,
  Comment as CommentIcon,
  Category as CategoryIcon,
} from '@mui/icons-material';

const Content = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [openDialog, setOpenDialog] = useState(false);
  const [editingContent, setEditingContent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'published',
    content: '',
  });

  // داده‌های نمونه محتوا
  const contents = [
    {
      id: 1,
      title: 'راهنمای کامل React برای مبتدیان',
      description: 'آموزش جامع React از مفاهیم پایه تا پیشرفته با مثال‌های عملی',
      category: 'programming',
      status: 'published',
      author: 'علی محمدی',
      publishDate: '1404/01/15',
      views: 1250,
      likes: 89,
      comments: 23,
      image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=400&h=200&fit=crop&auto=format',
    },
    {
      id: 2,
      title: 'آموزش TypeScript در 10 روز',
      description: 'یادگیری سریع TypeScript با پروژه‌های عملی و مثال‌های کاربردی',
      category: 'programming',
      status: 'published',
      author: 'فاطمه احمدی',
      publishDate: '1404/02/10',
      views: 890,
      likes: 67,
      comments: 18,
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=200&fit=crop&auto=format',
    },
    {
      id: 3,
      title: 'CSS Grid: راهنمای کامل',
      description: 'آموزش CSS Grid برای ایجاد لایه‌بندی‌های پیشرفته و ریسپانسیو',
      category: 'design',
      status: 'draft',
      author: 'محمد رضایی',
      publishDate: '1404/04/05',
      views: 450,
      likes: 34,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=200&fit=crop&auto=format',
    },
    {
      id: 4,
      title: 'JavaScript ES6+ Features',
      description: 'بررسی ویژگی‌های جدید JavaScript ES6 و بالاتر با مثال‌های عملی',
      category: 'programming',
      status: 'published',
      author: 'زهرا کریمی',
      publishDate: '1404/03/28',
      views: 1100,
      likes: 78,
      comments: 31,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop&auto=format',
    },
    {
      id: 5,
      title: 'طراحی UI/UX مدرن',
      description: 'اصول طراحی رابط کاربری مدرن و تجربه کاربری بهینه',
      category: 'design',
      status: 'published',
      author: 'حسین نوری',
      publishDate: '1404/01/20',
      views: 750,
      likes: 56,
      comments: 19,
      image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=200&fit=crop&auto=format',
    },
    {
      id: 6,
      title: 'Node.js برای توسعه‌دهندگان',
      description: 'آموزش Node.js و Express.js برای ساخت API و سرورهای وب',
      category: 'programming',
      status: 'draft',
      author: 'علی محمدی',
      publishDate: '1404/02/15',
      views: 320,
      likes: 28,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=200&fit=crop&auto=format',
    },
  ];

  const categories = [
    { value: 'all', label: 'همه دسته‌ها' },
    { value: 'programming', label: 'برنامه‌نویسی' },
    { value: 'design', label: 'طراحی' },
    { value: 'marketing', label: 'بازاریابی' },
    { value: 'business', label: 'کسب و کار' },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleOpenDialog = (content = null) => {
    if (content) {
      setEditingContent(content);
      setFormData({
        title: content.title,
        description: content.description,
        category: content.category,
        status: content.status,
        content: content.description,
      });
    } else {
      setEditingContent(null);
      setFormData({
        title: '',
        description: '',
        category: '',
        status: 'published',
        content: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingContent(null);
    setFormData({
      title: '',
      description: '',
      category: '',
      status: 'published',
      content: '',
    });
  };

  const handleSubmit = () => {
    console.log('Content data:', formData);
    handleCloseDialog();
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const getStatusLabel = (status) => {
    const statuses = {
      published: { label: 'منتشر شده', color: 'success' },
      draft: { label: 'پیش‌نویس', color: 'warning' },
      pending: { label: 'در انتظار', color: 'info' },
      archived: { label: 'آرشیو شده', color: 'default' },
    };
    return statuses[status] || { label: 'نامشخص', color: 'default' };
  };

  const getCategoryLabel = (category) => {
    const cats = {
      programming: { label: 'برنامه‌نویسی', color: 'primary' },
      design: { label: 'طراحی', color: 'secondary' },
      marketing: { label: 'بازاریابی', color: 'success' },
      business: { label: 'کسب و کار', color: 'info' },
    };
    return cats[category] || { label: 'نامشخص', color: 'default' };
  };

  const filteredContents = contents.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
      <Typography variant="h4" component="h1" sx={{ 
          fontWeight: 700,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: '2.2rem'
        }}>
          مدیریت محتوا
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
          افزودن محتوا
        </Button>
      </Box>

      {/* فیلترها */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <TextField
          placeholder="جستجو در محتوا..."
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>دسته‌بندی</InputLabel>
          <Select
            value={selectedCategory}
            label="دسته‌بندی"
            onChange={handleCategoryChange}
          >
            {categories.map((category) => (
              <MenuItem key={category.value} value={category.value}>
                {category.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* کارت‌های محتوا */}
      <Grid container spacing={3}>
        {filteredContents.map((content) => {
          const statusInfo = getStatusLabel(content.status);
          const categoryInfo = getCategoryLabel(content.category);
          
          return (
            <Grid item xs={12} sm={6} md={4} key={content.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={content.image}
                  alt={content.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={statusInfo.label}
                      color={statusInfo.color}
                      size="small"
                    />
                    <Chip
                      label={categoryInfo.label}
                      color={categoryInfo.color}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                    {content.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {content.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Avatar sx={{ width: 24, height: 24, fontSize: '0.75rem' }}>
                      {content.author.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                    <Typography variant="caption" color="text.secondary">
                      {content.author}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CommentIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      <Typography variant="caption" color="text.secondary">
                        {content.comments}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary">
                    منتشر شده در {content.publishDate}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
                  <Box>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(content)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Button size="small" variant="outlined">
                    مشاهده
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* دیالوگ افزودن/ویرایش محتوا */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingContent ? 'ویرایش محتوا' : 'افزودن محتوای جدید'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="عنوان"
              value={formData.title}
              onChange={handleInputChange('title')}
              fullWidth
            />
            <TextField
              label="توضیحات کوتاه"
              value={formData.description}
              onChange={handleInputChange('description')}
              fullWidth
              multiline
              rows={3}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>دسته‌بندی</InputLabel>
                <Select
                  value={formData.category}
                  label="دسته‌بندی"
                  onChange={handleInputChange('category')}
                >
                  <MenuItem value="programming">برنامه‌نویسی</MenuItem>
                  <MenuItem value="design">طراحی</MenuItem>
                  <MenuItem value="marketing">بازاریابی</MenuItem>
                  <MenuItem value="business">کسب و کار</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ flex: 1 }}>
                <InputLabel>وضعیت</InputLabel>
                <Select
                  value={formData.status}
                  label="وضعیت"
                  onChange={handleInputChange('status')}
                >
                  <MenuItem value="published">منتشر شده</MenuItem>
                  <MenuItem value="draft">پیش‌نویس</MenuItem>
                  <MenuItem value="pending">در انتظار</MenuItem>
                  <MenuItem value="archived">آرشیو شده</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField
              label="محتوای کامل"
              value={formData.content}
              onChange={handleInputChange('content')}
              fullWidth
              multiline
              rows={8}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>انصراف</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingContent ? 'به‌روزرسانی' : 'افزودن'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Content;
