import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  LinearProgress,
  Alert,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Image as ImageIcon,
} from '@mui/icons-material';

const ImageUpload = ({ 
  value, 
  onChange, 
  onError, 
  maxSize = 5, // MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  disabled = false,
  label = 'آپلود عکس',
  helperText = 'فایل‌های مجاز: JPG, PNG, GIF, WebP (حداکثر 5 مگابایت)'
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const validateFile = (file) => {
    // بررسی نوع فایل
    if (!acceptedTypes.includes(file.type)) {
      const errorMsg = 'نوع فایل مجاز نیست. لطفاً فایل تصویری انتخاب کنید.';
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return false;
    }

    // بررسی اندازه فایل
    if (file.size > maxSize * 1024 * 1024) {
      const errorMsg = `اندازه فایل نباید بیشتر از ${maxSize} مگابایت باشد.`;
      setError(errorMsg);
      if (onError) onError(errorMsg);
      return false;
    }

    return true;
  };

  const handleFile = (file) => {
    if (!validateFile(file)) return;

    setError(null);
    setUploading(true);
    setUploadProgress(0);

    // شبیه‌سازی آپلود
    const reader = new FileReader();
    
    reader.onprogress = (e) => {
      if (e.lengthComputable) {
        const progress = (e.loaded / e.total) * 100;
        setUploadProgress(progress);
      }
    };

    reader.onload = (e) => {
      const result = e.target.result;
      setUploading(false);
      setUploadProgress(100);
      
      // ایجاد URL برای پیش‌نمایش
      const imageUrl = URL.createObjectURL(file);
      
      const imageData = {
        file: file,
        url: imageUrl,
        name: file.name,
        size: file.size,
        type: file.type,
        base64: result
      };

      if (onChange) {
        onChange(imageData);
      }
    };

    reader.onerror = () => {
      setError('خطا در خواندن فایل');
      setUploading(false);
      if (onError) onError('خطا در خواندن فایل');
    };

    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (disabled) return;

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleRemove = () => {
    if (value && value.url) {
      URL.revokeObjectURL(value.url);
    }
    if (onChange) {
      onChange(null);
    }
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 بایت';
    const k = 1024;
    const sizes = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes.join(',')}
        onChange={handleFileInput}
        style={{ display: 'none' }}
        disabled={disabled}
      />

             {value && value.url ? (
         // نمایش عکس انتخاب شده
         <Paper
           elevation={2}
           sx={{
             p: 1.5,
             border: '2px dashed',
             borderColor: 'primary.main',
             borderRadius: 2,
             position: 'relative',
             overflow: 'hidden'
           }}
         >
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
             <Box
               component="img"
               src={value.url}
               alt="پیش‌نمایش"
               sx={{
                 width: 60,
                 height: 60,
                 objectFit: 'cover',
                 borderRadius: 1,
                 border: '1px solid',
                 borderColor: 'divider'
               }}
             />
             <Box sx={{ flex: 1 }}>
               <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5 }}>
                 {value.name}
               </Typography>
              <Typography variant="caption" color="text.secondary">
                {value.size ? formatFileSize(value.size) : ''}
                {value.size && value.type ? ' • ' : ''}
                {value.type ? (value.type.split('/')[1] || value.type).toUpperCase() : 'تصویر'}
              </Typography>
             </Box>
             <IconButton
               color="error"
               onClick={handleRemove}
               disabled={disabled}
               size="small"
             >
               <DeleteIcon fontSize="small" />
             </IconButton>
           </Box>
         </Paper>
      ) : (
                 // ناحیه آپلود
         <Paper
           elevation={dragActive ? 4 : 1}
           onDragEnter={handleDrag}
           onDragLeave={handleDrag}
           onDragOver={handleDrag}
           onDrop={handleDrop}
           onClick={handleClick}
           sx={{
             p: 2,
             border: '2px solid',
             borderColor: dragActive ? 'primary.main' : 'grey.300',
             borderRadius: 1,
             textAlign: 'center',
             cursor: disabled ? 'not-allowed' : 'pointer',
             backgroundColor: dragActive ? 'action.hover' : 'background.paper',
             transition: 'all 0.3s ease',
             boxShadow: 'none',
             '&:hover': {
               borderColor: disabled ? 'grey.300' : 'primary.main',
               backgroundColor: disabled ? 'background.paper' : 'action.hover',
             }
           }}
         >
           <CloudUploadIcon
             sx={{
               fontSize: 32,
               color: dragActive ? 'primary.main' : 'grey.400',
               mb: 1
             }}
           />
           
           <Typography variant="subtitle1" sx={{ mb: 0.5, fontWeight: 600 }}>
             {label}
           </Typography>
           
           <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
             {helperText}
           </Typography>
           
           <Button
             variant="outlined"
             startIcon={<ImageIcon />}
             disabled={disabled}
             size="small"
           >
             انتخاب فایل
           </Button>
         </Paper>
      )}

      {/* نمایش پیشرفت آپلود */}
      {uploading && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            در حال آپلود...
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={uploadProgress}
            sx={{ height: 6, borderRadius: 3 }}
          />
        </Box>
      )}

      {/* نمایش خطا */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default ImageUpload;
